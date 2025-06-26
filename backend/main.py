from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.midi_listener import start_listener, list_midi_ports
import threading
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

state = {
    "port": None,
    "websocket": None,
    "listening": False,
    "listener_thread": None
}

@app.get("/ports")
def get_ports():
    return list_midi_ports()


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    state["websocket"] = websocket
    print("WebSocket connected")

    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)

            if message["type"] == "get_ports":
                ports = list_midi_ports()
                await websocket.send_text(json.dumps({
                    "type": "ports_list",
                    "ports": ports
                }))

            elif message["type"] == "select_port":
                port = message["payload"]["port"]
                state["port"] = port
                await websocket.send_text(json.dumps({"type": "port_selected", "port": state["port"]}))


            elif message["type"] == "toggle_listening":
                if not state["listening"]:
                    # Start MIDI listener thread
                    thread = threading.Thread(target=start_listener, args=(state["port"], websocket))
                    thread.daemon = True
                    thread.start()
                    state["listener_thread"] = thread
                    state["listening"] = True
                    await websocket.send_text(json.dumps({"type": "listening", "value": True}))
                else:
                    state["listening"] = False
                    await websocket.send_text(json.dumps({"type": "listening", "value": False}))

    except WebSocketDisconnect:
        print("WebSocket disconnected")
        state["websocket"] = None
