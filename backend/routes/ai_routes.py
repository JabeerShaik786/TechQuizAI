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
    user_id_type = type(user_id)
    auth_header = request.headers.get('Authorization')
    
    from flask_jwt_extended import get_jwt
    decoded_jwt = get_jwt()
    
    print("=== TEMPORARY AUTHENTICATION AUDIT ===")
    print("JWT identity:", user_id)
    print("type(JWT identity):", user_id_type)
    print("Authorization header:", auth_header)
    print("Authorization Header Received:", auth_header is not None)
    print("Decoded JWT payload:", decoded_jwt)
    
    # Cast user_id safely to integer
    try:
        user_id_int = int(user_id)
    except (ValueError, TypeError) as cast_err:
        print(f"Failed to cast user_id '{user_id}' to int: {str(cast_err)}")
        return jsonify({'error': f"Unauthorized: invalid token identity format '{user_id}'"}), 401
        
    print("SELECTED USER ID:", user_id_int)
    
    from models import User
    
    # Query database
    user = User.query.get(user_id_int)
    
    if user is None:
        print("=== DATABASE LOOKUP FAILURE AUDIT ===")
        print("JWT identity:", user_id)
        print("identity type:", user_id_type)
        
        try:
            sql_query = str(User.query.filter_by(id=user_id_int).statement.compile(compile_kwargs={"literal_binds": True}))
        except Exception as sql_err:
            sql_query = f"Could not compile SQL: {str(sql_err)} (fallback: select * from users where id={user_id_int})"
            
        print("SQL query used:", sql_query)
        
        try:
            num_users = User.query.count()
            first_10_users = [(u.id, u.email) for u in User.query.limit(10).all()]
        except Exception as db_err:
            num_users = -1
            first_10_users = f"Error reading users: {str(db_err)}"
            
        print("number of users in database:", num_users)
        print("first 10 users (id,email):", first_10_users)
        print("Authorization Header Received:", auth_header is not None)
        
        return jsonify({
            'error': f"User not found: ID {user_id_int} not found in DB. Total users in DB: {num_users}."
        }), 404
        
    print(f"User found: {user.name} (ID: {user.id})")
    
    data = request.get_json()
    if not data or 'message' not in data:
        return jsonify({'error': 'Missing message'}), 400
    
    history = data.get('history', [])
    
    print("Gemini request started...")
    result, status_code = AIService.get_chat_response(user_id_int, data['message'], history)
    print("Gemini response received...")
    
    return jsonify(result), status_code
