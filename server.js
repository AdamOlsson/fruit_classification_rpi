const http = require("http");
const app = require("./app.js");
const socketIo = require("socket.io");
const server = http.createServer(app);

const port = 4001;

const io = socketIo(server);

io.on("connection", socket => {
  console.log("Client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
});

app.io = io;
server.listen(port, () => console.log(`API is listening on port ${port}`));
