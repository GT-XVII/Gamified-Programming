import unittest
from unittest.mock import mock_open, patch
from game_logic.game_python.loader import Loader
import json

class TestLoader(unittest.TestCase):
    def setUp(self):
        self.loader = Loader()

    @patch("builtins.open", new_callable=mock_open)
    @patch("json.load")
    @patch("os.path.join", return_value="mocked_path.json")
    def test_load_json(self, mock_path_join, mock_json_load, mock_open_file):
        fake_data = {
            "content": [{"type": "span", "content": "Welcome!"}],
            "tasks": [{"description": "Task 1"}]
        }
        mock_json_load.return_value = fake_data

        self.loader.load_json("test.json")

        self.assertEqual(self.loader.get_content(), fake_data["content"])
        self.assertEqual(self.loader.get_tasks(), fake_data["tasks"])
        mock_path_join.assert_called_once()
        mock_open_file.assert_called_once_with("mocked_path.json", 'r', encoding='utf-8')

    def test_get_content_and_tasks_initially_empty(self):
        self.assertEqual(self.loader.get_content(), [])
        self.assertEqual(self.loader.get_tasks(), [])

if __name__ == "__main__":
    unittest.main()
