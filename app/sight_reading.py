import random

def get_random_note():
    notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
    octaves = [3, 4, 5]
    return f"{random.choice(notes)}{random.choice(octaves)}"

def check_user_note(target, played):
    return target == played