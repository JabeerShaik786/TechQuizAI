# Development guidelines for TechQuiz AI

## Code Style Guide

### Python Backend

1. **Naming Conventions:**
   - Functions: `snake_case`
   - Classes: `PascalCase`
   - Constants: `UPPER_SNAKE_CASE`
   - Private: `_leading_underscore`

2. **Code Structure:**
   - One blank line between methods
   - Two blank lines between classes
   - Maximum line length: 100 characters
   - Use type hints where applicable

3. **Documentation:**
   ```python
   def function_name(param1, param2):
       """Brief description.
       
       Args:
           param1: Description
           param2: Description
           
       Returns:
           Description of return value
       """
   ```

### JavaScript/React Frontend

1. **Naming Conventions:**
   - Components: `PascalCase`
   - Functions: `camelCase`
   - Constants: `UPPER_SNAKE_CASE`
   - Files: `kebab-case.js`

2. **Component Structure:**
   - Imports at top
   - Component function
   - Hooks (useState, useEffect)
   - Event handlers
   - JSX return
   - Export statement

3. **Best Practices:**
   - Use functional components
   - Use hooks instead of class components
   - Destructure props
   - Use arrow functions

## Git Workflow

1. **Branch Naming:**
   - Feature: `feature/feature-name`
   - Bug fix: `bugfix/bug-name`
   - Hotfix: `hotfix/issue-name`

2. **Commit Messages:**
   - Be descriptive
   - Use imperative mood
   - Reference issues: `Fixes #123`
   - Example: `feat: add quiz timer functionality`

3. **Pull Requests:**
   - One feature per PR
   - Clear description
   - Link related issues
   - Request review

## Project Structure Best Practices

### Backend
```
routes/
  ├── auth_routes.py      # Auth endpoints
  ├── quiz_routes.py      # Quiz endpoints
  └── ...

services/
  ├── auth_service.py     # Auth business logic
  ├── quiz_service.py     # Quiz logic
  └── ...

models.py                 # Database models
extensions.py             # Flask extensions
config.py                 # Configuration
app.py                    # App factory
```

### Frontend
```
components/
  ├── UIComponents.jsx    # Reusable UI
  ├── NavBar.jsx
  └── ...

pages/
  ├── Home.jsx
  ├── Dashboard.jsx
  └── ...

hooks/
  ├── useAuthService.js
  └── ...

services/
  └── api.js

store/
  └── index.js
```

## Testing

### Backend
```bash
# Run tests
pytest tests/

# With coverage
pytest --cov=.
```

### Frontend
```bash
# Run tests
npm test

# Watch mode
npm test -- --watch
```

## Performance Optimization

### Frontend
- Code splitting with React.lazy()
- Image optimization
- Memoization for expensive computations
- Virtual scrolling for long lists
- Minimize bundle size

### Backend
- Database indexing
- Query optimization
- Caching strategies
- Async operations
- Connection pooling

## Security Best Practices

1. **Authentication:**
   - Never expose tokens in localStorage
   - Use HTTP-only cookies for sensitive data
   - Implement refresh token rotation
   - Clear tokens on logout

2. **API Security:**
   - Validate all inputs
   - Use HTTPS in production
   - Implement rate limiting
   - Add CORS headers properly
   - Use parameterized queries

3. **Secrets Management:**
   - Never commit .env files
   - Use environment variables
   - Rotate secrets regularly
   - Use secure random generators

## Debugging Tips

### Frontend
- Use React DevTools browser extension
- Check Network tab in DevTools
- Use console logging strategically
- Inspect component props

### Backend
- Use Flask debugger with --debug flag
- Check logs for errors
- Use breakpoints in IDE
- Test endpoints with Postman/curl

## Common Issues & Solutions

### Frontend CORS errors
- Check backend CORS configuration
- Verify API URL
- Check request headers
- Ensure backend is running

### Backend database errors
- Verify database connection
- Check migrations
- Ensure tables exist
- Clear cache if needed

### Authentication issues
- Verify JWT secret matches
- Check token expiration
- Ensure token is in header
- Verify user exists

## Resources

- Flask Documentation: https://flask.palletsprojects.com
- React Documentation: https://react.dev
- SQLAlchemy: https://www.sqlalchemy.org
- Tailwind CSS: https://tailwindcss.com

## Code Review Checklist

Before submitting PR, ensure:
- [ ] Code follows style guide
- [ ] No console errors/warnings
- [ ] Tests pass
- [ ] Comments added for complex logic
- [ ] No hardcoded values
- [ ] Performance acceptable
- [ ] Security best practices followed
- [ ] Documentation updated

---

Happy coding! 🚀
