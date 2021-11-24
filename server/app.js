const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
  }
});

// Register Events
const registerOrderHandlers = require("./events/orderHandler");

const onConnection = (socket) => {
  console.log("Made socket connection");
  registerOrderHandlers(io, socket);
}

// When client connect to server
io.on("connection", onConnection);

server.listen(3000, function() {
  console.log('Socket IO server listening on port 3000');
});