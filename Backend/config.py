import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://myuser:mypassword@localhost/mydb'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get("SECRET_KEY") or "supersecretkey"
