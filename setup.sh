#!/bin/bash

# TechQuiz AI Setup Script

echo "🚀 TechQuiz AI Setup"
echo "===================="
echo ""

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 16+."
    exit 1
fi

# Check for Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python not found. Please install Python 3.8+."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ Python version: $(python3 --version)"
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
cd backend
python3 -m venv venv
source venv/bin/activate || . venv/Scripts/activate
pip install -r requirements.txt
echo "✅ Backend ready!"
cd ..
echo ""

# Setup Frontend
echo "📦 Setting up Frontend..."
cd frontend
npm install
echo "✅ Frontend ready!"
cd ..
echo ""

echo "🎉 Setup Complete!"
echo ""
echo "To start the application:"
echo "1. Terminal 1: cd backend && source venv/bin/activate && python app.py"
echo "2. Terminal 2: cd frontend && npm run dev"
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:5000"
