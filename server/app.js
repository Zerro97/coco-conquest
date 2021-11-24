const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
  }
});

// Register Events
const registerRoomHandler = require("./events/room");
const registerTileHandler = require("./events/tile");
const registerUnitHandler = require("./events/unit");
const registerBuildingHandler = require("./events/building");

const onConnection = (socket) => {
  console.log('Made socket connection', socket.id);

  registerRoomHandler(io, socket);
  registerTileHandler(io, socket);
  registerUnitHandler(io, socket);
  registerBuildingHandler(io, socket);

  console.log(io);
}

// When client connect to server
io.on("connection", onConnection);

server.listen(3000, function() {
  console.log('Socket IO server listening on port 3000');
});