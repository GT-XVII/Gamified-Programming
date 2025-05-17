import unittest
from game_logic.game_python.quiz_logic import QuizLogic

class TestQuizLogic(unittest.TestCase):
    def setUp(self):
        self.tasks = [
            {
                "description": "What is the capital of France?",
                "difficulty": "easy",
                "quiz": {
                    "type": "fillout-quiz",
                    "solutions": ["Paris", "paris"]
                }
            },
            {
                "description": "Write a function to add two numbers",
                "difficulty": "medium",
                "quiz": {
                    "type": "coding-quiz",
                    "solution": "def add(a, b): return a + b"
                }
            }
        ]
        self.logic = QuizLogic(self.tasks)

    def test_process_tasks(self):
        processed = self.logic.process_tasks()
        self.assertEqual(len(processed), 2)
        self.assertIn("description", processed[0])
        self.assertIn("quiz", processed[1])

    def test_check_fillout_answer_correct(self):
        result = self.logic.check_answer(self.tasks[0], "Paris")
        self.assertEqual(result, "Correct!")

    def test_check_fillout_answer_incorrect(self):
        result = self.logic.check_answer(self.tasks[0], "London")
        self.assertEqual(result, "Incorrect. Try again.")

    def test_check_coding_answer_correct(self):
        result = self.logic.check_answer(self.tasks[1], "def add(a, b): return a + b")
        self.assertEqual(result, "Correct!")

    def test_check_coding_answer_incorrect(self):
        result = self.logic.check_answer(self.tasks[1], "def add(x, y): return x - y")
        self.assertEqual(result, "Incorrect. The correct answer is: def add(a, b): return a + b")

if __name__ == "__main__":
    unittest.main()
