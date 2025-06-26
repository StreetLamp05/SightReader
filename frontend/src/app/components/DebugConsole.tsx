"use client"
import {useEffect, useState, useRef} from "react";

interface DebugConsoleProps {
    socket: WebSocket | null;
    maxHistory?: number;
} // DebugConsoleProps

export default function DebugConsole({socket, maxHistory = 50}: DebugConsoleProps) {
    const [messages, setMessages] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [autoScroll, setAutoScroll] = useState<boolean>(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!socket) {
            return;
        } // if


        const handleMessage = (event: MessageEvent<string>): void => {
            if (isPaused || !isOpen) return;

            const msg = event.data;
            setMessages(prev => {
                const updated = [...prev, msg];
                return updated.length > maxHistory ? updated.slice(-maxHistory) : updated;
            });
        };



        socket.addEventListener("message", handleMessage as EventListener);
        return () => {
            socket.removeEventListener("message", handleMessage as EventListener);
        }
    }, [socket, isPaused, isOpen, maxHistory]) // useEffect

    useEffect(() => {
        if (autoScroll && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        } // if
    }, [messages, autoScroll]);  // useEffect

    return (
        <div className="fixed bottom-0 left-0 w-full max-h-[50vh] bg-black text-green-400 p-2 font-mono text-sm z-50 border-t border-gray-600">
            {/* Toggle Controls */}
            <div className="flex justify-between items-center mb-2">
                <div className="space-x-2">
                    <button onClick={() => setIsOpen(!isOpen)} className="bg-gray-800 px-2 py-1 rounded">
                        {isOpen ? "Close Debug" : "Open Debug"}
                    </button>
                    <button onClick={() => setIsPaused(!isPaused)} className="bg-gray-800 px-2 py-1 rounded">
                        {isPaused ? "Resume" : "Pause"}
                    </button>
                    <button onClick={() => setAutoScroll(!autoScroll)} className="bg-gray-800 px-2 py-1 rounded">
                        {autoScroll ? "Stop Scrolling" : "Scroll"}
                    </button>
                </div>
                <div>
                    <label>History Limit: </label>
                    <input
                        type="number"
                        value={maxHistory}
                        min={10}
                        max={500}
                        onChange={(e) => setMessages(prev => prev.slice(-parseInt(e.target.value)))}
                        className="w-16 bg-gray-700 text-white border border-gray-500 px-1 py-0.5"
                    />
                </div>
            </div>

            {/* Terminal Output */}
            {isOpen && (
                <div
                    ref={scrollRef}
                    className="overflow-y-auto h-[35vh] bg-black border border-gray-700 p-2 rounded"
                >
                    {messages.map((msg, i) => (
                        <div key={i} className="whitespace-pre-wrap">{msg}</div>
                    ))}
                </div>
            )}
        </div>
    ); // return
} // DebugConsole
