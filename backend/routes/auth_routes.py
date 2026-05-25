from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.auth_service import AuthService
import traceback

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/signup', methods=['POST', 'OPTIONS'])
@auth_bp.route('/register', methods=['POST', 'OPTIONS'])
def signup():
    """User signup endpoint"""
    if request.method == 'OPTIONS':
        return '', 204
    
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'Request body is empty'}), 400
        
        required_fields = ['name', 'email', 'password']
        missing_fields = [f for f in required_fields if f not in data]
        
        if missing_fields:
            return jsonify({
                'error': f'Missing required fields: {", ".join(missing_fields)}'
            }), 400
        
        result, status_code = AuthService.signup(
            data['name'],
            data['email'],
            data['password']
        )
        
        return jsonify(result), status_code
    
    except Exception as e:
        print(f'Signup error: {str(e)}')
        traceback.print_exc()
        return jsonify({
            'error': 'Signup failed',
            'details': str(e),
        }), 500

@auth_bp.route('/login', methods=['POST', 'OPTIONS'])
def login():
    """User login endpoint"""
    if request.method == 'OPTIONS':
        return '', 204
    
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'Request body is empty'}), 400
        
        required_fields = ['email', 'password']
        missing_fields = [f for f in required_fields if f not in data]
        
        if missing_fields:
            return jsonify({
                'error': f'Missing required fields: {", ".join(missing_fields)}'
            }), 400
        
        result, status_code = AuthService.login(
            data['email'],
            data['password']
        )
        
        return jsonify(result), status_code
    
    except Exception as e:
        print(f'Login error: {str(e)}')
        traceback.print_exc()
        return jsonify({
            'error': 'Login failed',
            'details': str(e),
        }), 500

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """Get user profile"""
    try:
        user_id = get_jwt_identity()
        result, status_code = AuthService.get_user(user_id)
        return jsonify(result), status_code
    except Exception as e:
        print(f'Get profile error: {str(e)}')
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    """Update user profile with support for multipart/form-data and JSON"""
    try:
        user_id = get_jwt_identity()

        # Try to get data from form (for multipart/form-data)
        name = None
        email = None
        bio = None
        avatar_file = None
        remove_avatar = None

        # Check if this is a multipart request (form data)
        if request.form:
            name = request.form.get('name')
            email = request.form.get('email')
            bio = request.form.get('bio')
            remove_avatar = request.form.get('removeAvatar')
            avatar_file = request.files.get('avatar') if request.files else None
        
        # If no form data, try JSON
        if not request.form:
            data = request.get_json(silent=True) or {}
            name = data.get('name')
            email = data.get('email')
            bio = data.get('bio')
            remove_avatar = data.get('removeAvatar')

        # Validate that at least one field is being updated
        if not any([name, email, bio, avatar_file, remove_avatar]):
            return jsonify({'error': 'No fields to update provided'}), 400

        result, status_code = AuthService.update_user(
            user_id,
            name=name,
            email=email,
            bio=bio,
            avatar_file=avatar_file,
            remove_avatar=remove_avatar
        )

        return jsonify(result), status_code
    except Exception as e:
        print(f'Update profile error: {str(e)}')
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/password', methods=['PUT'])
@jwt_required()
def change_password():
    """Change user password"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json() or {}
        current_password = data.get('current_password')
        new_password = data.get('new_password')

        if not current_password or not new_password:
            return jsonify({'error': 'Current and new passwords are required'}), 400

        result, status_code = AuthService.change_password(
            user_id,
            current_password,
            new_password,
        )

        return jsonify(result), status_code
    except Exception as e:
        print(f'Change password error: {str(e)}')
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/logout', methods=['POST', 'OPTIONS'])
@jwt_required()
def logout():
    """User logout"""
    if request.method == 'OPTIONS':
        return '', 204
    
    try:
        return jsonify({'message': 'Successfully logged out'}), 200
    except Exception as e:
        print(f'Logout error: {str(e)}')
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500
