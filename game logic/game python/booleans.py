import json

# Function to display content blocks
def display_content(content):
    for block in content:
        if block['type'] == 'img':
            print(f"[Image: {block['src']}]")
        elif block['type'] == 'span':
            for span in block['content']:
                if span['type'] == 'inline-code':
                    print(f"`{span['content']}`", end=" ")
                else:
                    print(span['content'], end=" ")
            print("\n")
        elif block['type'] == 'break':
            print("\n" + "-" * 40 + "\n")
        elif block['type'] in ['h3', 'h4']:
            print(f"\n### {block['content']} ###\n")
        elif block['type'] == 'ul':
            for element in block['elements']:
                print(f"- {element['content']} ({element['url']})")
        elif block['type'] == 'code':
            print(f"\nCode:\n{block['content']}\n")
        elif block['type'] == 'example-block':
            print(f"Example: {block['title']}")
            for example in block['content']:
                print(f"Code:\n{example['content']}")
            print(f"Output: {block['output']}")
        elif block['type'] == 'important-block':
            print("IMPORTANT: ", end="")
            for imp in block['content']:
                for span in imp['content']:
                    print(span['content'], end=" ")
            print()

# Function to handle fillout quizzes
def handle_fillout_quiz(quiz):
    print("\nFill in the blanks:\n")
    template = quiz['template']
    print(template.replace("$$", "____").replace("§§§§", "____"))
    
    answers = []
    for i in range(len(quiz['solutions'])):
        answer = input(f"Fill in blank {i+1}: ")
        answers.append(answer.strip())
    
    # Check if answers match the solutions
    if answers == quiz['solutions']:
        print("Correct!\n")
    else:
        print("Incorrect! The correct answers are:", quiz['solutions'])
        print()

# Function to handle coding quizzes
def handle_coding_quiz(quiz):
    print("\nSolve the coding challenge:\n")
    print("Write the code that solves the following task:\n")
    print(quiz['description'])
    
    user_solution = input("\nEnter your solution:\n")
    
    # For simplicity, we compare the provided solution directly
    if user_solution.strip() == quiz['solution'].strip():
        print("Correct!")
    else:
        print("Incorrect! Here is the correct solution:\n")
        print(quiz['solution'])

# Function to run the game for a chapter
def run_game(chapter_data):
    print(f"\n--- Chapter: {chapter_data['title']} ---\n")
    display_content(chapter_data['content'])
    
    print("\nLet's start with the tasks!\n")
    
    # Iterate over tasks and present them to the user
    for task in chapter_data['tasks']:
        print(f"\nTask: {task['description']} (Difficulty: {task['difficulty']})")
        
        quiz = task['quiz']
        if quiz['type'] == 'fillout-quiz':
            handle_fillout_quiz(quiz)
        elif quiz['type'] == 'coding-quiz':
            handle_coding_quiz(quiz)

# Example JSON data for the chapter "Booleans"
booleans_chapter = {
    "type": "document",
    "title": "Booleans",
    "content": [
        {
            "type": "img",
            "src": "https://cdn.sanity.io/images/kk486dy9/production/4a82ed39a730fe847ae813ac74c0d6d886bb66f5-523x336.svg"
        },
        {
            "type": "span",
            "content": [
                {
                    "type": "span",
                    "content": "In diesem Kapitel geht es um Booleans in Python. Booleans sind ein Datentyp, der entweder wahr ("
                },
                {
                    "type": "inline-code",
                    "content": "True"
                },
                {
                    "type": "span",
                    "content": ") oder falsch ("
                },
                {
                    "type": "inline-code",
                    "content": "False"
                },
                {
                    "type": "span",
                    "content": ") sein kann und stellt somit die Elementaren Bit-Werte "
                },
                {
                    "type": "inline-code",
                    "content": "0"
                },
                {
                    "type": "span",
                    "content": " und "
                },
                {
                    "type": "inline-code",
                    "content": "1"
                },
                {
                    "type": "span",
                    "content": " dar."
                }
            ]
        }
    ],
    "tasks": [
        {
            "description": "Gegeben sind zwei Zahlen a und b. Das Programm soll True ausgeben, falls a kleiner gleich b gilt, ansonsten False.",
            "difficulty": "easy",
            "quiz": {
                "type": "fillout-quiz",
                "template": "print(a§§b)",
                "solutions": [
                    "<="
                ]
            }
        },
        {
            "description": "Gegeben sind zwei Booleans a und b. Das Programm soll True ausgeben, falls a True und b False ist, ansonsten False.",
            "difficulty": "easy",
            "quiz": {
                "type": "coding-quiz",
                "solution": "print(a and not b)"
            }
        }
    ]
}

# Running the game for the Booleans chapter
run_game(booleans_chapter)