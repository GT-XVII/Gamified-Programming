import os
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
from game_logic.game_python.loader import Loader
from game_logic.game_python.content_work import ContentWork
from game_logic.game_python.quiz_logic import QuizLogic
from dotenv import load_dotenv

SUPABASE_URL = 'https://ipgtewpoorcnqsybtcjw.supabase.co'  
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwZ3Rld3Bvb3JjbnFzeWJ0Y2p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNzUzNjIsImV4cCI6MjA1OTk1MTM2Mn0.zrKRfYwHFuzmhz69Eo09FD2G9EfkpQAMfm0k3Q-32NY'  
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,OPTIONS'
    return response

@app.route('/course_progress/<firebase_uid>', methods=['GET'])
def get_course_progress(firebase_uid):
    user_response = supabase.table("users").select("id").eq("firebase_uid", firebase_uid).execute()
    if not user_response.data:
        return jsonify({"error": "User not found"}), 404
    if not user_response.data or "id" not in user_response.data[0]:
        print("User ID missing or invalid format")
        return jsonify({"error": "User ID not found or malformed"}), 500
    user_id = user_response.data[0]["id"]

    progress_response = supabase.table("user_progress").select("quiz_tasks!inner(quiz_id, task_id)").eq("user_id", user_id).execute()

    from collections import defaultdict
    progress_summary = defaultdict(int)

    for entry in progress_response.data:
        quiz_tasks = entry.get("quiz_tasks")
        if quiz_tasks:
            quiz_id = quiz_tasks.get("quiz_id", "").replace(".json", "")
            progress_summary[quiz_id] += 1

    return jsonify(dict(progress_summary))


# Path to game_logic folder
game_logic_path = os.path.join(os.path.dirname(__file__), "game_logic")
sys.path.append(game_logic_path)

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
    task = next((t for t in tasks if str(t.get("id")) == task_id), None)
    
    
    if task:
        quiz_logic = QuizLogic([task])
        result = quiz_logic.check_answer(task, user_input)
        feedback = result["feedback"]

        # Save progress and update score if correct
        if result["correct"]:
            firebase_uid = data.get("firebase_uid")
            quiz_id = data.get("filename")  # still coming in from frontend under quiz_type
            if not firebase_uid or not quiz_id:
                return jsonify({"error": "Missing firebase_uid or quiz_id"}), 400

            user_res = supabase.table("users").select("*").eq("firebase_uid", firebase_uid).execute()
            if not user_res.data:
                return jsonify({"error": "User not found"}), 404
            user = user_res.data[0]

            print(f"Correct answer by user {firebase_uid} on task {task_id}")

            # Find quiz_task_id from quiz_tasks table using quiz_id and task_id
            quiz_task_res = supabase.table("quiz_tasks").select("id").eq("quiz_id", quiz_id).eq("task_id", task_id).execute()
            if not quiz_task_res.data or len(quiz_task_res.data) == 0:
                print("quiz_task_id not found for given quiz_id and task_id")
                return jsonify({"error": "Quiz task not found"}), 404
            quiz_task_id = quiz_task_res.data[0]["id"]

            # Check if user_progress entry already exists
            existing_progress_res = supabase.table("user_progress").select("*").eq("user_id", user["id"]).eq("quiz_task_id", quiz_task_id).execute()
            if not existing_progress_res.data or len(existing_progress_res.data) == 0:
                # Insert new progress entry
                try:
                    insert_res = supabase.table("user_progress").insert({
                        "user_id": user["id"],
                        "quiz_task_id": quiz_task_id
                    }).execute()
                    if insert_res.status_code >= 400:
                        print("Failed to insert user_progress. Status:", insert_res.status_code)
                        return jsonify({"error": "Failed to save user progress"}), 500
                except Exception as e:
                    print("Exception inserting user_progress:", e)
                    return jsonify({"error": "Failed to save user progress"}), 500


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

    # Prefill progress entries for all tasks if missing
    # Removed insertion of is_correct: False during task prefill

    results_res = supabase.table("user_progress").select("quiz_tasks(task_id, quiz_id)").eq("user_id", user_id).execute()
    completed_tasks = [
        r["quiz_tasks"]["task_id"]
        for r in results_res.data
        if r.get("quiz_tasks") and r["quiz_tasks"]["quiz_id"] == filename
    ]

    next_task = loader.get_next_uncompleted_task(completed_tasks)

    return jsonify({
        "message": f"Data from {filename} loaded successfully.",
        "content": loader.get_content(),
        "tasks": loader.get_tasks(),
        "next_task": next_task
    })

@app.route('/quiz_tasks/<quiz_id>', methods=['GET'])
def get_quiz_task_count(quiz_id):
    if not quiz_id.endswith(".json"):
        quiz_id += ".json"
    print(f"Fetching task count for quiz_id: {quiz_id}")
    response = supabase.table("quiz_tasks").select("id, quiz_id, task_id").eq("quiz_id", quiz_id).execute()
    
    print("Task rows fetched:", response.data)  # 🔍 This will help diagnose issues

    if not response.data:
        return jsonify({"count": 0})
    print(f"Sending task count {len(response.data)} for {quiz_id}")
    print(f"Returning task count: {len(response.data)} for quiz_id: {quiz_id}")
    return jsonify({"count": len(response.data)})

def initialize_quiz_tasks():
    # Only load quiz files to ensure structure is available; do not insert quiz_progress rows here.
    quiz_files = ["booleans.json", "strings.json", "integers.json", "arrays.json"]
    for quiz_file in quiz_files:
        loader.load_json(quiz_file)
        # No insertion or deletion of quiz_progress here.

if __name__ == '__main__':
    initialize_quiz_tasks()
    app.run(host='0.0.0.0', port=5050, debug=True)