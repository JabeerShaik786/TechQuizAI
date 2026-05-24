import os
import sys
from app import create_app, db
from models import User, Quiz, Question, UserStat, Badge

app = create_app()

@app.shell_context_processor
def make_shell_context():
    return {
        'db': db,
        'User': User,
        'Quiz': Quiz,
        'Question': Question,
        'UserStat': UserStat,
        'Badge': Badge,
    }

@app.cli.command()
def init_db():
    """Initialize the database."""
    db.create_all()
    print("Database initialized!")

@app.cli.command()
def seed_db():
    """Seed the database with sample data."""
    from extensions import hash_password
    
    # Create sample user
    user = User(
        name='Demo User',
        email='demo@example.com',
        password=hash_password('demo123'),
        xp=500,
        level=2
    )
    
    db.session.add(user)
    db.session.commit()
    print("Database seeded with sample data!")

@app.cli.command()
def drop_db():
    """Drop all database tables."""
    db.drop_all()
    print("Database dropped!")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
