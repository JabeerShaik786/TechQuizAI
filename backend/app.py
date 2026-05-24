import os
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS

try:
    from flask_migrate import Migrate
except ImportError:
    Migrate = None

from config import config

from extensions import db, jwt
from models import User, Quiz, Question, UserStat, Badge
from routes.auth_routes import auth_bp
from routes.quiz_routes import quiz_bp
from routes.analytics_routes import analytics_bp
from routes.ai_routes import ai_bp

if Migrate is not None:
    migrate = Migrate()
else:
    migrate = None


def _ensure_sqlite_user_columns(app):
    """Best-effort schema sync for SQLite.

    This prevents 500s when the existing SQLite DB is missing columns
    after model changes (bio/avatar/avatar_filename/xp/level/streak).
    """
    try:
        db_uri = app.config.get("SQLALCHEMY_DATABASE_URI", "")
        if not db_uri.startswith("sqlite"):
            return

        import sqlite3
        from pathlib import Path

        backend_dir = Path(__file__).resolve().parent
        project_root = backend_dir.parent
        candidates = [
            backend_dir / "techquiz.db",
            backend_dir / "instance" / "techquiz.db",
            project_root / "techquiz.db",
        ]
        db_path = next((p for p in candidates if p.exists()), None)
        if not db_path:
            app.logger.info('SQLite database file not found for schema sync. Skipping.')
            return

        conn = sqlite3.connect(str(db_path))
        try:
            cur = conn.execute("PRAGMA table_info(users)")
            existing = {row[1] for row in cur.fetchall()}
            to_add = []

            if "bio" not in existing:
                to_add.append(("bio", "TEXT"))
            if "avatar" not in existing:
                to_add.append(("avatar", "BLOB"))
            if "avatar_filename" not in existing:
                to_add.append(("avatar_filename", "VARCHAR(255)"))
            if "xp" not in existing:
                to_add.append(("xp", "INTEGER DEFAULT 0"))
            if "level" not in existing:
                to_add.append(("level", "INTEGER DEFAULT 1"))
            if "streak" not in existing:
                to_add.append(("streak", "INTEGER DEFAULT 0"))

            for col, col_type in to_add:
                conn.execute(f"ALTER TABLE users ADD COLUMN {col} {col_type}")
            if to_add:
                app.logger.info(f"SQLite schema sync applied to users: added {[col for col, _ in to_add]}")
        finally:
            conn.close()

    except Exception as exc:
        app.logger.exception(f"SQLite schema sync failed (non-fatal): {exc}")


def create_app(config_name=None):
    """Application factory"""
    if config_name is None:
        config_name = os.getenv('FLASK_ENV', 'development')
    load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))
    
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    
    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    if migrate is not None:
        migrate.init_app(app, db)

    
    # Configure CORS - Allow frontend to communicate with backend
    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": ["http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000", "http://127.0.0.1:3001"],
                "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                "allow_headers": ["Content-Type", "Authorization"],
                "supports_credentials": True,
            }
        }
    )
    
    # Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(quiz_bp)
    app.register_blueprint(analytics_bp)
    app.register_blueprint(ai_bp)
    
    # Best-effort schema sync for SQLite (prevents model/DB drift 500s)
    with app.app_context():
        _ensure_sqlite_user_columns(app)

        # Create tables only when schema is missing, otherwise rely on Flask-Migrate
        try:
            inspector = db.inspect(db.engine)
            existing_tables = inspector.get_table_names()

            if not existing_tables:
                app.logger.info('No database tables found, creating schema with db.create_all().')
                db.create_all()
            else:
                app.logger.info('Database schema detected; use Flask-Migrate for migrations.')
        except Exception as err:
            app.logger.exception('Database initialization failed, attempting fallback create_all().')
            try:
                db.create_all()
            except Exception as err2:
                app.logger.exception('Fallback create_all() failed. Database may require manual migration.')
    
    # Health check endpoint
    @app.route('/api/health', methods=['GET'])
    def health():
        return jsonify({'status': 'ok', 'message': 'TechQuiz AI Backend is running'}), 200
    
    # Error handlers
    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({'error': 'Bad request', 'message': str(error)}), 400
    
    @app.errorhandler(401)
    def unauthorized(error):
        return jsonify({'error': 'Unauthorized', 'message': 'Please login to continue'}), 401
    
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Resource not found'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        response = {
            'error': 'Internal server error',
            'message': str(error),
        }
        if app.debug:
            response['details'] = repr(error)
        return jsonify(response), 500
    
    # JWT error handlers
    @app.errorhandler(Exception)
    def handle_error(e):
        app.logger.exception(e)
        response = {
            'error': getattr(e, 'description', 'An error occurred'),
        }
        if app.debug:
            response['details'] = str(e)
        return jsonify(response), getattr(e, 'code', 500)
    
    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
