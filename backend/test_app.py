import unittest
from game import app
from unittest.mock import patch

class FlaskAppTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_home_route(self):
        """Test if the home route returns the welcome message."""
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Welcome to the Flask API for the Gamified Programming", response.data)

    def test_load_data(self):
        """Test the load_data route to ensure data is loaded correctly."""
        with patch('game_logic.game_python.loader.Loader.load_json') as mock_load_json:
            mock_load_json.return_value = None  # Mock the loading function to avoid file dependency

            response = self.app.get('/load_data/test_file.json')

            self.assertEqual(response.status_code, 200)
            self.assertIn(b"Data from test_file.json loaded successfully.", response.data)
            self.assertIn(b'content', response.data)  # Ensure content is part of the response
            self.assertIn(b'tasks', response.data)    # Ensure tasks are part of the response

    def test_check_answer(self):
        """Test the /check_answer route."""
        task_data = {
            'description': 'Task 1',
            'quiz': {
                'type': 'fillout-quiz',
                'solutions': ['answer1']
            }
        }

        # Mocking the loader's get_tasks method to return a predefined task
        with patch('game_logic.game_python.loader.Loader.get_tasks', return_value=[task_data]):
            response = self.app.post('/check_answer', json={
                'task_description': 'Task 1',
                'user_input': 'answer1'
            })

            self.assertEqual(response.status_code, 200)
            self.assertIn(b'answer1', response.data)  # Check if the answer is part of the response
            self.assertIn(b'message', response.data)  # Ensure message is included in the response

if __name__ == '__main__':
    unittest.main()
