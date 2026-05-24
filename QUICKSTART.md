# Quick Start Guide - TechQuiz AI

## 📋 Prerequisites
- Node.js 16+ (https://nodejs.org)
- Python 3.8+ (https://python.org)
- Git (https://git-scm.com)
- npm or yarn

## 🚀 One-Command Setup (Windows)

### Backend Setup
```batch
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Frontend Setup (in new terminal)
```batch
cd frontend
npm install
npm run dev
```

## 🐳 Docker Setup (Easiest)

If you have Docker installed:

```bash
docker-compose up
```

This will start both frontend and backend automatically!

## 📝 Step-by-Step Setup

### Step 1: Clone/Extract Project
```bash
cd TechQuizAi
```

### Step 2: Backend Setup

**Windows:**
```batch
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

**macOS/Linux:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

Backend will start on `http://localhost:5000`

### Step 3: Frontend Setup (new terminal)

**Windows:**
```batch
cd frontend
npm install
npm run dev
```

**macOS/Linux:**
```bash
cd frontend
npm install
npm run dev
```

Frontend will start on `http://localhost:3000`

## ✅ Verification

1. Backend running: Visit `http://localhost:5000/api/health`
   - Should see: `{"status": "ok", "message": "..."}`

2. Frontend running: Visit `http://localhost:3000`
   - Should see the TechQuiz AI landing page

## 🔐 Configuration

### Backend .env
Create `backend/.env`:
```
FLASK_ENV=development
JWT_SECRET_KEY=techquiz-ai-secret-key-change-in-production
DATABASE_URL=sqlite:///techquiz.db
GEMINI_API_KEY=your-api-key-here
```

### Frontend .env
Create `frontend/.env.local`:
```
VITE_API_URL=http://localhost:5000
```

## 🎮 Test the Application

1. **Visit Frontend:** `http://localhost:3000`
2. **Sign Up:** Create a test account
3. **Login:** Use the credentials you just created
4. **Choose Topic:** Select a technology topic
5. **Generate Quiz:** Set difficulty and question count
6. **Take Quiz:** Answer questions and see your score
7. **View Analytics:** Check your performance metrics

## 📊 Sample Test Data

### Test User 1
- Email: test@example.com
- Password: Test123!

### Test User 2
- Email: user@example.com
- Password: User123!

## 🐛 Troubleshooting

### Backend won't start
```bash
# Clear database and restart
rm backend/techquiz.db
python backend/app.py
```

### Frontend port already in use
```bash
# Use different port
npm run dev -- --port 3001
```

### CORS errors
- Ensure backend is running on `localhost:5000`
- Check CORS configuration in `backend/app.py`

### Module not found errors
```bash
# Frontend
rm -rf node_modules package-lock.json
npm install

# Backend
rm -rf venv
python -m venv venv
pip install -r requirements.txt
```

## 📈 Next Steps

1. Add Gemini/OpenAI API key for AI quiz generation
2. Deploy to Vercel (frontend) and Render (backend)
3. Set up custom domain
4. Enable email notifications
5. Add social login (Google/GitHub)

## 🚀 Production Deployment

### Frontend
```bash
npm run build
# Deploy dist/ folder to Vercel or Netlify
```

### Backend
```bash
pip freeze > requirements.txt
# Deploy to Render or Railway
```

## 📞 Support

- Check logs for errors
- Ensure ports 3000 and 5000 are available
- Verify Python and Node.js are installed correctly
- Try clearing browser cache (Ctrl+Shift+Del)

## ✨ Features to Explore

- ✅ Dark theme cyberpunk UI
- ✅ AI-powered quiz generation
- ✅ Real-time analytics
- ✅ Gamification system
- ✅ User authentication
- ✅ Responsive design
- ✅ Animated transitions
- ✅ AI chatbot assistant

---

**Happy Learning! 🎓**

Enjoy mastering technology with TechQuiz AI! 🚀
