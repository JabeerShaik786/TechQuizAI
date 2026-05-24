"""Flask-Migrate + migration helper.

This file exists to make it easy to run migrations from a plain Python entrypoint
without adding additional CLI wrappers.

Typical workflow:
  1) Install dependencies:
     pip install flask-migrate
  2) Initialize migration folder (once):
     flask db init
  3) Create migration (whenever models change):
     flask db migrate -m "..."
  4) Apply migration:
     flask db upgrade

See README/Quickstart for full steps.

Note:
- Your project already initializes Migrate inside backend/app.py.
- You still need an actual migrations/ folder and alembic env.
"""

# Intentionally left minimal.

