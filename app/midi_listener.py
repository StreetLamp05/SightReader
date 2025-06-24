import mido
import pretty_midi
from typing import List, Any



def get_midi_input(port_name=None):
    if not port_name:
        raise ValueError("No MIDI port specified")

    with mido.open_input(port_name) as inport:
        for msg in inport:
            if msg.type in ['note_on', 'note_off']:
                note_name = pretty_midi.note_number_to_name(msg.note)
                yield note_name, msg.velocity, msg.type == 'note_on'

def list_midi_ports() -> list[Any] | None:
    ports = []
    for port in mido.get_input_names():
        ports.append(port)
        return ports
    return None

def midi_to_note_name(note):
    return pretty_midi.note_name_to_number(note)


