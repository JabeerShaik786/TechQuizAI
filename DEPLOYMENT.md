# Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (for frontend)
- Render/Railway account (for backend)
- Domain name (optional)

## Frontend Deployment (Vercel)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourname/techquiz-ai.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Select `frontend` folder as root
   - Add environment variables:
     ```
     VITE_API_URL=https://your-backend-url.com
     ```
   - Click Deploy

3. **Custom Domain (optional):**
   - In Vercel dashboard, go to Settings > Domains
   - Add your custom domain

## Backend Deployment (Render)

1. **Create app.py entry point:**
   ```python
   from app import create_app
   app = create_app()
   ```

2. **Push to GitHub (same repo):**
   ```bash
   git add .
   git commit -m "Add deployment config"
   git push
   ```

3. **Deploy on Render:**
   - Go to https://render.com
   - Click "New Service"
   - Connect GitHub repository
   - Select Python environment
   - Root directory: `backend`
   - Start command: `pip install -r requirements.txt && python app.py`
   - Add environment variables:
     ```
     FLASK_ENV=production
     JWT_SECRET_KEY=your-random-key
     DATABASE_URL=postgresql://...
     GEMINI_API_KEY=your-key
     ```
   - Click Deploy

4. **Add PostgreSQL Database:**
   - Create a new PostgreSQL database on Render
   - Copy connection URL to `DATABASE_URL`
   - Run migrations

## Environment Variables

### Frontend (Vercel)
```
VITE_API_URL=https://techquiz-api.render.com
VITE_APP_NAME=TechQuiz AI
```

### Backend (Render)
```
FLASK_ENV=production
JWT_SECRET_KEY=generate-random-secret
DATABASE_URL=your-postgresql-url
GEMINI_API_KEY=your-gemini-api-key
CORS_ORIGINS=https://techquiz-ai.vercel.app
```

## Database Migration (Production)

1. **Use PostgreSQL:**
   ```bash
   pip install psycopg2-binary
   ```

2. **Update DATABASE_URL:**
   ```
   postgresql://user:password@host:5432/dbname
   ```

## GitHub Student Developer Pack Benefits

- ✅ GitHub Copilot (code generation)
- ✅ Vercel Pro (frontend hosting)
- ✅ Render (backend hosting)
- ✅ Namecheap domain
- ✅ $50 AWS credits
- ✅ Digital Ocean credits

## Monitoring & Analytics

1. **Vercel Analytics:**
   - Dashboard shows page performance
   - Real-time analytics
   - Error tracking

2. **Render Logs:**
   - Real-time logs
   - Deployment history
   - Error notifications

## Security Checklist

- [ ] Change JWT secret in production
- [ ] Set HTTPS only
- [ ] Configure CORS properly
- [ ] Use environment variables for secrets
- [ ] Enable database backups
- [ ] Set up monitoring/alerts
- [ ] Use strong passwords
- [ ] Enable API rate limiting

## Performance Optimization

1. **Frontend:**
   - Enable Vercel Edge Functions
   - Set up CDN caching
   - Optimize images

2. **Backend:**
   - Use database indexes
   - Enable query caching
   - Set up background jobs for heavy operations

## Troubleshooting

### Deploy fails with 404
- Check build command
- Verify environment variables
- Check file permissions

### Database connection issues
- Verify DATABASE_URL
- Check database status
- Ensure network access

### CORS errors
- Update CORS_ORIGINS
- Check frontend URL
- Verify API endpoint

## Cost Estimation

- Vercel: Free tier (up to 3 projects)
- Render: ~$5-10/month for basic plan
- PostgreSQL: ~$15/month for basic tier
- Domain: ~$12/year from Namecheap

---

For more help, see [README.md](./README.md)
