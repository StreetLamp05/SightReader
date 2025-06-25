import mido
import time
import threading
import pretty_midi


# List all MIDI input ports
for name in mido.get_input_names():
    print(name)


def midi_to_note_name(note):
    return pretty_midi.note_number_to_name(note)

def listen_to_midi(port_name):
    print(f"Listening to midi port {port_name}")
    with mido.open_input(port_name) as inport:
        for msg in inport:
            if msg.type in ['note_on', 'note_off']:
                note_name = midi_to_note_name(msg.note)
                if msg.type == 'note_on' and msg.velocity > 0:
                    print(f"Note ON : {note_name} (velocity: {msg.velocity})")
                else:
                    print(f"Note OFF: {note_name}")
# List available MIDI input ports
input_ports = mido.get_input_names()
print("Available MIDI input ports:")
for i, name in enumerate(input_ports):
    print(f"{i}: {name}")

# Select the correct one
index = int(input("Enter the index of your FP-30X MIDI port: "))
selected_port = input_ports[index]

# Start listener thread
thread = threading.Thread(target=listen_to_midi, args=(selected_port,))
thread.start()