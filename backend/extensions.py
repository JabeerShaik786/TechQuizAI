from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
import bcrypt

db = SQLAlchemy()
jwt = JWTManager()

def hash_password(password):
    """Hash a password"""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password, hashed):
    """Verify a password"""
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))
