import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();
const wss = new Server(httpServer, { cors: { origin: "*" } });

wss.on("connection", (socket) => {
  socket.on("chat-msg", (data) => {
    socket.broadcast.emit("chat-msg", data);
  });
  socket.on("disconnect", () => {
    console.log("frontend chat closed");
  });
});
httpServer.listen(8080);

/* import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer();
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

wss.on("message", (message) => {
  console.log(`received msg: ${message}`);

  ws.send(`You said: ${message}`);
});

ws.on("close", () => {
  console.log("A client disconnected");
});
 */
