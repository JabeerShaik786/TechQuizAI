@echo off
REM TechQuiz AI Setup Script for Windows

echo 🚀 TechQuiz AI Setup
echo ====================
echo.

REM Check for Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js not found. Please install Node.js 16+.
    exit /b 1
)

REM Check for Python
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Python not found. Please install Python 3.8+.
    exit /b 1
)

echo ✅ Node.js version:
node --version
echo ✅ Python version:
python --version
echo.

REM Setup Backend
echo 📦 Setting up Backend...
cd backend
python -m venv venv
call venv\Scripts\activate.bat
pip install -r requirements.txt
echo ✅ Backend ready!
cd ..
echo.

REM Setup Frontend
echo 📦 Setting up Frontend...
cd frontend
call npm install
echo ✅ Frontend ready!
cd ..
echo.

echo 🎉 Setup Complete!
echo.
echo To start the application:
echo 1. Terminal 1: cd backend && venv\Scripts\activate && python app.py
echo 2. Terminal 2: cd frontend && npm run dev
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
