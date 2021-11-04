from typing import List
from base58 import b58encode_int
from random import randrange


class Pythocron:
    def __init__(self, pythocron_script: str, pythocron_schedule: str):
        self.pythocron_script = pythocron_script
        self.pythocron_schedule = pythocron_schedule
        self.id = self.generate_id()

    def generate_id(list_of_used_ids: List[str]):
        return str(b58encode_int(randrange(58 ** 3, 58 ** 4)))
