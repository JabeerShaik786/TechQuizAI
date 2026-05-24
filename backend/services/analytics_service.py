from models import User, UserStat, Quiz, Badge
from extensions import db

class AnalyticsService:
    @staticmethod
    def get_user_stats(user_id):
        """Get user statistics"""
        user = User.query.get(user_id)
        if not user:
            return {'error': 'User not found'}, 404
        
        quizzes = Quiz.query.filter_by(user_id=user_id, completed=True).all()
        avg_accuracy = sum(q.accuracy for q in quizzes) / len(quizzes) if quizzes else 0
        
        return {
            'stats': {
                'xp': user.xp,
                'level': user.level,
                'streak': user.streak,
                'quizzes_completed': len(quizzes),
                'average_accuracy': round(avg_accuracy, 2)
            }
        }, 200
    
    @staticmethod
    def get_topic_performance(user_id):
        """Get performance breakdown by topic"""
        stats = UserStat.query.filter_by(user_id=user_id).all()
        
        return {
            'topic_performance': [s.to_dict() for s in stats]
        }, 200
    
    @staticmethod
    def get_weekly_progress(user_id):
        """Get weekly progress data"""
        from datetime import datetime, timedelta

        now = datetime.utcnow()
        quizzes = Quiz.query.filter_by(user_id=user_id, completed=True).all()
        weekly_data = [
            {
                'day': (now - timedelta(days=i)).strftime('%a'),
                'xp': 0,
                'quizzes': 0,
            }
            for i in reversed(range(7))
        ]
        lookup = {entry['day']: entry for entry in weekly_data}

        for quiz in quizzes:
            if not quiz.created_at:
                continue
            delta_days = (now.date() - quiz.created_at.date()).days
            if 0 <= delta_days < 7:
                day_name = quiz.created_at.strftime('%a')
                if day_name in lookup:
                    lookup[day_name]['xp'] += int(quiz.score)
                    lookup[day_name]['quizzes'] += 1

        return {
            'weekly_progress': weekly_data
        }, 200
    
    @staticmethod
    def get_leaderboard(limit=10):
        """Get global leaderboard"""
        users = User.query.order_by(User.xp.desc()).limit(limit).all()
        
        return {
            'leaderboard': [
                {
                    'rank': idx + 1,
                    'name': u.name,
                    'xp': u.xp,
                    'level': u.level
                }
                for idx, u in enumerate(users)
            ]
        }, 200
