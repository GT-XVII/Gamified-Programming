from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import db, User, QuizResult


# Initialize Flask App
app = Flask(__name__)
CORS(app)

# Database Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)  # Initialize database 

# save quiz results :) 
@app.route('/save_result', methods=['POST'])
def save_result():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    new_result = QuizResult(
        user_id=user.id,
        score=data['score'],
        total_questions=data['total_questions']
    )
    db.session.add(new_result)
    db.session.commit()

    return jsonify({"message": "Quiz result saved!"}), 201

# get quiz result :) 
@app.route('/results/<username>', methods=['GET'])
def get_results(username):
    user = User.query.filter_by(username=username).first()
    
    if not user:
        return jsonify({"error": "User not found"}), 404

    results = QuizResult.query.filter_by(user_id=user.id).all()
    
    return jsonify([
        {"score": r.score, "total_questions": r.total_questions, "timestamp": r.timestamp} 
        for r in results
    ])

if __name__ == "__main__":
    app.run(debug=True)
