import os
import sys
from flask import Flask, jsonify, request
from flask_cors import CORS
from supabase import create_client, Client

game_logic_path = os.path.join(os.path.dirname(__file__), "game_logic")
sys.path.append(game_logic_path)

from game_logic.game_python.loader import Loader
from game_logic.game_python.content_work import ContentWork
from game_logic.game_python.quiz_logic import QuizLogic

app = Flask(__name__)
CORS(app)

SUPABASE_URL = 'https://ipgtewpoorcnqsybtcjw.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwZ3Rld3Bvb3JjbnFzeWJ0Y2p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNzUzNjIsImV4cCI6MjA1OTk1MTM2Mn0.zrKRfYwHFuzmhz69Eo09FD2G9EfkpQAMfm0k3Q-32NY'
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

loader = Loader()
content_work = None

@app.route('/')
def home():
    return "Welcome to the Flask API for the Gamified Programming"

@app.route('/load_data/<filename>', methods=['GET'])
def load_data(filename):
    loader.load_json(filename)
    content = loader.get_content()
    tasks = loader.get_tasks()
    quiz_logic = QuizLogic(tasks)
    if content:
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
    print(f"Received data: {data}")
    task_description = data.get("task_description")
    user_input = data.get("user_input")
    print(f"Description: {task_description}, User Input: {user_input}")
    firebase_uid = data.get("firebase_uid")
    user_response = supabase.table("users").select("*").eq("firebase_uid", firebase_uid).execute()
    if not user_response.data:
        return jsonify({'message': 'User not found. Please sign up first.'}), 404
    user = user_response.data[0]
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
        score = 1 if feedback == "Correct!" else 0
        result = {
            "user_id": user["id"],
            "score": score,
            "total_questions": 1
        }
        supabase.table("quiz_results").insert(result).execute()
        return jsonify({
            'message': feedback,
            'user_input': user_input
        })
    else:
        return jsonify({'message': 'Task not found.'}), 404

@app.route('/save_result', methods=['POST'])
def save_result():
    data = request.json
    firebase_uid = data.get("firebase_uid")
    user_response = supabase.table("users").select("*").eq("firebase_uid", firebase_uid).execute()
    if not user_response.data:
        return jsonify({"error": "User not found"}), 404
    user = user_response.data[0]
    result = {
        "user_id": user["id"],
        "score": data["score"],
        "total_questions": data["total_questions"]
    }
    supabase.table("quiz_results").insert(result).execute()
    return jsonify({"message": "Quiz result saved!"}), 201

@app.route('/results/<firebase_uid>', methods=['GET'])
def get_results(firebase_uid):
    user_response = supabase.table("users").select("*").eq("firebase_uid", firebase_uid).execute()
    if not user_response.data:
        return jsonify({"error": "User not found"}), 404
    user = user_response.data[0]
    results_response = supabase.table("quiz_results").select("*").eq("user_id", user["id"]).execute()
    results = results_response.data
    return jsonify([
        {"score": r["score"], "total_questions": r["total_questions"], "timestamp": r.get("created_at")}
        for r in results
    ])

if __name__ == '__main__':
    def run_server():
        print("Starting Flask server...")
        app.run(host='0.0.0.0', port=5050, debug=True)
    run_server()