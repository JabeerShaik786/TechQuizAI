import os
from pathlib import Path
from datetime import timedelta


def _resolve_sqlite_db_url(db_url: str) -> str:
    """Resolve relative sqlite paths against the backend package location."""
    if not db_url or not db_url.startswith('sqlite:///'):
        return db_url

    raw_path = db_url[len('sqlite:///'):]
    path = Path(raw_path)
    if path.is_absolute():
        return db_url

    resolved = (Path(__file__).resolve().parent / raw_path).resolve()
    return f"sqlite:///{resolved.as_posix()}"

class Config:
    """Base configuration"""
    DEBUG = False
    TESTING = False
    
    # Database
    default_db_path = Path(__file__).resolve().parent / 'instance' / 'techquiz.db'
    SQLALCHEMY_DATABASE_URI = _resolve_sqlite_db_url(
        os.getenv('DATABASE_URL', f"sqlite:///{default_db_path.as_posix()}")
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # JWT
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your-secret-key-change-in-production')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    
    # CORS - Allow frontend to communicate
    CORS_ORIGINS = ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001']
    
    # AI API
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', '')
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY', '')

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    TESTING = False

class TestingConfig(Config):
    """Testing configuration"""
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'

class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    TESTING = False

config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
