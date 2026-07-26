from datetime import datetime, timedelta
import random
from models import Quiz, Question, UserStat, User, Badge
from extensions import db
from services.questions_db import questions_db

class QuizService:
    TOPICS = ['Python', 'AI/ML', 'Data Science', 'Web Development', 
              'Cybersecurity', 'Cloud Computing', 'DBMS', 'Networking', 'Operating Systems']
    
    @staticmethod
    def get_topics():
        """Get available quiz topics"""
        return {'topics': QuizService.TOPICS}, 200
    
    @staticmethod
    def generate_quiz(user_id, topic, difficulty, question_count):
        """Generate a new quiz and store it in the database"""
        try:
            user_id_int = int(user_id)
            user = User.query.get(user_id_int)
            if not user:
                return {'error': 'User not found'}, 404
                
            all_questions = questions_db.get(topic, [])
            if not all_questions:
                return {'error': f'No questions found for topic: {topic}'}, 404
                
            # Filter by difficulty
            if difficulty == 'mixed':
                filtered_questions = all_questions
            else:
                filtered_questions = [q for q in all_questions if q['difficulty'] == difficulty]
                
            if not filtered_questions:
                return {'error': f"No questions found for topic '{topic}' with difficulty '{difficulty}'"}, 400
                
            # Cap request count at maximum available questions
            count = min(question_count, len(filtered_questions))
            
            # Shuffle and select unique questions (Fisher-Yates)
            selected_questions_data = list(filtered_questions)
            random.shuffle(selected_questions_data)
            selected_questions_data = selected_questions_data[:count]
            
            # Create quiz record
            quiz = Quiz(
                user_id=user_id_int,
                topic=topic,
                difficulty=difficulty,
                questions_count=count,
                completed=False
            )
            db.session.add(quiz)
            db.session.flush()  # Populates quiz.id
            
            # Save all Question records
            for idx, q_data in enumerate(selected_questions_data):
                question = Question(
                    quiz_id=quiz.id,
                    question_text=q_data['question'],
                    question_type='MCQ',
                    options=q_data['options'],
                    correct_answer=q_data['correct_answer'],
                    explanation=q_data.get('explanation', ''),
                    difficulty=q_data['difficulty']
                )
                db.session.add(question)
                
            db.session.commit()
            
        except Exception as exc:
            db.session.rollback()
            return {'error': f'Failed to generate quiz transaction: {str(exc)}'}, 500
            
        return {
            'quiz': {
                **quiz.to_dict(),
                'questions': [q.to_dict() for q in quiz.questions]
            }
        }, 201
    
    @staticmethod
    def submit_quiz(user_id, quiz_id, answers):
        """Submit quiz answers, calculate score, update stats and streaks in a single transaction"""
        user_id_int = int(user_id)
        
        quiz = Quiz.query.get(quiz_id)
        if not quiz or quiz.user_id != user_id_int:
            return {'error': 'Quiz not found or access denied'}, 404
            
        if quiz.completed:
            return {'error': 'Quiz has already been submitted'}, 400
            
        correct_count = 0
        total_questions = len(quiz.questions)
        
        if total_questions == 0:
            return {'error': 'Quiz contains no questions'}, 400
            
        for question in quiz.questions:
            user_answer = answers.get(str(question.id))
            if user_answer is not None:
                try:
                    # Skips and invalid values will not match correct answer
                    if int(user_answer) == question.correct_answer:
                        correct_count += 1
                except (ValueError, TypeError):
                    pass
                    
        accuracy = (correct_count / total_questions) * 100
        score = accuracy
        xp_earned = int((accuracy / 100) * 100)
        
        try:
            # Update quiz record
            quiz.score = score
            quiz.accuracy = accuracy
            quiz.completed = True
            
            # Update user stats (XP, level)
            user = quiz.user
            user.xp += xp_earned
            user.level = (user.xp // 1000) + 1
            
            # Update streak
            today = datetime.utcnow().date()
            if user.last_quiz_date:
                last_date = user.last_quiz_date
                if isinstance(last_date, datetime):
                    last_date = last_date.date()
            else:
                last_date = None

            if last_date == today:
                # Same-day quiz does not increase streak
                pass
            elif last_date == today - timedelta(days=1):
                user.streak = max(user.streak, 0) + 1
            else:
                user.streak = 1

            user.last_quiz_date = today

            # Update topic performance (weighted average)
            stat = UserStat.query.filter_by(user_id=user_id_int, topic=quiz.topic).first()
            if stat:
                previous_total_accuracy = stat.accuracy * stat.quizzes_completed
                stat.quizzes_completed += 1
                stat.total_xp += xp_earned
                stat.accuracy = (previous_total_accuracy + accuracy) / stat.quizzes_completed
            else:
                stat = UserStat(
                    user_id=user_id_int,
                    topic=quiz.topic,
                    accuracy=accuracy,
                    quizzes_completed=1,
                    total_xp=xp_earned
                )
                db.session.add(stat)
                
            # Award Badges (Fetch all in one query, count via SELECT count)
            new_badges_awarded = []
            earned_badge_names = {b.badge_name for b in Badge.query.filter_by(user_id=user_id_int).all()}
            
            def award_badge(name, icon):
                if name not in earned_badge_names:
                    new_badge = Badge(user_id=user_id_int, badge_name=name, icon=icon)
                    db.session.add(new_badge)
                    new_badges_awarded.append(new_badge.to_dict())
            
            # Check badge metrics
            completed_quizzes_count = Quiz.query.filter_by(user_id=user_id_int, completed=True).count() + 1 # Include this one
            
            # 1. First Quiz Completed
            if completed_quizzes_count >= 1:
                award_badge("First Steps", "🚀")
            # 2. Perfect Score (100% accuracy)
            if accuracy == 100:
                award_badge("Perfect Score", "💯")
            # 3. Quiz Master (5 or more quizzes)
            if completed_quizzes_count >= 5:
                award_badge("Quiz Master", "🏆")
            # 4. Streak Builder
            if user.streak >= 3:
                award_badge("On Fire", "🔥")
            # 5. Topic Specialist (3 or more in same topic)
            topic_completed_count = Quiz.query.filter_by(user_id=user_id_int, topic=quiz.topic, completed=True).count() + 1
            if topic_completed_count >= 3:
                award_badge(f"{quiz.topic} Specialist", "🎓")
                
            db.session.commit()
            
        except Exception as exc:
            import traceback
            traceback.print_exc()
            db.session.rollback()
            return {'error': f'Failed to commit quiz submission: {str(exc)}'}, 500
            
        return {
            'quiz': quiz.to_dict(),
            'score': score,
            'accuracy': accuracy,
            'xp_earned': xp_earned,
            'correct_answers': correct_count,
            'total_questions': total_questions,
            'user': {
                'xp': user.xp,
                'level': user.level,
                'streak': user.streak,
                'quizzes_completed': len(Quiz.query.filter_by(user_id=user_id_int, completed=True).all())
            },
            'badges_earned': new_badges_awarded
        }, 200
    
    @staticmethod
    def get_quiz_history(user_id):
        """Get user's quiz history"""
        user_id_int = int(user_id)
        quizzes = Quiz.query.filter_by(user_id=user_id_int).all()
        return {
            'quizzes': [q.to_dict() for q in quizzes]
        }, 200
    
    @staticmethod
    def get_quiz(user_id, quiz_id):
        """Get specific quiz details"""
        user_id_int = int(user_id)
        quiz = Quiz.query.get(quiz_id)
        if not quiz or quiz.user_id != user_id_int:
            return {'error': 'Quiz not found or access denied'}, 404
            
        return {
            'quiz': {
                **quiz.to_dict(),
                'questions': [q.to_dict() for q in quiz.questions]
            }
        }, 200

