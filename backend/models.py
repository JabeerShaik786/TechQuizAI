from extensions import db
from datetime import datetime
import json
import base64

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password = db.Column(db.String(255), nullable=False)
    avatar = db.Column(db.LargeBinary, nullable=True)  # Store image data
    avatar_filename = db.Column(db.String(255), nullable=True)  # Store filename
    bio = db.Column(db.Text, nullable=True)
    xp = db.Column(db.Integer, default=0)
    level = db.Column(db.Integer, default=1)
    streak = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    quizzes = db.relationship('Quiz', backref='user', lazy=True, cascade='all, delete-orphan')
    stats = db.relationship('UserStat', backref='user', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        avatar_data = None
        if self.avatar:
            extension = (self.avatar_filename.rsplit('.', 1)[1].lower() if self.avatar_filename and '.' in self.avatar_filename else 'png')
            mime_type = 'image/png'
            if extension in ['jpg', 'jpeg']:
                mime_type = 'image/jpeg'
            elif extension == 'webp':
                mime_type = 'image/webp'
            encoded = base64.b64encode(self.avatar).decode('utf-8')
            avatar_data = f'data:{mime_type};base64,{encoded}'

        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'bio': self.bio,
            'avatar': avatar_data,
            'xp': self.xp,
            'level': self.level,
            'streak': self.streak,
            'created_at': self.created_at.isoformat(),
            'joinedAt': self.created_at.isoformat()
        }

class Quiz(db.Model):
    __tablename__ = 'quizzes'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    topic = db.Column(db.String(120), nullable=False)
    difficulty = db.Column(db.String(20), default='medium')
    questions_count = db.Column(db.Integer, nullable=False)
    score = db.Column(db.Float, default=0)
    accuracy = db.Column(db.Float, default=0)
    time_taken = db.Column(db.Integer, default=0)  # in seconds
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    questions = db.relationship('Question', backref='quiz', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'topic': self.topic,
            'difficulty': self.difficulty,
            'questions_count': self.questions_count,
            'score': self.score,
            'accuracy': self.accuracy,
            'time_taken': self.time_taken,
            'completed': self.completed,
            'created_at': self.created_at.isoformat()
        }

class Question(db.Model):
    __tablename__ = 'questions'
    
    id = db.Column(db.Integer, primary_key=True)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quizzes.id'), nullable=False)
    question_text = db.Column(db.Text, nullable=False)
    question_type = db.Column(db.String(50), default='MCQ')  # MCQ, True/False, Fill-in-blank
    options = db.Column(db.JSON, default=list)  # List of options
    correct_answer = db.Column(db.Integer, nullable=False)  # Index of correct answer
    explanation = db.Column(db.Text, default='')
    difficulty = db.Column(db.String(20), default='medium')
    
    def to_dict(self):
        return {
            'id': self.id,
            'question_text': self.question_text,
            'question_type': self.question_type,
            'options': self.options,
            'correct_answer': self.correct_answer,
            'explanation': self.explanation,
            'difficulty': self.difficulty
        }

class UserStat(db.Model):
    __tablename__ = 'user_stats'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    topic = db.Column(db.String(120), nullable=False)
    accuracy = db.Column(db.Float, default=0)
    quizzes_completed = db.Column(db.Integer, default=0)
    total_xp = db.Column(db.Integer, default=0)
    
    def to_dict(self):
        return {
            'topic': self.topic,
            'accuracy': self.accuracy,
            'quizzes_completed': self.quizzes_completed,
            'total_xp': self.total_xp
        }

class Badge(db.Model):
    __tablename__ = 'badges'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    badge_name = db.Column(db.String(120), nullable=False)
    icon = db.Column(db.String(50), default='🏆')
    earned_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'name': self.badge_name,
            'icon': self.icon,
            'earned_at': self.earned_at.isoformat()
        }
