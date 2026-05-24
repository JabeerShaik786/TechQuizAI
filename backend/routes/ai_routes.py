from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.ai_service import AIService

ai_bp = Blueprint('ai', __name__, url_prefix='/api/ai')

@ai_bp.route('/explain', methods=['POST'])
@jwt_required()
def explain():
    """Get AI explanation for an answer"""
    data = request.get_json()
    
    if not data or 'question_id' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    result, status_code = AIService.generate_explanation(
        data['question_id'],
        data.get('answer')
    )
    
    return jsonify(result), status_code

@ai_bp.route('/recommendations', methods=['GET'])
@jwt_required()
def get_recommendations():
    """Get AI recommendations"""
    user_id = get_jwt_identity()
    result, status_code = AIService.get_recommendations(user_id)
    return jsonify(result), status_code

@ai_bp.route('/chat', methods=['POST'])
@jwt_required()
def chat():
    """Chat with AI assistant"""
    user_id = get_jwt_identity()
    data = request.get_json()
    
    if not data or 'message' not in data:
        return jsonify({'error': 'Missing message'}), 400
    
    history = data.get('history', [])
    result, status_code = AIService.get_chat_response(user_id, data['message'], history)
    return jsonify(result), status_code
