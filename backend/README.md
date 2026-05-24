# TechQuiz AI Backend

This is the Flask backend for TechQuiz AI application.

## Setup Instructions

1. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Create .env file:**
   ```
   FLASK_ENV=development
   JWT_SECRET_KEY=your-secret-key-here
   DATABASE_URL=sqlite:///techquiz.db
   GEMINI_API_KEY=your-api-key-here
   ```

4. **Run the application:**
   ```bash
   python app.py
   ```

The backend will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Quiz
- `GET /api/quiz/topics` - Get available topics
- `POST /api/quiz/generate` - Generate new quiz
- `POST /api/quiz/submit` - Submit quiz answers
- `GET /api/quiz/history` - Get quiz history
- `GET /api/quiz/<id>` - Get quiz details

### Analytics
- `GET /api/analytics/stats` - Get user stats
- `GET /api/analytics/topic-performance` - Get topic performance
- `GET /api/analytics/weekly-progress` - Get weekly progress
- `GET /api/analytics/leaderboard` - Get leaderboard

### AI
- `POST /api/ai/explain` - Get explanation
- `GET /api/ai/recommendations` - Get recommendations
- `POST /api/ai/chat` - Chat with AI

## Database Models

- `User` - User accounts
- `Quiz` - Quiz sessions
- `Question` - Quiz questions
- `UserStat` - Topic performance stats
- `Badge` - User achievements
