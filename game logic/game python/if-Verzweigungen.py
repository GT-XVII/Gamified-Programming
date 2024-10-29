import json

class GameLogic:
    def __init__(self, json_file):
        with open(json_file, 'r') as file:
            self.data = json.load(file)
        self.current_chapter = 0
        self.current_content = 0

    def present_chapter(self):
        chapter = self.data['chapters'][self.current_chapter]
        print(chapter['title'])
        print(chapter['description'])

    def present_quiz(self):
        chapter = self.data['chapters'][self.current_chapter]
        content = chapter['content'][self.current_content]
        if content['type'] == 'fillout-quiz':
            self.present_fillout_quiz(content)
        elif content['type'] == 'coding-quiz':
            self.present_coding_quiz(content)

    def present_fillout_quiz(self, content):
        code = content['code'].replace('___', '___(fill)___')
        print("Fill in the blanks:\n" + code)
        answer = input("Your answer: ")
        self.check_answer(answer, content['solution'])

    def present_coding_quiz(self, content):
        print("Write the solution for:\n" + content['description'])
        answer = input("Your code: ")
        self.check_answer(answer, content['solution'])

    def check_answer(self, answer, solution):
        if answer.strip() == solution.strip():
            print("Correct!")
        else:
            print("Incorrect! The correct answer is:\n" + solution)

    def next_content(self):
        chapter = self.data['chapters'][self.current_chapter]
        if self.current_content < len(chapter['content']) - 1:
            self.current_content += 1
            return True
        return False

    def next_chapter(self):
        if self.current_chapter < len(self.data['chapters']) - 1:
            self.current_chapter += 1
            self.current_content = 0
            return True
        return False

    def play(self):
        while True:
            self.present_chapter()
            while self.next_content():
                self.present_quiz()
            if not self.next_chapter():
                break
        print("Game Over")

game = GameLogic('game_data.json')
game.play()
