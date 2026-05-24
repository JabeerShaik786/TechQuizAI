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
    
    if not data or not all(k in data for k in ('topic', 'difficulty', 'question_count')):
        return jsonify({'error': 'Missing required fields'}), 400
    
    result, status_code = QuizService.generate_quiz(
        user_id,
        data['topic'],
        data['difficulty'],
        data['question_count']
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
