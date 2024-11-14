import os
import sys

from flask import Flask, jsonify
# Absolute path to the 'game_logic' folder
game_logic_path = "/Users/nicoletiokhin/Desktop/Software Semester 3/Gamified-Programming-1/game_logic"

# Add 'game_logic' directory to the Python path
sys.path.append(game_logic_path)

# Now try importing the Loader class
from game_python.loader import Loader 
from game_logic.game_python.content_work import ContentWork
from game_logic.game_python.quiz_logic import QuizLogic

# Initialize Flask app
app = Flask(__name__)


# Initialize the loader
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
    # Use ContentWork class to handle the content
    content_work = ContentWork(content)
    content_work.process_content()
    return jsonify({
        'message': f"Data from {filename} loaded successfully.",
        'content': loader.get_content(),
        'tasks': loader.get_tasks()
    })

@app.route('/get_content', methods=['GET'])
def get_content():
    return jsonify(loader.get_content())

@app.route('/get_tasks', methods=['GET'])
def get_tasks():
    return jsonify(loader.get_tasks())

@app.route('/quiz', methods=['POST'])
def start_quiz():
    # Get the tasks (quiz data) from the loader
    tasks = loader.get_tasks()
    
    # Use QuizLogic class to handle and process the quiz tasks
    quiz_logic = QuizLogic(tasks)
    quiz_logic.process_tasks()  # Process and display each quiz task
    
    return jsonify({
        'message': "Quiz processed successfully.",
        'tasks': tasks
    })

@app.route('/check_answer', methods=['POST'])
def check_answer():
    # Get the user's input and the quiz type from the request
    data = request.json
    task_description = data.get("task_description")
    user_input = data.get("user_input")
    
    # Get the correct quiz data based on task description
    tasks = loader.get_tasks()
    task = next((t for t in tasks if t['description'] == task_description), None)
    
    if task:
        quiz = task.get('quiz')
        if quiz['type'] == 'fillout-quiz':
            # Check fill-out quiz answer
            quiz_logic = QuizLogic([task])
            quiz_logic._check_fillout_answer(user_input, quiz['solutions'])
        elif quiz['type'] == 'coding-quiz':
            # Check coding quiz answer
            quiz_logic = QuizLogic([task])
            quiz_logic._check_coding_answer(user_input, quiz['solution'])
        
        return jsonify({
            'message': f"Checked answer for task: {task_description}",
            'user_input': user_input
        })
    else:
        return jsonify({
            'message': 'Task not found.'
        }), 404



if __name__ == '__main__':
    app.run(debug=True)
