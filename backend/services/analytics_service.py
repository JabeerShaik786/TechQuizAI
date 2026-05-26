from datetime import datetime, timedelta
from models import User, UserStat, Quiz, Badge
from extensions import db

class AnalyticsService:
    @staticmethod
    def get_user_stats(user_id):
        """Get user statistics - returns 0/empty stats for new users instead of error"""
        user = User.query.get(user_id)
        if not user:
            # Return empty stats instead of 404 for better UX
            return {
                'stats': {
                    'xp': 0,
                    'level': 1,
                    'streak': 0,
                    'quizzes_completed': 0,
                    'average_accuracy': 0,
                }
            }, 200

        quizzes = Quiz.query.filter_by(user_id=user_id, completed=True).all()
        total_questions = sum((quiz.questions_count or 0) for quiz in quizzes)
        total_correct = sum(((quiz.accuracy or 0) / 100) * (quiz.questions_count or 0) for quiz in quizzes)
        avg_accuracy = round((total_correct / total_questions) * 100, 2) if total_questions else 0

        return {
            'stats': {
                'xp': user.xp or 0,
                'level': user.level or 1,
                'streak': user.streak or 0,
                'quizzes_completed': len(quizzes),
                'average_accuracy': avg_accuracy,
            }
        }, 200

    @staticmethod
    def get_topic_performance(user_id):
        """Get performance breakdown by topic"""
        quizzes = Quiz.query.filter_by(user_id=user_id, completed=True).all()
        if not quizzes:
            return {'topic_performance': []}, 200

        topic_data = {}
        for quiz in quizzes:
            topic = quiz.topic or 'Unknown'
            if topic not in topic_data:
                topic_data[topic] = {
                    'topic': topic,
                    'accuracy_sum': 0,
                    'quizzes_completed': 0,
                    'total_xp': 0,
                }
            topic_data[topic]['accuracy_sum'] += (quiz.accuracy or 0)
            topic_data[topic]['quizzes_completed'] += 1
            topic_data[topic]['total_xp'] += int(quiz.score or 0)

        return {
            'topic_performance': [
                {
                    'topic': data['topic'],
                    'accuracy': round(data['accuracy_sum'] / data['quizzes_completed'], 1),
                    'quizzes_completed': data['quizzes_completed'],
                    'total_xp': data['total_xp'],
                }
                for data in topic_data.values()
            ]
        }, 200

    @staticmethod
    def get_weekly_progress(user_id):
        """Get weekly progress data"""
        now = datetime.utcnow().date()
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
            quiz_date = quiz.created_at.date()
            day_index = (now - quiz_date).days
            if 0 <= day_index < 7:
                day_name = quiz_date.strftime('%a')
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
