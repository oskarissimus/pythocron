from base58 import b58encode_int
from random import randrange


def generate_id():
    return b58encode_int(randrange(58 ** 3, 58 ** 4)).decode()
