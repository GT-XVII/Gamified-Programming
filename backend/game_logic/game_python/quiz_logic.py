from typing import Dict, List, Union

# class handles displaying quizzes and checking answers
class QuizLogic:
    def __init__(self, tasks: List[Dict[str, Union[str, Dict]]]):
        self.tasks = tasks
    
    # go through each task and display it
    def process_tasks(self) -> None:
        # For each task print the task’s description and difficulty level
        # Then, it call _present_quiz to show the quiz question and get the user’s answer
        for task in self.tasks:
            print(f"Task: {task['description']} (Difficulty: {task['difficulty']})")
            self._present_quiz(task['quiz'])

    # show the quiz question to the user and take their answer
    def _present_quiz(self, quiz: Dict[str, Union[str, List[str]]]) -> None:
        # check the type of quiz
        # Fill-out Quiz: show template (code with blanks where the user needs to fill in the answers)
        if quiz['type'] == 'fillout-quiz':
            print("Complete the code :")
            print(quiz['template'])
            #  save user answer as user_input
            user_input = input("Your answer: ")
            # calls _check_fillout_answer to check if the user’s answer is correct by comparing it with the correct answers (quiz['solutions'])
            self._check_fillout_answer(user_input, quiz['solutions'])
        # Coding Quiz: Prompt the user to enter the full code answer
        # Check via using _check_coding_answer
        elif quiz['type'] == 'coding-quiz':
            user_input = input("Enter the complete code solution: ")
            self._check_coding_answer(user_input, quiz['solution'])

    # !!! needs to be modified to save wrong answers 
    def _check_fillout_answer(self, user_input: str, solutions: List[str]) -> None:
        # compare user_input with the list of correct solutions
        if user_input in solutions:
            print("Correct!")
        else:
            print("Incorrect. Try again.")

    # !!! needs to be modified to save wrong answers 
    def _check_coding_answer(self, user_input: str, solution: str) -> None:
        # compare user_input to the correct solution
        if user_input == solution:
            print("Correct!")
        else:
            print("Incorrect. The correct answer is:", solution)
