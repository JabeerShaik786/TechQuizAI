from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.quiz_service import QuizService

quiz_bp = Blueprint('quiz', __name__, url_prefix='/api/quiz')

@quiz_bp.route('/topics', methods=['GET'])
def get_topics():
    """Get available quiz topics"""
    result, status_code = QuizService.get_topics()
    return jsonify(result), status_code

@quiz_bp.route('/generate', methods=['POST'])
@jwt_required()
def generate_quiz():
    """Generate a new quiz"""
    user_id = get_jwt_identity()
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'Request body is empty'}), 400
        
    topic = data.get('topic')
    difficulty = data.get('difficulty')
    question_count = data.get('question_count')
    
    # 1. Validate topic presence & type
    if not topic or not isinstance(topic, str):
        return jsonify({'error': 'Topic is required and must be a string'}), 400
        
    from services.questions_db import questions_db
    if topic not in questions_db:
        return jsonify({
            'error': f"Topic '{topic}' is not supported. Supported topics: {', '.join(questions_db.keys())}"
        }), 400
        
    # 2. Validate difficulty
    if difficulty not in ('easy', 'medium', 'hard', 'mixed'):
        return jsonify({'error': "Difficulty must be one of 'easy', 'medium', 'hard', 'mixed'"}), 400
        
    # 3. Validate question_count
    try:
        q_count = int(question_count)
    except (ValueError, TypeError):
        return jsonify({'error': 'Question count must be a valid integer'}), 400
        
    if q_count <= 0:
        return jsonify({'error': 'Question count must be greater than zero'}), 400
        
    # Cap requested question count at maximum available in the question bank for this topic/difficulty
    all_qs = questions_db[topic]
    if difficulty != 'mixed':
        available_count = len([q for q in all_qs if q['difficulty'] == difficulty])
    else:
        available_count = len(all_qs)
        
    if available_count == 0:
        return jsonify({'error': f"No questions available for topic '{topic}' with difficulty '{difficulty}'"}), 400
        
    # If the user requests more questions than available, we cap it at available_count
    # rather than failing, but we can also notify them.
    # To be safe, we will pass the capped count or the requested count (the service will cap it).
    
    result, status_code = QuizService.generate_quiz(
        user_id,
        topic,
        difficulty,
        min(q_count, available_count)
    )
    
    return jsonify(result), status_code

@quiz_bp.route('/submit', methods=['POST'])
@jwt_required()
def submit_quiz():
    """Submit quiz answers"""
    user_id = get_jwt_identity()
    data = request.get_json()
    
    if not data or 'quiz_id' not in data or 'answers' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    result, status_code = QuizService.submit_quiz(
        user_id,
        data['quiz_id'],
        data['answers']
    )
    
    return jsonify(result), status_code

@quiz_bp.route('/history', methods=['GET'])
@jwt_required()
def get_quiz_history():
    """Get user's quiz history"""
    user_id = get_jwt_identity()
    result, status_code = QuizService.get_quiz_history(user_id)
    return jsonify(result), status_code

@quiz_bp.route('/<int:quiz_id>', methods=['GET'])
@jwt_required()
def get_quiz(quiz_id):
    """Get specific quiz details"""
    user_id = get_jwt_identity()
    result, status_code = QuizService.get_quiz(user_id, quiz_id)
    return jsonify(result), status_code
