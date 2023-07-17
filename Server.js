const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
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

server.listen(3001, () => {
  console.log('listening on *:3000');
});