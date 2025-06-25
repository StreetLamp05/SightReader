import mido
import pretty_midi
import asyncio
from typing import List, Any

def get_midi_input(port_name: str):
    print(f"Listening to midi port {port_name}")
    with mido.open_input(port_name) as inport:
        for msg in inport:
            if msg.type in ['note_on', 'note_off']:
                note_name = midi_to_note_name(msg.note)
                if msg.type == 'note_on' and msg.velocity > 0:
                    print(f"Note ON : {note_name} (velocity: {msg.velocity})")
                else:
                    print(f"Note OFF: {note_name}")

def start_listener():
    pass

def list_midi_ports() -> list[Any] | None:
    ports = []
    for port in mido.get_input_names():
        ports.append(port)
    return ports

def midi_to_note_name(note):
    return pretty_midi.note_number_to_name(note)


