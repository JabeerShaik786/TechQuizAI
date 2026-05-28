"""One-time DB schema fixer.

Fixes missing columns in the existing SQLite `users` table so the
current SQLAlchemy `User` model can query successfully.

This script is safe to run multiple times.

Usage:
  python backend/fix_db_columns.py

Notes:
- Backend default DB is configured in backend/config.py as:
    sqlite:///techquiz.db
  which corresponds to a SQLite file at the project root: <repo>/techquiz.db
"""

import os
import sqlite3
from pathlib import Path


def column_exists(conn: sqlite3.Connection, table: str, column: str) -> bool:
    cur = conn.execute(f"PRAGMA table_info({table})")
    rows = cur.fetchall()
    # rows: (cid, name, type, notnull, dflt_value, pk)
    return any(r[1] == column for r in rows)


def resolve_db_path() -> Path:
    # repo root is one level above backend/
    repo_root = Path(__file__).resolve().parent.parent

    # default: sqlite:///techquiz.db => techquiz.db in repo root
    candidate = repo_root / "techquiz.db"
    if candidate.exists():
        return candidate

    # fallback: search for a techquiz.db anywhere under repo
    for p in repo_root.rglob("techquiz.db"):
        if p.is_file():
            return p

    raise FileNotFoundError(
        f"SQLite DB not found. Expected <repo>/techquiz.db, looked under: {repo_root}"
    )


def main():
    db_path = resolve_db_path()

    conn = sqlite3.connect(str(db_path))
    try:
        # Ensure table exists (helps with clearer error)
        conn.execute("SELECT 1 FROM users LIMIT 1")

        with conn:
            if not column_exists(conn, "users", "avatar"):
                conn.execute("ALTER TABLE users ADD COLUMN avatar BLOB")

            if not column_exists(conn, "users", "avatar_filename"):
                conn.execute("ALTER TABLE users ADD COLUMN avatar_filename VARCHAR(255)")

            if not column_exists(conn, "users", "last_quiz_date"):
                conn.execute("ALTER TABLE users ADD COLUMN last_quiz_date DATE")

    except sqlite3.OperationalError as e:
        raise RuntimeError(
            f"SQLite schema fix failed. DB={db_path}. Error={e}"
        )
    finally:
        conn.close()

    print(f"DB schema check complete: avatar/avatar_filename/last_quiz_date columns are present. DB={db_path}")


if __name__ == "__main__":
    main()

