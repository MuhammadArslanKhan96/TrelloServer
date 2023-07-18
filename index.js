const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
app.use(cors())
const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

app.get("*", (req,res) => {
    res.send("Just for socket.io")
})
  // io.set("transports", ["websocket"]);
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.emit("hello", "hi");

    socket.on("newTrello", (data) => {
      io.emit("newData", data);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

server.listen(process.env.PORT ||3001, () => {
  console.log('listening on *:3000');
});
