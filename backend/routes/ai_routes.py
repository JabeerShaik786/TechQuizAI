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
    print("JWT Identity:", user_id)
    print("JWT Identity Type:", type(user_id))
    
    # Cast user_id safely to integer
    try:
        user_id_int = int(user_id)
    except (ValueError, TypeError) as cast_err:
        print(f"Failed to cast user_id '{user_id}' to int: {str(cast_err)}")
        return jsonify({'error': f"Unauthorized: invalid token identity format '{user_id}'"}), 401
        
    # Verify the user exists in database
    from models import User
    user = User.query.get(user_id_int)
    if not user:
        all_user_ids = [u.id for u in User.query.all()]
        log_msg = f"User with ID {user_id_int} not found in database. Existing User IDs in DB: {all_user_ids}"
        print(log_msg)
        return jsonify({'error': f"User not found: {log_msg}"}), 404
        
    print(f"User found: {user.name} (ID: {user.id})")
    
    data = request.get_json()
    if not data or 'message' not in data:
        return jsonify({'error': 'Missing message'}), 400
    
    history = data.get('history', [])
    
    print("Gemini request started...")
    result, status_code = AIService.get_chat_response(user_id_int, data['message'], history)
    print("Gemini response received...")
    
    return jsonify(result), status_code
