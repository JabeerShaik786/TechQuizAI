from models import User
from extensions import db, verify_password, hash_password
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
)

class AuthService:

    @staticmethod
    def signup(name, email, password):
        """Create a new user account"""

        try:
            email = email.strip().lower()
            name = name.strip()

            existing_user = User.query.filter_by(
                email=email
            ).first()

            if existing_user:
                return {
                    'error': 'Email already exists'
                }, 400

            hashed_password = hash_password(password)

            user = User(
                name=name,
                email=email,
                password=hashed_password,
            )

            db.session.add(user)
            db.session.commit()

            # FIX → convert ID to string
            access_token = create_access_token(
                identity=str(user.id)
            )

            refresh_token = create_refresh_token(
                identity=str(user.id)
            )

            return {
                'user': user.to_dict(),
                'access_token': access_token,
                'refresh_token': refresh_token,
            }, 201

        except Exception as e:
            db.session.rollback()

            print("SIGNUP ERROR:", str(e))

            return {
                'error': str(e)
            }, 500

    @staticmethod
    def login(email, password):
        """Authenticate user"""

        try:
            email = email.strip().lower()

            user = User.query.filter_by(
                email=email
            ).first()

            if not user:
                return {
                    'error': 'Invalid email or password'
                }, 401

            password_valid = verify_password(
                password,
                user.password
            )

            if not password_valid:
                return {
                    'error': 'Invalid email or password'
                }, 401

            # FIX → convert ID to string
            access_token = create_access_token(
                identity=str(user.id)
            )

            refresh_token = create_refresh_token(
                identity=str(user.id)
            )

            return {
                'user': user.to_dict(),
                'access_token': access_token,
                'refresh_token': refresh_token,
            }, 200

        except Exception as e:
            print("LOGIN ERROR:", str(e))

            return {
                'error': str(e)
            }, 500

    @staticmethod
    def get_user(user_id):

        try:
            user = User.query.get(int(user_id))

            if not user:
                return {
                    'error': 'User not found'
                }, 404

            return {
                'user': user.to_dict()
            }, 200

        except Exception as e:
            print("GET USER ERROR:", str(e))

            return {
                'error': str(e)
            }, 500

    @staticmethod
    def update_user(
        user_id,
        name=None,
        email=None,
        bio=None,
        avatar_file=None,
        remove_avatar=False
    ):

        try:
            user = User.query.get(int(user_id))

            if not user:
                return {
                    'error': 'User not found'
                }, 404

            # NAME
            if name and isinstance(name, str):
                user.name = name.strip()

            # EMAIL
            if email and isinstance(email, str):

                cleaned_email = email.strip().lower()

                existing_user = User.query.filter_by(
                    email=cleaned_email
                ).first()

                if (
                    existing_user
                    and existing_user.id != user.id
                ):
                    return {
                        'error': 'Email already exists'
                    }, 422

                user.email = cleaned_email

            # BIO
            if bio is not None:
                user.bio = bio.strip()

            # REMOVE AVATAR
            if (
                remove_avatar == True
                or remove_avatar == "true"
            ):
                user.avatar = None
                user.avatar_filename = None

            # UPLOAD AVATAR
            if avatar_file:

                allowed_extensions = [
                    'jpg',
                    'jpeg',
                    'png',
                    'webp',
                ]

                if '.' not in avatar_file.filename:
                    return {
                        'error': 'Invalid file'
                    }, 422

                extension = avatar_file.filename \
                    .rsplit('.', 1)[1] \
                    .lower()

                if extension not in allowed_extensions:
                    return {
                        'error':
                        'Only JPG, PNG, WEBP allowed'
                    }, 422

                user.avatar = avatar_file.read()
                user.avatar_filename = avatar_file.filename

            db.session.commit()

            return {
                'user': user.to_dict()
            }, 200

        except Exception as e:

            db.session.rollback()

            print("UPDATE USER ERROR:", str(e))

            return {
                'error': str(e)
            }, 500

    @staticmethod
    def change_password(
        user_id,
        current_password,
        new_password
    ):

        try:
            user = User.query.get(int(user_id))

            if not user:
                return {
                    'error': 'User not found'
                }, 404

            valid_password = verify_password(
                current_password,
                user.password
            )

            if not valid_password:
                return {
                    'error':
                    'Current password incorrect'
                }, 401

            if len(new_password) < 8:
                return {
                    'error':
                    'Password must be at least 8 chars'
                }, 400

            user.password = hash_password(
                new_password
            )

            db.session.commit()

            return {
                'message':
                'Password updated successfully'
            }, 200

        except Exception as e:

            db.session.rollback()

            print("PASSWORD CHANGE ERROR:", str(e))

            return {
                'error': str(e)
            }, 500