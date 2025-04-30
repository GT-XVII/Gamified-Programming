import os
import sys

# Path to game_logic folder
game_logic_path = os.path.join(os.path.dirname(__file__), "game_logic")
sys.path.append(game_logic_path)

# Import game logic classes
from game_logic.game_python.loader import Loader
from game_logic.game_python.content_work import ContentWork
from game_logic.game_python.quiz_logic import QuizLogic
from flask import Flask, jsonify, request
from flask_cors import CORS
from supabase import create_client, Client
from dotenv import load_dotenv  # Not needed if you're passing values directly

# Directly assign your Supabase URL and Key
SUPABASE_URL = 'https://ipgtewpoorcnqsybtcjw.supabase.co'  
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwZ3Rld3Bvb3JjbnFzeWJ0Y2p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNzUzNjIsImV4cCI6MjA1OTk1MTM2Mn0.zrKRfYwHFuzmhz69Eo09FD2G9EfkpQAMfm0k3Q-32NY'  

# Initialize Supabase Client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

loader = Loader()
content_work = None

@app.route('/')
def home():
    return "Welcome to the Flask API for the Gamified Programming"

@app.route('/create_user', methods=['POST'])
def create_user():
    data = request.json
    firebase_uid = data.get("firebase_uid")
    username = data.get("username")
    email = data.get("email")

    # Ensure required data is present
    if not firebase_uid or not username or not email:
        return jsonify({"error": "Missing required fields"}), 400

    # Check if user exists in Supabase database
    existing_user = supabase.table("users").select("*").eq("firebase_uid", firebase_uid).execute()
    if existing_user.data:
        return jsonify({"message": "User already exists"}), 400

    # Insert new user into Supabase
    res = supabase.table("users").insert({
        "firebase_uid": firebase_uid,
        "username": username,
        "email": email
    }).execute()

    if res.status_code != 201:
        return jsonify({"error": "Failed to create user"}), 500

    return jsonify({"message": "User created successfully", "data": res.data}), 201

@app.route('/save_result', methods=['POST'])
def save_result():
    data = request.json
    firebase_uid = data.get("firebase_uid")

    # Ensure required data is present
    if not firebase_uid or "score" not in data or "total_questions" not in data:
        return jsonify({"error": "Missing required fields"}), 400
    
    # Fetch user by Firebase UID from Supabase
    user_response = supabase.table("users").select("*").eq("firebase_uid", firebase_uid).execute()
    if not user_response.data:
        return jsonify({"error": "User not found"}), 404
    user = user_response.data[0]

    # Insert quiz result
    result = {
        "user_id": user["id"],
        "score": data["score"],
        "total_questions": data["total_questions"]
    }
    res = supabase.table("quiz_results").insert(result).execute()

    if res.error is not None:
        return jsonify({"error": "Failed to save quiz result"}), 500

    return jsonify({"message": "Quiz result saved!", "data": res.data}), 201

@app.route('/results/<firebase_uid>', methods=['GET'])
def get_results(firebase_uid):
    # Fetch user by Firebase UID from Supabase
    user_response = supabase.table("users").select("*").eq("firebase_uid", firebase_uid).execute()
    if not user_response.data:
        return jsonify({"error": "User not found"}), 404
    user = user_response.data[0]

    # Fetch quiz results for user
    results_response = supabase.table("quiz_results").select("*").eq("user_id", user["id"]).execute()
    results = results_response.data

    return jsonify([
        {"score": r["score"], "total_questions": r["total_questions"], "timestamp": r.get("created_at")}
        for r in results
    ])

@app.route('/load_data/<filename>', methods=['GET'])
def load_data(filename):
    loader.load_json(filename)
    content = loader.get_content()
    tasks = loader.get_tasks()
    quiz_logic = QuizLogic(tasks)

    if content:
        global content_work
        content_work = ContentWork(content)
        content_work.process_content()

    return jsonify({
        'message': f"Data from {filename} loaded successfully.",
        'content': content,
        'tasks': quiz_logic.process_tasks()
    })

@app.route('/check_answer', methods=['POST'])
def check_answer():
    data = request.json
    task_description = data.get("task_description")
    user_input = data.get("user_input")

    tasks = loader.get_tasks()
    task = next((t for t in tasks if t['description'] == task_description), None)
    
    if task:
        quiz = task.get('quiz')
        quiz_logic = QuizLogic([task])
        if quiz['type'] == 'fillout-quiz':
            feedback = quiz_logic._check_fillout_answer(user_input, quiz['solutions'])
        elif quiz['type'] == 'coding-quiz':
            feedback = quiz_logic._check_coding_answer(user_input, quiz['solution'])
        else:
            feedback = "Unsupported quiz type."

        return jsonify({
            'message': feedback,
            'user_input': user_input
        })
    else:
        return jsonify({'message': 'Task not found.'}), 404
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050, debug=True)