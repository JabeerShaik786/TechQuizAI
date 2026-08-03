import random
import re
from datetime import datetime
import google.generativeai as genai
from models import User, UserStat, Question, Quiz
from extensions import db
from services.recommendation_engine import RecommendationEngine
from services.gemini_service import GeminiService

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
        """Generate a real Gemini-powered explanation of a quiz question and the chosen answer."""
        try:
            question = Question.query.get(question_id)
            if not question:
                return {'error': 'Question not found'}, 404

            # Formulate detailed prompt for Gemini
            prompt = (
                f"Explain this quiz question and clarify the correct choice.\n"
                f"Question: {question.question_text}\n"
                f"Options: {', '.join(question.options) if question.options else 'None'}\n"
                f"Correct Answer index: {question.correct_answer}\n"
                f"User Answer index: {user_answer}\n\n"
                f"Provide a clear, brief, and educational breakdown of the concept and why the right option is correct, and why other options might be wrong."
            )

            # Request explanation from Gemini
            GeminiService.init_sdk()
            if GeminiService._initialized:
                try:
                    model = genai.GenerativeModel(model_name='gemini-flash-latest')
                    response = model.generate_content(prompt)
                    explanation_text = response.text.strip()
                except Exception as sdk_err:
                    explanation_text = question.explanation or f"Correct Answer is Option {question.correct_answer}."
            else:
                explanation_text = question.explanation or "Gemini is offline. Please configure GEMINI_API_KEY."

            return {
                'explanation': explanation_text,
                'related_topics': [question.difficulty.title(), 'Review'],
                'learning_resources': ['Read documentation', 'Take practice quizzes']
            }, 200

        except Exception as e:
            return {'error': str(e)}, 500

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
            
            # Fetch user statistics and performance context
            stats = UserStat.query.filter_by(user_id=user_id).all()
            completed_quizzes_count = sum(s.quizzes_completed for s in stats) if stats else 0
            average_accuracy = (sum(s.accuracy for s in stats) / len(stats)) if stats else 0
            
            weak_topics = [s.topic for s in sorted(stats, key=lambda x: x.accuracy)[:3]]
            strong_topics = [s.topic for s in sorted(stats, key=lambda x: x.accuracy, reverse=True)[:3]]
            
            recent_quizzes = Quiz.query.filter_by(user_id=user_id, completed=True).order_by(Quiz.created_at.desc()).limit(5).all()
            recent_results = []
            for q in recent_quizzes:
                recent_results.append(f"- Topic: {q.topic}, Score: {q.score:.0f}%, Difficulty: {q.difficulty}")
            recent_results_str = "\n".join(recent_results) if recent_results else "No quizzes completed yet."

            # Build a rich personalized system prompt for Gemini
            system_instruction = (
                "You are Antigravity AI, a premium, encouraging, and highly knowledgeable AI Tutor "
                "for the TechQuiz AI platform. Your goal is to help users master software engineering, "
                "databases, networking, and machine learning concepts. "
                "Explain concepts clearly, provide code snippets where appropriate, break down quiz questions, "
                "generate personalized study plans, and keep the user motivated.\n\n"
                "Here is the context of the user you are helping:\n"
                f"- Name: {user.name or 'User'}\n"
                f"- Level: {user.level or 1}\n"
                f"- XP: {user.xp or 0}\n"
                f"- Streak: {user.streak or 0} days\n"
                f"- Average Accuracy: {average_accuracy:.1f}%\n"
                f"- Completed Quizzes: {completed_quizzes_count}\n"
                f"- Weak Topics: {', '.join(weak_topics) if weak_topics else 'None yet'}\n"
                f"- Strong Topics: {', '.join(strong_topics) if strong_topics else 'None yet'}\n"
                f"- Recent Quiz Results:\n{recent_results_str}\n\n"
                "Always tailor your advice, roadmaps, and explanations to their level, accuracy, and weak/strong topics. "
                "If they ask how they are doing, reference their accuracy and weak areas. "
                "Be supportive, professional, and clear."
            )

            # Generate Gemini response
            reply = GeminiService.generate_chat_response(
                message=message,
                history=history,
                system_instruction=system_instruction
            )

            return {
                'reply': reply,
                'response': reply,  # Backward compatibility
                'intent': 'gemini_assistant',
                'timestamp': datetime.now().isoformat()
            }, 200
            
        except Exception as e:
            return {
                'error': str(e),
                'response': 'Sorry, I had trouble processing that. Please try again with more detail.',
                'reply': 'Sorry, I had trouble processing that. Please try again with more detail.',
                'timestamp': datetime.now().isoformat()
            }, 500
