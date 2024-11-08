import os
import json
from flask import Flask, jsonify

app = Flask(__name__)

# Route to get game data based on topic
@app.route('/api/get-game-data/<topic>', methods=['GET'])
def get_game_data(topic):
    try:
        # Use the absolute path to the JSON files directory
        base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'game_logic/json_files'))
        filename = os.path.join(base_path, f'{topic}.json')

        print(f"Looking for file: {filename}")  # Debugging print statement to see the full file path

        # Check if the file exists
        if not os.path.exists(filename):
            return jsonify({"error": "Topic not found"}), 404

        # Open and read the JSON file
        with open(filename, 'r', encoding='utf-8') as file:
            game_data = json.load(file)

        return jsonify(game_data)
    
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

# Run 
if __name__ == '__main__':
    app.run(debug=True)
