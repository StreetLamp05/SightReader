const { app, BrowserWindow } = require("electron");
const path = require("path");
const { spawn } = require("child_process");

let mainWindow;
let pyProc;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("index.html");

  mainWindow.on("closed", () => {
    mainWindow = null;
    if (pyProc) pyProc.kill();
  });
}

app.whenReady().then(() => {
  // Start Python backend
  pyProc = spawn("python", ["../backend/main.py"], {
    cwd: path.join(__dirname, "../backend"),
    shell: true,
  });

  pyProc.stdout.on("data", (data) => {
    console.log(`[Python] ${data}`);
  });

  pyProc.stderr.on("data", (data) => {
    console.error(`[Python error] ${data}`);
  });

  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
