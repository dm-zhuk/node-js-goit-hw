import { WebSocketServer } from "ws";
import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();
const http = createServer(app);
const io = new Server(http);
const wss = new WebSocketServer({ port: 8080 });

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("user connected");
  socket.emit("message", "user connected");
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});

let clients = [];
wss.on("connection", (ws) => {
  let id = clients.length;
  clients[id] = ws;
  console.log(`a new client connected #${id}`);
  ws.send(`you are assigned a new #${id}`);
  clients.forEach((item, index) => {
    if (index !== id) {
      item.send(`connected #${id}`);
    }
  });
});

console.log("WebSocket server is running on port 8080");

// wss.on("message", (message) => {
//   console.log(`received msg: ${message}`);

//   ws.send(`You said: ${message}`);
// });

// ws.on("close", () => {
//   console.log("A client disconnected");
// });
