from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.analytics_service import AnalyticsService

analytics_bp = Blueprint('analytics', __name__, url_prefix='/api/analytics')

@analytics_bp.route('/stats', methods=['GET'])
@jwt_required()
def get_stats():
    """Get user statistics"""
    user_id = get_jwt_identity()
    result, status_code = AnalyticsService.get_user_stats(user_id)
    return jsonify(result), status_code

@analytics_bp.route('/topic-performance', methods=['GET'])
@jwt_required()
def get_topic_performance():
    """Get topic performance"""
    user_id = get_jwt_identity()
    result, status_code = AnalyticsService.get_topic_performance(user_id)
    return jsonify(result), status_code

@analytics_bp.route('/weekly-progress', methods=['GET'])
@jwt_required()
def get_weekly_progress():
    """Get weekly progress"""
    user_id = get_jwt_identity()
    result, status_code = AnalyticsService.get_weekly_progress(user_id)
    return jsonify(result), status_code

@analytics_bp.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    """Get global leaderboard"""
    limit = request.args.get('limit', 10, type=int)
    result, status_code = AnalyticsService.get_leaderboard(limit)
    return jsonify(result), status_code
