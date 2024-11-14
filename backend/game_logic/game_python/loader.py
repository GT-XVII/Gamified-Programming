import json
# for different json elements
from typing import Dict, List, Union
# handle file paths 
import os

#class for loading data from json files 
class Loader:
    def __init__(self):
        # lists that hold data from the json files 
        self.content = []
        self.tasks = []

    def load_json(self, filename: str) -> None:
        # get the full path to the file
        filepath = os.path.join('/Users/nicoletiokhin/Desktop/Software Semester 3/Gamified-Programming-1/game_logic/json_files', filename)
        # open json file and store in data 
        with open(filepath, 'r', encoding='utf-8') as file:
            data = json.load(file)
        #  self.content = whatever is in data['content'], or an empty list if content is missing.
        self.content = data.get('content', [])
        # set to data['tasks'], or an empty list if tasks is missing
        self.tasks = data.get('tasks', [])
        # sensible or not ? 
        print(f"Successfully Loaded data from {filename}")

    def get_content(self) -> List[Dict[str, Union[str, List]]]:
    # return the loaded content data
        return self.content

    def get_tasks(self) -> List[Dict[str, Union[str, List]]]:
    # return the loaded tasks data
        return self.tasks
