# TechQuiz AI - Production-Quality AI-Powered Technology Quiz Generator

A modern, futuristic AI-powered technology quiz platform built with React + Vite frontend and Python Flask backend. The application features a cyberpunk + glassmorphism aesthetic with smooth animations and immersive interactions.

## 🚀 Features

### Core Features
- ✨ **AI-Powered Quiz Generation** - Dynamically generated quizzes using AI
- 📊 **Detailed Analytics** - Track your progress with comprehensive statistics
- 🎮 **Gamification** - Earn XP, unlock badges, and climb leaderboards
- 💡 **Personalized Learning** - AI-powered recommendations based on performance
- 🤖 **AI Assistant** - Floating chatbot for learning support
- 📈 **Performance Tracking** - Visual analytics and progress dashboards
- 🔐 **Secure Authentication** - JWT-based auth with password hashing

### Technology Topics
- Python
- AI/ML
- Data Science
- Web Development
- Cybersecurity
- Cloud Computing
- DBMS
- Networking
- Operating Systems

## 🛠️ Tech Stack

### Frontend
- React.js + Vite
- Tailwind CSS
- Framer Motion (animations)
- Zustand (state management)
- Recharts (analytics charts)
- Lucide React (icons)
- GSAP (advanced animations)
- React Toastify (notifications)
- React Router (navigation)

### Backend
- Python Flask
- Flask-SQLAlchemy (ORM)
- Flask-JWT-Extended (authentication)
- SQLite (database)
- Flask-CORS (cross-origin requests)

### AI Integration
- Google Gemini API (or OpenAI API)
- Dynamic question generation

## 📁 Project Structure

```
TechQuizAi/
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── layouts/         # Layout components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API services
│   │   ├── store/           # Zustand state management
│   │   ├── animations/      # Animation variants
│   │   ├── styles/          # Global styles
│   │   ├── assets/          # Images, fonts
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
│
├── backend/
│   ├── routes/              # Flask blueprints
│   ├── services/            # Business logic
│   ├── models.py            # Database models
│   ├── extensions.py        # Flask extensions
│   ├── config.py            # Configuration
│   ├── app.py               # Main Flask app
│   ├── requirements.txt
│   ├── .env
│   └── README.md
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- Python 3.8+
- npm or yarn

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

Frontend will be available at `http://localhost:3000`

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create .env file:**
   ```
   FLASK_ENV=development
   JWT_SECRET_KEY=your-secret-key
   DATABASE_URL=sqlite:///techquiz.db
   GEMINI_API_KEY=your-gemini-api-key
   ```

5. **Run the application:**
   ```bash
   python app.py
   ```

Backend will be available at `http://localhost:5000`

## 🎨 UI/UX Design

### Color Palette
- **Background**: #0F172A
- **Primary**: #00F5FF (Neon Blue)
- **Secondary**: #8B5CF6 (Purple)
- **Accent**: #EC4899 (Pink)
- **Glass**: rgba(255,255,255,0.08)

### Design Features
- Cyberpunk + Glassmorphism aesthetic
- Neon glowing borders and effects
- Smooth page transitions
- Animated progress bars
- Floating particles background
- Responsive grid layouts
- Premium typography (Poppins + Space Grotesk)

## 📚 API Documentation

### Authentication Endpoints
```
POST   /api/auth/signup              # Register new user
POST   /api/auth/login               # Login
GET    /api/auth/profile             # Get user profile
PUT    /api/auth/profile             # Update profile
POST   /api/auth/logout              # Logout
```

### Quiz Endpoints
```
GET    /api/quiz/topics              # Get available topics
POST   /api/quiz/generate            # Generate new quiz
POST   /api/quiz/submit              # Submit quiz answers
GET    /api/quiz/history             # Get quiz history
GET    /api/quiz/:id                 # Get specific quiz
```

### Analytics Endpoints
```
GET    /api/analytics/stats          # Get user stats
GET    /api/analytics/topic-performance   # Topic breakdown
GET    /api/analytics/weekly-progress     # Weekly stats
GET    /api/analytics/leaderboard        # Global leaderboard
```

### AI Endpoints
```
POST   /api/ai/explain               # Get AI explanation
GET    /api/ai/recommendations       # Get recommendations
POST   /api/ai/chat                  # Chat with AI assistant
```

## 🎮 User Features

### Dashboard
- Welcome section with user greeting
- Real-time stats (XP, Level, Streaks, Accuracy)
- Recent quiz history
- Achievement badges
- Quick action buttons

### Quiz Experience
- Dynamic quiz generation based on topic & difficulty
- Timer with visual countdown
- Progress bar
- Multiple choice questions
- Instant feedback
- Skip functionality

### Results & Analytics
- Score display with celebration animation
- Detailed answer review
- Performance breakdown
- Topic-wise analytics
- Weekly progress charts
- Skill radar chart
- Leaderboards

### Gamification
- XP system
- Level progression
- Streak counter
- Badges & achievements
- Leaderboard ranking

## 🔒 Security

- JWT authentication with token expiration
- Password hashing with bcrypt
- CORS protection
- Input validation
- Secure API endpoints
- Environment variables for sensitive data

## 📱 Responsive Design

The application is fully responsive and works perfectly on:
- Mobile phones (320px+)
- Tablets (768px+)
- Laptops (1024px+)
- Large desktops (1920px+)

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Render/Railway)
```bash
pip freeze > requirements.txt
# Deploy with Procfile
```

### Procfile for Backend
```
web: gunicorn app:app
```

## 📝 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=TechQuiz AI
```

### Backend (.env)
```
FLASK_ENV=development
JWT_SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///techquiz.db
GEMINI_API_KEY=your-key
CORS_ORIGINS=http://localhost:3000
```

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for personal and commercial purposes.

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Flask Documentation](https://flask.palletsprojects.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [SQLAlchemy](https://www.sqlalchemy.org)

## 🐛 Troubleshooting

### Frontend Issues
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Vite config for API proxy
- Ensure backend is running on port 5000

### Backend Issues
- Activate virtual environment
- Check database connection
- Verify JWT secret key is set
- Check CORS origins configuration

## 📞 Support

For support and questions, please open an issue on the repository.

---

Built with ⚡ and AI magic | TechQuiz AI 2024
