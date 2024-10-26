import json

def load_json(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)

def display_content(content):
    for item in content:
        if item['type'] == 'img':
            print(f"Image: {item['src']}")
        elif item['type'] == 'span':
            if isinstance(item['content'], list):
                for sub_item in item['content']:
                    if sub_item['type'] == 'inline-code':
                        print(f"`{sub_item['content']}`", end='')
                    else:
                        print(sub_item['content'], end='')
            else:
                print(item['content'])
            print()
        elif item['type'] == 'break':
            print("\n" + "-" * 40 + "\n")
        elif item['type'] == 'h3':
            print(f"\n### {item['content']} ###\n")
        elif item['type'] == 'ul':
            print("List of topics:")
            for element in item['elements']:
                print(f"- {element['content']} (link: {element['url']})")
            print()
        elif item['type'] == 'code':
            print(f"\nCode Example:\n{item['content']}\n")
        elif item['type'] == 'anchor':
            print(f"\nAnchor: {item['id']} - {item['content']['content']}\n")
        else:
            print(f"Unknown content type: {item['type']}")

def run_quiz(tasks):
    for index, task in enumerate(tasks):
        print(f"\nTask {index + 1}: {task['description']} (Difficulty: {task['difficulty']})")
        quiz_type = task['quiz']['type']
        
        if quiz_type == 'coding-quiz':
            player_solution = input("Enter your solution: ")
            correct_solution = task['quiz']['solution'].strip()
            
            if player_solution.strip() == correct_solution:
                print("Correct! Well done!")
            else:
                print(f"Incorrect. The correct solution was:\n{correct_solution}")
        
        elif quiz_type == 'fillout-quiz':
            template = task['quiz']['template']
            print(f"Fill in the blanks: {template}")
            player_solution = input("Your answer: ")
            
            if player_solution.strip() in task['quiz']['solutions']:
                print("Correct! Good job!")
            else:
                print("That's not the correct answer.")
        
        else:
            print(f"Unknown quiz type: {quiz_type}")

def main():
    json_data = load_json('path_to_json_file.json')
    print(f"Title: {json_data['title']}")
    display_content(json_data['content'])
    run_quiz(json_data['tasks'])

if __name__ == "__main__":
    main()
