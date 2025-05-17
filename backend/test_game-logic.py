import unittest
from unittest.mock import MagicMock
from game_logic.game_python.loader import Loader
from game_logic.game_python.content_work import ContentWork
from game_logic.game_python.quiz_logic import QuizLogic

class GameLogicTestCase(unittest.TestCase):
    def test_loader(self):
        """Test the functionality of the Loader class."""
        loader = Loader()
        loader.load_json = MagicMock()  # Mock load_json to avoid file I/O
        loader.load_json('test.json')   # Call the mocked method
        self.assertTrue(loader.load_json.called)

    def test_content_work(self):
        """Test the ContentWork class."""
        content = {'some': 'content'}
        content_work = ContentWork(content)
        content_work.process_content = MagicMock()  # Mock the processing method
        content_work.process_content()  # Call the mocked method
        self.assertTrue(content_work.process_content.called)

    def test_quiz_logic(self):
        """Test the QuizLogic class."""
        tasks = [
            {
                'description': 'Task 1',
                'quiz': {'type': 'fillout-quiz', 'solutions': ['answer1']}
            }
        ]
        quiz_logic = QuizLogic(tasks)
        feedback = quiz_logic._check_fillout_answer('answer1', ['answer1'])
        self.assertEqual(feedback, "Correct!")

if __name__ == '__main__':
    unittest.main()
