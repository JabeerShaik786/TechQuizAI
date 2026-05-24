import random
import re
from datetime import datetime
from models import User, UserStat
from extensions import db
from services.recommendation_engine import RecommendationEngine

class AIService:
    CONCEPT_DATABASE = {
        'tuple': {
            'explanation': 'Tuples are immutable sequences in Python, meaning once created they cannot be changed.',
            'key_points': '• Use parentheses: (1, 2, 3)\n• Cannot modify elements\n• Faster than lists\n• Can act as dictionary keys',
            'example': 'point = (10, 20) stores coordinates that should not change'
        },
        'list': {
            'explanation': 'Lists are mutable collections that let you add, remove, and update values.',
            'key_points': '• Use square brackets: [1, 2, 3]\n• Supports append, remove, and sort\n• Ideal for ordered data\n• Can contain mixed types',
            'example': 'tasks = ["read", "code", "review"] grows as you add more items'
        },
        'dictionary': {
            'explanation': 'Dictionaries store key-value pairs for quick lookup by key.',
            'key_points': '• Use curly braces: {"name": "Alex"}\n• Keys are unique\n• Access values by key\n• Great for structured data',
            'example': 'student = {"name": "Sam", "score": 95} stores attributes together'
        },
        'machine learning': {
            'explanation': 'Machine learning trains models to find patterns in data without explicit programming.',
            'key_points': '• Learning from examples\n• Testing on new data\n• Types: supervised, unsupervised, reinforcement\n• Used for predictions and recommendations',
            'example': 'A spam filter learns from emails labeled as spam or not spam'
        },
        'tcp': {
            'explanation': 'TCP is a reliable protocol that guarantees ordered delivery of data.',
            'key_points': '• Connection-oriented\n• Error-checked delivery\n• Slower than UDP\n• Used for web pages, email, and file transfer',
            'example': 'Downloading a file uses TCP so the entire file arrives intact'
        },
        'udp': {
            'explanation': 'UDP sends data quickly without guaranteeing delivery.',
            'key_points': '• Connectionless\n• No delivery guarantee\n• Low overhead\n• Used for live streaming and gaming',
            'example': 'Video calls use UDP to keep latency low even if some packets are lost'
        },
        'database indexing': {
            'explanation': 'Indexing creates a shortcut that helps the database find data faster.',
            'key_points': '• Speeds up lookups\n• Uses extra storage\n• Slows down writes slightly\n• Like a book index',
            'example': 'Searching customer records by ID is much faster with an index'
        },
        'database normalization': {
            'explanation': 'Normalization organizes data to reduce redundancy and improve consistency.',
            'key_points': '• Use separate tables for distinct entities\n• Avoid duplicate data\n• Create clear relationships\n• Simplifies updates',
            'example': 'Keeping users in one table and orders in another avoids repeating user info'
        }
    }

    @staticmethod
    def generate_explanation(question_id, user_answer):
        return {
            'explanation': 'A detailed explanation is generated based on the question context. Please provide the quiz question if you want an exact breakdown.',
            'related_topics': ['Concept review', 'Example problems'],
            'learning_resources': ['Review the relevant concept, then try a similar quiz question']
        }, 200

    @staticmethod
    def get_recommendations(user_id):
        try:
            user = User.query.get(user_id)
            if not user:
                return {'error': 'User not found'}, 404

            stats = UserStat.query.filter_by(user_id=user_id).all()
            if not stats:
                return {
                    'recommendations': [],
                    'message': 'Take a few quizzes to get personalized recommendations!'
                }, 200

            stats = sorted(stats, key=lambda x: x.accuracy)
            recommendations = []
            for stat in stats[:5]:
                accuracy = stat.accuracy or 0
                reason = 'needs improvement'
                if accuracy < 50:
                    reason = 'requires immediate focus'
                elif accuracy < 70:
                    reason = 'could be stronger'

                recommendations.append({
                    'topic': stat.topic,
                    'accuracy': f'{accuracy:.0f}%',
                    'reason': reason,
                    'suggested_action': f'Review core {stat.topic} concepts and take a few practice quizzes.'
                })

            overall = sum(s.accuracy for s in stats) / len(stats)
            return {
                'recommendations': recommendations,
                'total_topics': len(stats),
                'overall_accuracy': f'{overall:.1f}%'
            }, 200
        except Exception as e:
            return {'error': str(e)}, 500

    @staticmethod
    def get_chat_response(user_id, message, history=None):
        try:
            user = User.query.get(user_id)
            if not user:
                return {'error': 'User not found'}, 404

            history = history or []
            normalized_history = []
            for item in history:
                if not isinstance(item, dict):
                    continue
                role = item.get('role')
                if not role:
                    role = 'user' if item.get('type') == 'user' else 'assistant'
                normalized_history.append({
                    'role': role,
                    'text': item.get('text') or item.get('content') or ''
                })
            history = normalized_history
            message_lower = message.lower().strip()
            topic = RecommendationEngine.normalize_topic(message_lower)
            if not topic:
                topic = RecommendationEngine.extract_last_topic(history)

            if any(keyword in message_lower for keyword in ['what can you do', 'help', 'how can you help']):
                return {
                    'response': RecommendationEngine.build_general_reply(),
                    'intent': 'help',
                    'timestamp': datetime.now().isoformat()
                }, 200

            if any(keyword in message_lower for keyword in ['motiv', 'encourage', 'inspire', 'push me', 'i failed', 'so tired', 'stressed']):
                return {
                    'response': RecommendationEngine.build_motivation(),
                    'intent': 'motivation',
                    'timestamp': datetime.now().isoformat()
                }, 200

            if any(keyword in message_lower for keyword in ['study plan', 'roadmap', 'learning path', 'how should i learn', 'what should i study next', 'prepare for']):
                stats = UserStat.query.filter_by(user_id=user_id).all()
                weak_topics = [s.topic for s in sorted(stats, key=lambda x: x.accuracy)[:3]]
                summary = RecommendationEngine.summarize_performance(stats)
                return {
                    'response': RecommendationEngine.build_study_plan(topic, weak_topics, summary),
                    'intent': 'study_plan',
                    'timestamp': datetime.now().isoformat()
                }, 200

            if any(keyword in message_lower for keyword in ['performance', 'progress', 'how am i', 'analyze my', 'weak areas', 'accuracy']):
                stats = UserStat.query.filter_by(user_id=user_id).all()
                summary = RecommendationEngine.summarize_performance(stats)
                return {
                    'response': f"📊 **Performance Analysis**\n\n{summary}\n\nWant a personalized roadmap based on these results? Just ask!",
                    'intent': 'performance',
                    'timestamp': datetime.now().isoformat()
                }, 200

            if any(keyword in message_lower for keyword in ['why was', 'wrong', 'explain this', 'quiz', 'question']):
                return {
                    'response': RecommendationEngine.build_quiz_help(topic),
                    'intent': 'quiz_help',
                    'timestamp': datetime.now().isoformat()
                }, 200

            if any(keyword in message_lower for keyword in ['explain', 'what is', 'how does', 'teach me', 'simplify', 'define']):
                if topic and topic in AIService.CONCEPT_DATABASE:
                    info = AIService.CONCEPT_DATABASE[topic]
                    return {
                        'response': RecommendationEngine.build_concept_explanation(topic, info),
                        'intent': 'concept_explanation',
                        'timestamp': datetime.now().isoformat()
                    }, 200

                return {
                    'response': (
                        "I can explain that! Tell me the exact topic you want to learn about, such as:\n"
                        "• Python loops\n"
                        "• database normalization\n"
                        "• machine learning basics\n"
                        "• TCP vs UDP\n"
                    ),
                    'intent': 'concept_clarification',
                    'timestamp': datetime.now().isoformat()
                }, 200

            if message_lower in ['hello', 'hi', 'hey', 'good morning', 'good evening']:
                return {
                    'response': (
                        f"Hey {user.name or 'there'}! 👋 I'm your AI learning assistant.\n\n"
                        "Ask me to explain a topic, help with quizzes, or build a study plan."
                    ),
                    'intent': 'greeting',
                    'timestamp': datetime.now().isoformat()
                }, 200

            return {
                'response': (
                    "That sounds interesting! I can help explain concepts, build study plans, analyze your progress, "
                    "or support you with quiz strategy. Try asking me something like:\n\n"
                    "• Explain Python loops\n"
                    "• Why was my answer wrong?\n"
                    "• Create a roadmap for cybersecurity\n"
                    "• Motivate me to keep learning\n"
                ),
                'intent': 'fallback',
                'timestamp': datetime.now().isoformat()
            }, 200
        except Exception as e:
            return {
                'error': str(e),
                'response': 'Sorry, I had trouble processing that. Please try again with more detail.',
                'timestamp': datetime.now().isoformat()
            }, 500
