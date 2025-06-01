from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class GlucoseReading(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    glucose_reading = db.Column(db.Numeric(4, 1))
    reading_time = db.Column(db.DateTime, nullable=False, default=datetime.now())
    test_type = db.Column(db.String(128))
    notes = db.Column(db.Text)
    user = db.relationship('User',backref=db.backref('glucose_readings', lazy=True))
