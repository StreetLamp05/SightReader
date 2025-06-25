const statusDisplay = document.getElementById("status");
const toggleBtn = document.getElementById("toggleBtn");

const updateStatus = async () => {
  const data = await window.api.status();
  statusDisplay.innerText = data.listening ? "🎧 Listening..." : "🔇 Not Listening";
};

toggleBtn.addEventListener("click", async () => {
  await window.api.toggle();
  updateStatus();
});

const socket = new WebSocket("ws://localhost:8000/ws");
socket.onopen = () => {
  console.log("WebSocket connected");
};

socket.onmessage = (event) => {
  const midiMessage = event.data;
  console.log("MIDI: ", midiMessage);

  document.getElementById("status").innerText = midiMessage;
};

updateStatus();
