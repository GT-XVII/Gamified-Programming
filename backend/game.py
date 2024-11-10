import os
import sys

from flask import Flask, jsonify
# Absolute path to the 'game_logic' folder
game_logic_path = "/Users/nicoletiokhin/Desktop/Software Semester 3/Gamified-Programming-1/game_logic"

# Add 'game_logic' directory to the Python path
sys.path.append(game_logic_path)

# Now try importing the Loader class
from game_python.loader import Loader  # Now this should work
# Initialize Flask app
app = Flask(__name__)

# Initialize the loader
loader = Loader()

@app.route('/')
def home():
    return "Welcome to the Flask API for the Gamified Programming"

@app.route('/load_data/<filename>', methods=['GET'])
def load_data(filename):
    # Load JSON file using Loader
    loader.load_json(filename)
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

if __name__ == '__main__':
    app.run(debug=True)
