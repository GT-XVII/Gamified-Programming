from typing import Dict, List, Union

class QuizLogic:
    def __init__(self, tasks: List[Dict[str, Union[str, Dict]]]):
        self.tasks = tasks

    def process_tasks(self) -> List[Dict[str, Union[str, List[str]]]]:
        # Converts tasks to a simplified format for frontend display
        return [
            {
                "description": task['description'],
                "difficulty": task['difficulty'],
                "quiz": task['quiz']
            } for task in self.tasks
        ]

    def check_answer(self, task: Dict, user_input: str) -> str:
        quiz = task.get('quiz')
        if quiz['type'] == 'fillout-quiz':
            return self._check_fillout_answer(user_input, quiz['solutions'])
        elif quiz['type'] == 'coding-quiz':
            return self._check_coding_answer(user_input, quiz['solution'])
        else:
            return "Unknown quiz type."

    def _check_fillout_answer(self, user_input: str, solutions: List[str]) -> str:
        return "Correct!" if user_input in solutions else "Incorrect. Try again."

    def _check_coding_answer(self, user_input: str, solution: str) -> str:
        return "Correct!" if user_input == solution else f"Incorrect. The correct answer is: {solution}"
