import streamlit as st
from app.midi_listener import get_midi_input, list_midi_ports
from app.visualizer import draw_live_keyboard
from typing import List

st.set_page_config(page_title="Sight Reader", layout="wide")
st.title("Sight Reader")

st.header("Live MIDI Note Visualizer")

midi_port = st.selectbox("Select MIDI Input Port", list_midi_ports())

# if 'listening' not in st.session_state:
#     st.session_state['listening'] = False
#
# def toggle_listening():
#     st.session_state['listening'] = not st.session_state['listening']
#
# label = "Stop Listening" if st.session_state['listening'] else "Start Listening"
#
# st.button(label, on_click=toggle_listening, type="primary")

if 'listening' not in st.session_state:
    st.session_state['listening'] = False

# Toggle function
def toggle_listening():
    st.session_state['listening'] = not st.session_state['listening']

# Set label and style
label = "Stop Listening" if st.session_state['listening'] else "Start Listening"
btn_type = "primary" if st.session_state['listening'] else "secondary"

# Use on_click to update state BEFORE rerender
st.button(label, type=btn_type, on_click=toggle_listening)


