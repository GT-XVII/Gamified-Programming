import os
import sys

# Path to game_logic folder
game_logic_path = os.path.join(os.path.dirname(__file__), "game_logic")
sys.path.append(game_logic_path)

# Import game logic classes
from game_logic.game_python.loader import Loader
from game_logic.game_python.content_work import ContentWork
from game_logic.game_python.quiz_logic import QuizLogic
from flask import Flask, request, jsonify
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
CORS(app, supports_credentials=True)

loader = Loader()
content_work = None

@app.route('/')
def home():
    return "Welcome to the Flask API for the Gamified Programming"

@app.route('/create_user', methods=['POST'])
def create_user():
    data = request.json
    print("Received data:", data)
    firebase_uid = data.get("firebase_uid")
    username = data.get("username")
    email = data.get("email")

    # Ensure required data is present
    print("firebase_uid:", firebase_uid)
    print("quiz_id:", quiz_id)
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
    res = supabase.table("quiz_progress").insert(result).execute()

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
    results_response = supabase.table("quiz_progress").select("*").eq("user_id", user["id"]).execute()
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
    filename = data.get("filename")
    if not filename:
        return jsonify({"error": "Missing filename"}), 400
    loader.load_json(filename)
    user_input = data.get("user_input")
    task_id = data.get("task_id")
    tasks = loader.get_tasks()
    print("Available tasks:")
    for t in tasks:
        print("-", t.get("description"))
    print("Looking for task_id:", task_id)
    task = next((t for t in tasks if str(t.get("id")) == task_id), None)
    
    
    if task:
        quiz = task.get('quiz')
        quiz_logic = QuizLogic([task])
        result = quiz_logic.check_answer(task, user_input)
        print("Answer result:", result)
        feedback = result["feedback"]

        # Save progress and update score if correct
        if result["correct"]:
            firebase_uid = data.get("firebase_uid")
            quiz_id = data.get("filename")  # still coming in from frontend under quiz_type
            print("firebase_uid:", firebase_uid)
            print("quiz_id:", quiz_id)
            if not firebase_uid or not quiz_id:
                return jsonify({"error": "Missing firebase_uid or quiz_id"}), 400

            user_res = supabase.table("users").select("*").eq("firebase_uid", firebase_uid).execute()
            if not user_res.data:
                return jsonify({"error": "User not found"}), 404
            user = user_res.data[0]

            print(f"Correct answer by user {firebase_uid} on task {task_id}")

            # Save progress using upsert to resolve conflicts on (user_id, quiz_id, task_id)
            try:
                payload = {
                    "user_id": user["id"],
                    "task_id": task_id,
                    "is_correct": True,
                    "quiz_id": quiz_id
                }
                print("Payload sent to Supabase quiz_progress:", payload)
                try:
                    response = supabase.rpc("upsert_quiz_progress", {
                        "p_user_id": user["id"],
                        "p_quiz_id": quiz_id,
                        "p_task_id": task_id,
                        "p_is_correct": True
                    }).execute()
                    print("RPC response:", response)
                except Exception as e:
                    print("RPC error:", e)
                    return jsonify({"error": "Failed to save quiz progress", "details": str(e)}), 500
            except Exception as e:
                print("Error saving quiz_progress:", e)
                return jsonify({"error": "Failed to save quiz progress"}), 500


        return jsonify({
            'message': feedback,
            'user_input': user_input
        })
    else:
        return jsonify({'message': 'Task not found.'}), 404
    

# New route: /start_quiz/<filename>/<firebase_uid>
@app.route('/start_quiz/<filename>/<firebase_uid>', methods=['GET'])
def start_quiz(filename, firebase_uid):
    loader.load_json(filename)

    user_res = supabase.table("users").select("id").eq("firebase_uid", firebase_uid).execute()
    if not user_res.data:
        return jsonify({"error": "User not found"}), 404
    user_id = user_res.data[0]["id"]

    results_res = supabase.table("quiz_progress").select("task_id").eq("user_id", user_id).eq("quiz_id", filename).execute()
    completed_tasks = [r["task_id"] for r in results_res.data]
    print("Completed tasks for user:", completed_tasks)
    print("All loader task IDs:", [t["id"] for t in loader.get_tasks()])

    next_task = loader.get_next_uncompleted_task(completed_tasks)

    return jsonify({
        "message": f"Data from {filename} loaded successfully.",
        "content": loader.get_content(),
        "tasks": loader.get_tasks(),
        "next_task": next_task
    })

if __name__ == '__main__':
    print("Registered routes:")
    for rule in app.url_map.iter_rules():
        print(rule)
    app.run(host='0.0.0.0', port=5050, debug=True)