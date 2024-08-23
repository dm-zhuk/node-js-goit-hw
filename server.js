import { WebSocketServer } from "ws";

const wss = new WebSocketServer.Server({ port: 8080 });
let clients = [];
wss.on("connection", (ws) => {
  let id = clients.length;
  clients[id] = ws;
  console.log(`a new client connected #${id}`);
});
clients[id].send(`you are assigned a new #${id}`);
clients.forEach((item, index) => {
  if (index !== id) {
    item.send(`connected #${id}`);
  }
});

// wss.on("message", (message) => {
//   console.log(`received msg: ${message}`);

//   ws.send(`You said: ${message}`);
// });

// ws.on("close", () => {
//   console.log("A client disconnected");
// });

console.log("WebSocket server is running on port 8080");
