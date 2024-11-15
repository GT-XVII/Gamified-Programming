import os
import sys
from flask import Flask, jsonify, request
from flask_cors import CORS

# Absolute path to the 'game_logic' folder
game_logic_path = "/Users/nicoletiokhin/Desktop/Software Semester 3/Gamified-Programming-1/game_logic"
sys.path.append(game_logic_path)

# Import necessary classes
from game_logic.game_python.loader import Loader
from game_logic.game_python.content_work import ContentWork
from game_logic.game_python.quiz_logic import QuizLogic

from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# Initialize the loader and content worker
loader = Loader()
content_work = None

@app.route('/')
def home():
    return "Welcome to the Flask API for the Gamified Programming"

@app.route('/load_data/<filename>', methods=['GET'])
def load_data(filename):
    # Load JSON file using Loader
    loader.load_json(filename)
    content = loader.get_content()
    tasks = loader.get_tasks()
    quiz_logic = QuizLogic(tasks)

    # Process content if necessary (optional)
    if content:
        content_work = ContentWork(content)
        content_work.process_content()

    return jsonify({
        'message': f"Data from {filename} loaded successfully.",
        'content': content,
        'tasks': quiz_logic.process_tasks()  # Send tasks ready for the frontend
    })

@app.route('/check_answer', methods=['POST'])
def check_answer():
    data = request.json
    print(f"Received data: {data}")  # Debug
    task_description = data.get("task_description")
    user_input = data.get("user_input")
    print(f"Description: {task_description}, User Input: {user_input}")


    tasks = loader.get_tasks()
    task = next((t for t in tasks if t['description'] == task_description), None)
    
    if task:
        quiz = task.get('quiz')
        quiz_logic = QuizLogic([task])
        if quiz['type'] == 'fillout-quiz':
            # Pass the list of inputs to `_check_fillout_answer`
            feedback = quiz_logic._check_fillout_answer(user_input, quiz['solutions'])
        elif quiz['type'] == 'coding-quiz':
            # Single answer check for coding-quiz
            feedback = quiz_logic._check_coding_answer(user_input, quiz['solution'])  # Still treat as single input
        else:
            feedback = "Unsupported quiz type."

        return jsonify({
            'message': feedback,
            'user_input': user_input
        })
    else:
        return jsonify({
            'message': 'Task not found.'
        }), 404
if __name__ == '__main__':
    print("Running Flask server...")
    app.run(debug=True)