import os
from datetime import timedelta

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "techquiz-secret")

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "jwt-secret")

    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=7)


class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BASE_DIR, "techquiz.db")
    DEBUG = True


class ProductionConfig(Config):
    # Render-compatible SQLite path
    # Fallback to BASE_DIR on Windows or systems without /tmp
    if os.name == 'nt' or not os.path.exists('/tmp'):
        db_path = os.path.join(BASE_DIR, "techquiz.db")
    else:
        db_path = os.path.join("/tmp", "techquiz.db")

    SQLALCHEMY_DATABASE_URI = f"sqlite:///{db_path}"

    DEBUG = False


config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig
}