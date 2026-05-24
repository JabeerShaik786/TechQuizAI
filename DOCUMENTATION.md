# Root Documentation

## Project Overview

TechQuiz AI is a production-quality, AI-powered technology quiz platform featuring:
- Modern cyberpunk + glassmorphism UI
- Real-time AI quiz generation
- Comprehensive analytics dashboard
- Gamification system
- Responsive design
- Secure authentication

## Directory Structure

```
TechQuizAi/
├── frontend/              # React + Vite frontend
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── backend/               # Python Flask backend
│   ├── routes/
│   ├── services/
│   ├── models.py
│   └── app.py
│
├── README.md              # Main documentation
├── QUICKSTART.md          # Quick setup guide
└── docker-compose.yml     # Docker configuration
```

## Quick Links

- [Main README](./README.md) - Full documentation
- [Quick Start Guide](./QUICKSTART.md) - Setup instructions
- [Frontend README](./frontend/README.md) - Frontend details
- [Backend README](./backend/README.md) - Backend details

## Features Implemented

### ✅ Frontend
- Landing page with animations
- Authentication (Login/Signup)
- Dashboard with stats
- Topic selection
- Quiz generator
- Quiz interface with timer
- Results page with animations
- Analytics dashboard with charts
- User profile
- AI chatbot assistant
- Responsive design
- Dark cyberpunk theme

### ✅ Backend
- User authentication with JWT
- Quiz generation API
- Quiz submission and scoring
- User stats tracking
- Analytics endpoints
- AI integration points
- Database models
- CORS configuration

## Getting Started

### Fastest Way (Docker)
```bash
docker-compose up
```

### Manual Setup
See [QUICKSTART.md](./QUICKSTART.md) for detailed instructions.

## API Documentation

All backend API endpoints are documented in [backend/README.md](./backend/README.md)

## Technology Stack

**Frontend:**
- React 18 + Vite
- Tailwind CSS + Framer Motion
- Zustand + Axios
- Recharts + Lucide Icons

**Backend:**
- Python Flask
- SQLAlchemy ORM
- JWT Authentication
- SQLite Database

## Deployment

- Frontend: Vercel, Netlify, or any static host
- Backend: Render, Railway, or Heroku
- Database: PostgreSQL (production), SQLite (development)

## Key Features

1. **AI-Powered Quizzes** - Dynamically generated questions
2. **Gamification** - XP, Levels, Streaks, Badges
3. **Analytics** - Performance tracking and insights
4. **Real-time Stats** - Live progress updates
5. **Responsive** - Works on all devices
6. **Secure** - JWT + password hashing
7. **Modern UI** - Cyberpunk aesthetic with smooth animations
8. **AI Assistant** - Floating chatbot for help

## Next Steps

1. Install dependencies (frontend & backend)
2. Configure environment variables
3. Start development servers
4. Sign up and create a quiz
5. Deploy to production

## Support & Documentation

- Check [QUICKSTART.md](./QUICKSTART.md) for setup issues
- Review [README.md](./README.md) for full documentation
- Check [backend/README.md](./backend/README.md) for API details
- Check [frontend/README.md](./frontend/README.md) for frontend details

---

**Built with ⚡ and AI magic**

TechQuiz AI © 2024
