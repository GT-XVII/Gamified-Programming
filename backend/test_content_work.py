import unittest
from unittest.mock import patch
from game_logic.game_python.content_work import ContentWork

class TestContentWork(unittest.TestCase):

    def test_display_span_text(self):
        content = [{'type': 'span', 'content': 'Hello, world!'}]
        cw = ContentWork(content)
        with patch('builtins.print') as mock_print:
            cw.process_content()
            mock_print.assert_called_with('Hello, world!')

    def test_display_image(self):
        content = [{'type': 'img', 'src': 'image.jpg'}]
        cw = ContentWork(content)
        with patch('builtins.print') as mock_print:
            cw.process_content()
            mock_print.assert_called_with('[Image: image.jpg]')

    def test_display_list(self):
        content = [{'type': 'ul', 'elements': [{'content': 'Item 1'}, {'content': 'Item 2'}]}]
        cw = ContentWork(content)
        with patch('builtins.print') as mock_print:
            cw.process_content()
            mock_print.assert_any_call('- Item 1')
            mock_print.assert_any_call('- Item 2')

    def test_display_code(self):
        content = [{'type': 'code', 'content': 'print("hello")'}]
        cw = ContentWork(content)
        with patch('builtins.print') as mock_print:
            cw.process_content()
            mock_print.assert_any_call('Code:\nprint("hello")')

    def test_display_inline_code_and_span(self):
        content = [{
            'type': 'span',
            'content': [
                {'type': 'span', 'content': 'Hello'},
                {'type': 'inline-code', 'content': 'print("world")'}
            ]
        }]
        cw = ContentWork(content)
        with patch('builtins.print') as mock_print:
            cw.process_content()
            # `print()` is called multiple times with partial outputs
            mock_print.assert_any_call('Hello', end='')
            mock_print.assert_any_call('`print("world")`', end='')
            mock_print.assert_called()  # final print()

if __name__ == '__main__':
    unittest.main()
