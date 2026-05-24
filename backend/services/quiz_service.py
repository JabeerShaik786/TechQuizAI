from models import Quiz, Question, UserStat, User, Badge
from extensions import db
import json

class QuizService:
    TOPICS = ['Python', 'AI/ML', 'Data Science', 'Web Development', 
              'Cybersecurity', 'Cloud Computing', 'DBMS', 'Networking', 'Operating Systems']
    
    @staticmethod
    def get_topics():
        """Get available quiz topics"""
        return {'topics': QuizService.TOPICS}, 200
    
    @staticmethod
    def generate_quiz(user_id, topic, difficulty, question_count):
        """Generate a new quiz (AI-powered in production)"""
        if topic not in QuizService.TOPICS:
            return {'error': 'Invalid topic'}, 400
        
        user = User.query.get(user_id)
        if not user:
            return {'error': 'User not found'}, 404
        
        # Create quiz record
        quiz = Quiz(
            user_id=user_id,
            topic=topic,
            difficulty=difficulty,
            questions_count=question_count
        )
        db.session.add(quiz)
        db.session.flush()
        
        # Generate questions (mock data for now)
        questions_data = QuizService._generate_questions(
            topic, difficulty, question_count
        )
        
        for q_data in questions_data:
            question = Question(
                quiz_id=quiz.id,
                question_text=q_data['question'],
                question_type=q_data['type'],
                options=q_data['options'],
                correct_answer=q_data['correct_answer'],
                explanation=q_data['explanation'],
                difficulty=difficulty
            )
            db.session.add(question)
        
        db.session.commit()
        
        return {
            'quiz': {
                **quiz.to_dict(),
                'questions': [q.to_dict() for q in quiz.questions]
            }
        }, 201
    
    @staticmethod
    def _generate_questions(topic, difficulty, count):
        """Generate mock questions (in production, use AI API)"""
        questions = []
        for i in range(count):
            questions.append({
                'question': f'{topic} Question {i+1}: What is the correct answer?',
                'type': 'MCQ',
                'options': [f'Option A', f'Option B', f'Option C', f'Option D'],
                'correct_answer': i % 4,
                'explanation': f'This is the explanation for {topic} question {i+1}.'
            })
        return questions
    
    @staticmethod
    def submit_quiz(user_id, quiz_id, answers):
        """Submit quiz answers and calculate score"""
        quiz = Quiz.query.get(quiz_id)
        if not quiz or quiz.user_id != user_id:
            return {'error': 'Quiz not found'}, 404
        
        correct_count = 0
        total_questions = len(quiz.questions)
        
        for question in quiz.questions:
            user_answer = answers.get(str(question.id))
            if user_answer is not None and int(user_answer) == question.correct_answer:
                correct_count += 1
        
        accuracy = (correct_count / total_questions) * 100 if total_questions > 0 else 0
        score = accuracy
        xp_earned = int((accuracy / 100) * 100)
        
        # Update quiz
        quiz.score = score
        quiz.accuracy = accuracy
        quiz.completed = True
        
        # Update user stats
        user = quiz.user
        user.xp += xp_earned
        user.level = (user.xp // 1000) + 1
        
        # Update topic stats
        stat = UserStat.query.filter_by(user_id=user_id, topic=quiz.topic).first()
        if stat:
            stat.accuracy = (stat.accuracy + accuracy) / 2
            stat.quizzes_completed += 1
            stat.total_xp += xp_earned
        else:
            stat = UserStat(
                user_id=user_id,
                topic=quiz.topic,
                accuracy=accuracy,
                quizzes_completed=1,
                total_xp=xp_earned
            )
            db.session.add(stat)
        
        db.session.commit()
        
        return {
            'quiz': quiz.to_dict(),
            'score': score,
            'accuracy': accuracy,
            'xp_earned': xp_earned,
            'correct_answers': correct_count,
            'total_questions': total_questions
        }, 200
    
    @staticmethod
    def get_quiz_history(user_id):
        """Get user's quiz history"""
        quizzes = Quiz.query.filter_by(user_id=user_id).all()
        return {
            'quizzes': [q.to_dict() for q in quizzes]
        }, 200
    
    @staticmethod
    def get_quiz(user_id, quiz_id):
        """Get specific quiz details"""
        quiz = Quiz.query.get(quiz_id)
        if not quiz or quiz.user_id != user_id:
            return {'error': 'Quiz not found'}, 404
        
        return {
            'quiz': {
                **quiz.to_dict(),
                'questions': [q.to_dict() for q in quiz.questions]
            }
        }, 200
