import sqlite3

path = r"C:\Users\Jabeer Shaik\Downloads\TechQuizAi\backend\techquiz.db"
conn = sqlite3.connect(path)
print('tables', conn.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall())
print('users cols', conn.execute('PRAGMA table_info(users)').fetchall())
conn.close()
