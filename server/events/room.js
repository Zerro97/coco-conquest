const EventType = require("../constant/event");

module.exports = (io, socket) => {
    const createRoom = (payload) => {
      console.log(payload);
    }
  
    const joinRoom = (payload) => {
      console.log(payload);
    }
  
    socket.on(EventType.CREATING_ROOM, createRoom);
    socket.on(EventType.JOINING_ROOM, joinRoom);
}