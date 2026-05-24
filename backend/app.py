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

from routes.auth_routes import auth_bp
from routes.quiz_routes import quiz_bp
from routes.analytics_routes import analytics_bp
from routes.ai_routes import ai_bp

if Migrate:
    migrate = Migrate()
else:
    migrate = None


def create_app():
    load_dotenv()

    env = os.getenv("FLASK_ENV", "production")

    app = Flask(__name__)

    if env in config:
        app.config.from_object(config[env])
    else:
        app.config.from_object(config["development"])

    # -----------------------------
    # DATABASE
    # -----------------------------
    db.init_app(app)

    if migrate:
        migrate.init_app(app, db)

    # -----------------------------
    # JWT
    # -----------------------------
    jwt.init_app(app)

    # -----------------------------
    # CORS
    # -----------------------------
    allowed_origins = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",

        # Vercel frontend
        "https://tech-quiz-ai-xi.vercel.app",
    ]

    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": allowed_origins,
                "supports_credentials": True,
            }
        }
    )

    # -----------------------------
    # BLUEPRINTS
    # -----------------------------
    app.register_blueprint(auth_bp)
    app.register_blueprint(quiz_bp)
    app.register_blueprint(analytics_bp)
    app.register_blueprint(ai_bp)

    # -----------------------------
    # CREATE DATABASE TABLES
    # -----------------------------
    with app.app_context():
        db.create_all()

    # -----------------------------
    # HEALTH ROUTE
    # -----------------------------
    @app.route("/")
    def home():
        return jsonify({
            "status": "success",
            "message": "TechQuiz AI Backend Running"
        })

    @app.route("/api/health")
    def health():
        return jsonify({
            "status": "healthy"
        })

    # -----------------------------
    # ERROR HANDLERS
    # -----------------------------
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            "error": "Route not found"
        }), 404

    @app.errorhandler(500)
    def server_error(error):
        return jsonify({
            "error": str(error)
        }), 500

    return app


app = create_app()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)