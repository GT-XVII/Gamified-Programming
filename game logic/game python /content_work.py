from typing import Union, List, Dict
# class to display content 
#save content its getting in self.content
class ContentWork:
    def __init__(self, content: List[Dict[str, Union[str, List]]]):
        self.content = content

    def process_content(self) -> None:
        # goes through each item in self.content and decides how to show it based on its type.
          # check for each section the type of section 
        for section in self.content:
            # for span call _display_text to show text 
            if section['type'] == 'span':
                self._display_text(section['content'])
            # for img call _display_image to show an image link
            elif section['type'] == 'img':
                self._display_image(section['src'])
            # for ul call _display_list to show a list
            elif section['type'] == 'ul':
                self._display_list(section['elements'])
            # for code call _display_code to show a block of code
            elif section['type'] == 'code':
                self._display_code(section['content'])

    def _display_text(self, content: Union[str, List[Dict[str, Union[str, List]]]]) -> None:
        # If the content is just text, print it
        if isinstance(content, str):
            print(content)
        # If content is a list (meaning more complex), goe through each item in the list
          # If the item is span, just print it 
          # If the item is code, adds backticks (``) to look like code.
        elif isinstance(content, list):
            for item in content:
                if item['type'] == 'span':
                    print(item['content'], end='')
                elif item['type'] == 'inline-code':
                    print(f"`{item['content']}`", end='')
            print()

    # Show the link to image !!! when connecting the ui should show image 
    def _display_image(self, src: str) -> None:
        print(f"[Image: {src}]")

    def _display_list(self, elements: List[Dict[str, str]]) -> None:
        # go through each item in elements and print it with a - in front
        for element in elements:
            print(f"- {element['content']}")

    def _display_code(self, code: str) -> None:
        # print "Code:" and then the actual code
        # !!! when connecting to ui should be formated like a fancy code block 
        print(f"Code:\n{code}")
