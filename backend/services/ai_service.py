import os
import logging
from datetime import datetime
from models import User, Quiz, UserStat
from extensions import db

logger = logging.getLogger(__name__)

# Lazy-import google.generativeai to avoid crash if package missing
_genai = None
_model = None


def _get_model():
    """Lazily initialize the Gemini model on first use."""
    global _genai, _model
    if _model is not None:
        return _model

    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return None

    try:
        import google.generativeai as genai
        _genai = genai
        _genai.configure(api_key=api_key)
        _model = _genai.GenerativeModel("gemini-3.5-flash")
        return _model
    except Exception as e:
        logger.error(f"Failed to initialize Gemini model: {e}")
        return None


def _build_system_prompt(user, user_id):
    """Build a personalized system prompt with the user's learning context."""
    stats = UserStat.query.filter_by(user_id=user_id).all()
    recent_quizzes = (
        Quiz.query.filter_by(user_id=user_id, completed=True)
        .order_by(Quiz.created_at.desc())
        .limit(5)
        .all()
    )

    weak_topics = [s.topic for s in sorted(stats, key=lambda x: x.accuracy)[:3]] if stats else []
    strong_topics = [s.topic for s in sorted(stats, key=lambda x: x.accuracy, reverse=True)[:3]] if stats else []
    average_accuracy = sum(s.accuracy for s in stats) / len(stats) if stats else 0

    recent_results_str = ""
    for q in recent_quizzes:
        recent_results_str += f"  - {q.topic} ({q.difficulty}): {q.score:.0f}%\n"
    if not recent_results_str:
        recent_results_str = "  No quizzes taken yet.\n"

    return (
        "You are TechQuizAI.\n\n"
        "Help students learn programming, aptitude, data science, SQL, Python, Java, AI, "
        "cloud computing, interviews, reasoning, and technical concepts.\n\n"
        "Explain clearly.\n"
        "Use examples.\n"
        "When possible provide short quizzes.\n"
        "Never answer with unsafe or harmful content.\n\n"
        "Here is the context of the user you are helping:\n"
        f"- Name: {user.name or 'User'}\n"
        f"- Level: {user.level or 1}\n"
        f"- XP: {user.xp or 0}\n"
        f"- Streak: {user.streak or 0} days\n"
        f"- Average Accuracy: {average_accuracy:.1f}%\n"
        f"- Completed Quizzes: {len(recent_quizzes)}\n"
        f"- Weak Topics: {', '.join(weak_topics) if weak_topics else 'None yet'}\n"
        f"- Strong Topics: {', '.join(strong_topics) if strong_topics else 'None yet'}\n"
        f"- Recent Quiz Results:\n{recent_results_str}\n"
        "Always tailor your advice, roadmaps, and explanations to their level, accuracy, and weak/strong topics. "
        "If they ask how they are doing, reference their accuracy and weak areas. "
        "Be supportive, professional, and clear."
    )


class AIService:

    @staticmethod
    def generate_explanation(question_id, user_answer):
        return {
            'explanation': 'A detailed explanation is generated based on the question context.',
            'related_topics': ['Concept review', 'Example problems'],
            'learning_resources': ['Review the relevant concept, then try a similar quiz question']
        }, 200

    @staticmethod
    def get_recommendations(user_id):
        try:
            user_id_int = int(user_id)
            user = db.session.get(User, user_id_int)
            if not user:
                return {'error': 'User not found'}, 404

            stats = UserStat.query.filter_by(user_id=user_id_int).all()
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
            logger.error(f"Recommendations error: {e}")
            return {'error': 'Failed to load recommendations.'}, 500

    @staticmethod
    def get_chat_response(user_id, message, history=None):
        try:
            user_id_int = int(user_id)
            user = db.session.get(User, user_id_int)
            if not user:
                return {'error': 'User not found'}, 404

            model = _get_model()
            if model is None:
                return {
                    'success': False,
                    'error': 'AI service is not configured. Please set GEMINI_API_KEY.'
                }, 503

            # Build system prompt with user context
            system_prompt = _build_system_prompt(user, user_id_int)

            # Normalize incoming chat history into Gemini content format
            contents = []

            # Add system instruction as the first user turn
            contents.append({
                "role": "user",
                "parts": [{"text": f"[System Instructions]\n{system_prompt}"}]
            })
            contents.append({
                "role": "model",
                "parts": [{"text": "Understood. I'm TechQuizAI, ready to help you learn. How can I assist you today?"}]
            })

            # Append prior conversation history
            if history:
                for item in history:
                    if not isinstance(item, dict):
                        continue
                    role = item.get('role')
                    if not role:
                        role = 'user' if item.get('type') == 'user' else 'model'
                    if role == 'assistant':
                        role = 'model'
                    text = item.get('text') or item.get('content') or ''
                    if text:
                        contents.append({"role": role, "parts": [{"text": text}]})

            # Add current user message
            contents.append({"role": "user", "parts": [{"text": message}]})

            # Call Gemini
            response = model.generate_content(contents)
            reply_text = response.text

            return {
                'success': True,
                'response': reply_text,
                'timestamp': datetime.now().isoformat()
            }, 200

        except Exception as e:
            logger.error(f"Gemini chat error: {e}")
            return {
                'success': False,
                'response': 'Sorry, I had trouble processing that. Please try again.',
                'timestamp': datetime.now().isoformat()
            }, 502
