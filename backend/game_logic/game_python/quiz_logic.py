from typing import Dict, List, Union

class QuizLogic:
    def __init__(self, tasks: List[Dict[str, Union[str, Dict]]]):
        self.tasks = tasks

    def process_tasks(self) -> List[Dict[str, Union[str, List[str]]]]:
        # Converts tasks to a simplified format for frontend display
        return [{"description": task['description'], "difficulty": task['difficulty'], "quiz": task['quiz']} for task in self.tasks]

    def _check_fillout_answer(self, user_inputs: List[str], solutions: List[str]) -> str:
     if user_inputs == solutions:
        return "Correct!"
     else:
        return f"Incorrect. The correct answers are: {solutions}"


        quiz = task.get('quiz')
        if quiz['type'] == 'fillout-quiz':
            return self._check_fillout_answer(user_input, quiz['solutions'])
        elif quiz['type'] == 'coding-quiz':
            return self._check_coding_answer(user_input, quiz['solution'])
        else:
            return "Unknown quiz type."

    def _check_fillout_answer(self, user_input: str, solutions: List[str]) -> str:
        # Check if user input matches any solution
        return "Correct!" if user_input in solutions else "Incorrect. Try again."

    def _check_coding_answer(self, user_input: str, solution: str) -> str:
        # Compare user input to the correct solution
        return "Correct!" if user_input == solution else f"Incorrect. The correct answer is: {solution}"
