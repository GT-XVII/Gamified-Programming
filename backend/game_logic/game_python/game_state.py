class GameState:
    _instance = None
    _state = {}

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(GameState, cls).__new__(cls)
        return cls._instance

    def get_game_state(self):
        return self._state

    def set_game_state(self, new_state):
        self._state.update(new_state)