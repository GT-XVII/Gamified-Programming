from typing import Dict, List, Union
from quiz_strategies.quiz_evaluator import QuizEvaluator  # Import the QuizEvaluator

class QuizLogic:
    def __init__(self, tasks: List[Dict[str, Union[str, Dict]]]):
        self.tasks = tasks
        self.evaluator = QuizEvaluator()  # Initialize the QuizEvaluator

    def process_tasks(self) -> List[Dict[str, Union[str, List[str]]]]:
        # Converts tasks to a simplified format for frontend display
        return [{"description": task['description'], "difficulty": task['difficulty'], "quiz": task['quiz']} for task in self.tasks]

    def evaluate_quiz(self, task, user_input: str) -> str:
        # Get the quiz data from the task
        quiz = task.get('quiz', {})
        quiz_type = quiz.get('type', '')
        
        # Use the QuizEvaluator to evaluate the quiz answer
        return self.evaluator.evaluate(quiz_type, user_input, quiz)
