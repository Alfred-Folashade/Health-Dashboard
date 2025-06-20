from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import db, User,GlucoseReading
from config import Config
import datetime as datetime
from flask_jwt_extended import decode_token


app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config.from_object(Config)

db.init_app(app)
jwt = JWTManager(app)



with app.app_context():
    db.create_all()






@app.route("/register", methods=["POST"])
def register():
    data = request.json
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "User already exists"}), 400
    new_user = User(email=data["email"])
    new_user.set_password(data["password"])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.json #email and password
    user = User.query.filter_by(email=data["email"]).first()  #finds first matching user with that email
    if user and user.check_password(data["password"]):   #returns false if user is none or password is incorrect 
        token = token = create_access_token(identity=str(user.id))
        return jsonify({"token": token}), 200
    return jsonify({"error": "Invalid credentials"}), 401

@app.route("/readings-form", methods=["POST"])
@jwt_required()
def create_glucose_reading():
    user_id = get_jwt_identity() #retrieves userID from jwt token
    data = request.json
    readingData = data["readingData"]
    date = readingData["date"]
    time = readingData["time"]
    timestamp = f"{date} {time}"     #combines date and time into one string
    print(user_id)
    new_GlucoseReading = GlucoseReading(
        user_id= user_id,
        glucose_reading = readingData["reading"],
        reading_time = datetime.datetime.strptime(timestamp, "%Y-%m-%d %H:%M"),
        test_type = readingData["test_type"],
        notes = readingData["notes"]
    )

    db.session.add(new_GlucoseReading)
    db.session.commit()
    
    print("hello")
    print(readingData["reading"])
    return "hi"



if __name__ == "__main__":
    app.run(debug=True)
    decode_token("token	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc1MDE5MjAzNSwianRpIjoiYWU4NjU2NDEtZjU2OC00YjBiLWE0ZmMtYjdlYmI4ZThhZmMyIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MiwibmJmIjoxNzUwMTkyMDM1LCJjc3JmIjoiODRiNjU0MDAtYjNmYS00ZWUwLWIzODgtMzYwODhhMmIzNTMxIiwiZXhwIjoxNzUwMTkyOTM1fQ.EsP-1u2dxMy5KCqgnVEfrBHX4pc4AtevfSun2Raww_Y")

