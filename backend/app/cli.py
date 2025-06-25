import threading

from midi_listener import list_midi_ports, get_midi_input

def main():
    input_ports = list_midi_ports()
    print("Available midi ports:")
    for i,port in enumerate(list_midi_ports()):
        print(f"{i}: {port}")

    index = int(input("Enter the index of your FP-30X MIDI port: "))
    selected_port = input_ports[index]

    # start listener thread
    thread = threading.Thread(target=get_midi_input, args=(selected_port,))
    thread.start()






if __name__ == "__main__":
    main()


