import { WebSocketServer } from "ws";

const wsServer = new WebSocketServer({ port: 5000 });

const socketList = [];

wsServer.on("connection", (socket) => {
  // console.log("New frontend connected");
  setTimeout(() => socket.send("Welcome to server"), 3000);
  setTimeout(() => socket.close(1000, "Server need restart"), 5000);

  socketList.forEach((item) =>
    item.send(`Now we have ${socketList.length + 1} members`)
  );

  socket.on("close", (code, reason) => {
    console.log(code);
    console.log(reason.toString());

    const index = socketList.findIndex((item) => item === socket);
    socketList.splice(index, 1);
  });

  socketList.push(socket);
});

/* 
const server = http.createServer(app);

app.use(express.static("public"));

server.listen(process.env.PORT || 3000, function () {
  console.log("Server running in port 3000");
});

app.use(express.static(__dirname + "/public"));

const users = {};
io.sockets.on("connection", (client) => {});
const broadcast = (event, data) => {
  client.emit(event, data);
  client.broadcast.emit(event, data);
};
broadcast("user", users);

client.on("message", (message) => {
  if (users[client.id] !== message.name) {
    users[client.id] = message.name;
    broadcast("user", users);
  }
  broadcast("message", message);
});

client.on("disconnect", () => {
  delete users[client.id];
  client.broadcast.emit("user", users);
});
 */
