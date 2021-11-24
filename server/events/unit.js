const EventType = require("../constant/event");

module.exports = (io, socket) => {
  const createUnit = (payload) => {
    console.log(payload);
  }

  const damageUnit = (payload) => {
    console.log(payload);
  }

  const moveUnit = (payload) => {
      console.log(payload);
    }

  socket.on(EventType.CREATING_UNIT, createUnit);
  socket.on(EventType.DAMAGING_UNIT, damageUnit);
  socket.on(EventType.MOVING_UNIT, moveUnit);
}