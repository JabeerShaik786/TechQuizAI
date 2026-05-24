# Performance Optimization Guide

## Frontend Optimization

### 1. Code Splitting
```javascript
import { lazy, Suspense } from 'react'

const Dashboard = lazy(() => import('./pages/Dashboard'))

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Dashboard />
    </Suspense>
  )
}
```

### 2. Image Optimization
- Use WebP format when possible
- Compress images before upload
- Implement lazy loading
- Use responsive images

### 3. Bundle Size
```bash
# Check bundle size
npm run build -- --analyze

# Tree-shake unused code
import { specific } from 'library'  // Good
import * from 'library'              // Bad
```

### 4. Memoization
```javascript
import { useMemo, useCallback } from 'react'

function Component() {
  const memoizedValue = useMemo(() => expensiveOperation(), [dependency])
  const memoizedCallback = useCallback(() => { /* ... */ }, [])
}
```

### 5. Virtual Scrolling
```javascript
import { FixedSizeList } from 'react-window'

function List() {
  return (
    <FixedSizeList height={600} itemCount={1000} itemSize={35}>
      {Row}
    </FixedSizeList>
  )
}
```

## Backend Optimization

### 1. Database Indexes
```python
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, index=True)
    email = db.Column(db.String(120), unique=True, index=True)
    created_at = db.Column(db.DateTime, index=True)
```

### 2. Query Optimization
```python
# Bad - N+1 query problem
users = User.query.all()
for user in users:
    quizzes = user.quizzes  # Extra query per user

# Good - Use eager loading
users = User.query.options(joinedload(User.quizzes)).all()
```

### 3. Pagination
```python
@quiz_bp.route('/history', methods=['GET'])
def get_quiz_history():
    page = request.args.get('page', 1, type=int)
    per_page = 10
    
    quizzes = Quiz.query.paginate(page=page, per_page=per_page)
    return jsonify({
        'quizzes': [q.to_dict() for q in quizzes.items],
        'total': quizzes.total
    })
```

### 4. Caching
```python
from flask_caching import Cache

cache = Cache(app, config={'CACHE_TYPE': 'simple'})

@app.route('/topics')
@cache.cached(timeout=3600)
def get_topics():
    return QuizService.get_topics()
```

### 5. Async Operations
```python
# Long-running tasks
from celery import Celery

celery = Celery(app.name)

@celery.task
def generate_quiz_async(user_id, topic, difficulty):
    # Heavy operation
    pass
```

## Database Optimization

### 1. Connection Pooling
```python
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    'pool_size': 10,
    'pool_recycle': 3600,
    'pool_pre_ping': True,
}
```

### 2. Batch Operations
```python
# Bad - Multiple inserts
for question in questions:
    db.session.add(question)
    db.session.commit()

# Good - Batch insert
db.session.add_all(questions)
db.session.commit()
```

### 3. Query Limits
```python
# Always limit results
quizzes = Quiz.query.limit(100).all()
```

## Monitoring & Analytics

### Frontend Metrics
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)

### Backend Metrics
- Response time
- Error rate
- Database query time
- Memory usage

### Tools
- Google PageSpeed Insights
- Lighthouse
- New Relic
- Sentry for error tracking

## Deployment Optimization

### Frontend
```bash
# Production build
npm run build

# Serve with gzip compression
npm install -g serve
serve -s dist
```

### Backend
```bash
# Use Gunicorn with multiple workers
gunicorn --workers 4 --worker-class sync app:app

# Or with async workers
gunicorn --workers 1 --worker-class eventlet app:app
```

## CDN Configuration

### Frontend
- Use Vercel's Edge Network
- CloudFront for Netlify

### Static Assets
- Cache images, fonts, CSS/JS
- Implement cache versioning

## Performance Checklist

- [ ] Images optimized and lazy-loaded
- [ ] Code splitting implemented
- [ ] Unused dependencies removed
- [ ] Database queries optimized
- [ ] Caching enabled
- [ ] Compression enabled
- [ ] CDN configured
- [ ] Monitoring set up
- [ ] Load testing passed
- [ ] Performance budgets met

---

For more info, see [README.md](./README.md)
