const EventType = require("../constant/event");

module.exports = (io, socket) => {
    const createMap = (payload) => {
      console.log(payload);
    }
  
    socket.on(EventType.CREATING_MAP, createMap);
}