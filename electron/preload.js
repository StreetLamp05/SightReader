// Expose limited APIs from Node to renderer
window.api = {
  toggle: async () => {
    const res = await fetch("http://127.0.0.1:8000/toggle", { method: "POST" });
    return res.json();
  },
  status: async () => {
    const res = await fetch("http://127.0.0.1:8000/status");
    return res.json();
  },
};
