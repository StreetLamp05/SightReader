"use client";
import {useState, useEffect, useRef} from "react";
import DropDownSelector from "@/app/components/dropdownSelector";
import DebugConsole from "@/app/components/DebugConsole";

export default function Home() {
    const [status, setStatus] = useState("Connecting...");
    const [ports, setPorts] = useState<string[]>([]);
    const[selectedPort, setSelectedPort] = useState<string | undefined>(undefined);
    const [listening, setListening] = useState(false);
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8000/ws");
        socketRef.current = socket;

        socket.onopen = () => {
            setStatus("Connected");
            socket.send(JSON.stringify({type: "get_ports"}));
        } // on open

        socket.onmessage = (event: { data: string; }) => {
            const message = JSON.parse(event.data);

            if (message.type === "ports_list") {
                setPorts(message.ports);
            } // if

            if (message.type === "listening") {
                setListening(true);
                setStatus(message.value ? "Listening" : "Not Listening");
            } // if

            if (message.type === "error") {
                console.error("Backend error: ", message.message);
            } // if
        }; // on message

        socket.onerror = () => {
            setStatus("Error connecting to backend")
        }; // on error

        socket.onclose = () => {
            setStatus("Connection closed")
        }; // on close

        return () => {
            socket.close();
        }; // return
    }, []); // useEffect



    const handlePortSelect = (port: string) => {
        setSelectedPort(port);
        if (port) {
            // @ts-ignore
            socketRef.current.send(JSON.stringify({
                type: "select_port",
                payload: {port: port}
            }))
        };
    } // handlePortSelect

    const toggle = () => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({type: "toggle_listening"}));
        } // if
    } // toggle

    return (
        <main style={{ textAlign: "center", marginTop: "5rem" }}>
            <h1>MIDI Listener</h1>
            <DropDownSelector
                options={ports}
                value={selectedPort}
                onSelect={handlePortSelect}
                placeholder="Select a port..."
                label="Available MIDI Ports"
            />
            <p>{status}</p>
            <button onClick={toggle}>
                {listening ? "Stop Listening" : "Start Listening"}
            </button>
            <DebugConsole socket={socketRef.current} maxHistory={50} />
        </main>
    ); // return

} // Home