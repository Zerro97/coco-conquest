const EventType = require("../constant/event");

module.exports = (io, socket) => {
    const createBuilding = (payload) => {
      console.log(payload);
    }
  
    const damageBuilding = (payload) => {
      console.log(payload);
    }
  
    socket.on(EventType.CREATING_BUILDING, createBuilding);
    socket.on(EventType.DAMAGING_BUILDING, damageBuilding);
}