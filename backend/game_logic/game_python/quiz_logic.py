from typing import Dict, List, Union

class QuizLogic:
    def __init__(self, tasks: List[Dict[str, Union[str, Dict]]]):
        self.tasks = tasks

    def process_tasks(self) -> List[Dict[str, Union[str, List[str]]]]:
        return [{"id": task['id'], "description": task['description'], "difficulty": task['difficulty'], "quiz": task['quiz']} for task in self.tasks]

    def check_answer(self, task: Dict, user_input: Union[str, List[str]]) -> Dict[str, Union[str, bool]]:
        quiz = task.get('quiz')
        feedback = "Unsupported quiz type."
        correct = False

        if quiz['type'] == 'fillout-quiz':
            correct = user_input in quiz['solutions']
            feedback = "Correct!" if correct else f"Incorrect. The correct answers are: {quiz['solutions']}"
        elif quiz['type'] == 'coding-quiz':
            correct = user_input == quiz['solution']
            feedback = "Correct!" if correct else f"Incorrect. The correct answer is: {quiz['solution']}"
        elif quiz['type'] == 'mcq':
            correct = user_input == quiz['correct_option']
            feedback = "Correct!" if correct else f"Incorrect. Correct answer: {quiz['correct_option']}"
        elif quiz['type'] == 'reorder':
            correct = user_input == quiz['correct_order']
            feedback = "Correct!" if correct else "Incorrect. Try again."

        return {"correct": correct, "feedback": feedback}
