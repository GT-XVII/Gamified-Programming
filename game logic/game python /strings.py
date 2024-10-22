import json

class PythonStringGame:
    def __init__(self, json_file):
        self.json_data = self.load_json(json_file)
        self.current_chapter = None
        self.tasks = self.json_data['tasks']

    def load_json(self, json_file):
        with open(json_file, 'r') as file:
            return json.load(file)

    def display_content(self):
        content = self.json_data['content']
        for item in content:
            if item['type'] == 'img':
                self.display_image(item['src'])
            elif item['type'] == 'span':
                print(item['content']) if isinstance(item['content'], str) else self.display_complex_span(item['content'])
            elif item['type'] == 'h3':
                print(f"\n## {item['content']} ##\n")
            elif item['type'] == 'ul':
                self.display_list(item['elements'])
            elif item['type'] == 'code':
                self.display_code_block(item['content'])
            elif item['type'] == 'example-block':
                self.display_example_block(item)
            elif item['type'] == 'important-block':
                self.display_important_block(item['content'])

    def display_image(self, src):
        # Simulate rendering image
        print(f"[Image displayed from: {src}]")

    def display_complex_span(self, content):
        span_text = "".join(
            [sub_item['content'] if isinstance(sub_item['content'], str) else sub_item['inline-code'] for sub_item in content]
        )
        print(span_text)

    def display_list(self, elements):
        for elem in elements:
            if elem['type'] == 'link':
                print(f" - {elem['content']} ({elem['url']})")

    def display_code_block(self, code):
        print("\nCode example:")
        print(code)

    def display_example_block(self, block):
        print(f"\nExample - {block['title']}:")
        self.display_code_block(block['content'][0]['content'])
        print(f"Output: {block['output']}")

    def display_important_block(self, content):
        important_text = "".join(
            [sub_item['content'] if isinstance(sub_item['content'], str) else sub_item['inline-code'] for sub_item in content]
        )
        print(f"Important: {important_text}")

    def present_quiz(self):
        for idx, task in enumerate(self.tasks, 1):
            print(f"\nTask {idx}: {task['description']}")
            task_type = task['quiz']['type']
            if task_type == 'coding-quiz':
                self.handle_coding_quiz(task)
            elif task_type == 'fillout-quiz':
                self.handle_fillout_quiz(task)

    def handle_coding_quiz(self, task):
        user_input = input("Write your solution: ")
        if user_input == task['quiz']['solution']:
            print("Correct!")
        else:
            print(f"Incorrect! The correct solution is:\n{task['quiz']['solution']}")

    def handle_fillout_quiz(self, task):
        solution_template = task['quiz']['template']
        placeholders = solution_template.count('§§§')
        print(f"Complete the code: {solution_template.replace('§§§', '___')}")

        user_answers = []
        for i in range(placeholders):
            answer = input(f"Fill in placeholder {i+1}: ")
            user_answers.append(answer)

        if user_answers == task['quiz']['solutions']:
            print("Correct!")
        else:
            print(f"Incorrect! The correct answers were: {', '.join(task['quiz']['solutions'])}")

game = PythonStringGame('path_to_json_file.json')
game.display_content()  
game.present_quiz()     
