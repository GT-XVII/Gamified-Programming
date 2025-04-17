import unittest
from game import app  # Import only the app

class FlaskAppTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_home_route(self):
        """Test if the home route returns the welcome message."""
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Welcome to the Flask API", response.data)

   

if __name__ == '__main__':
    unittest.main()
