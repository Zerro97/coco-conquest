const EventType = require("../constant/event");

module.exports = (io, socket) => {
  let rooms = {};

  const createRoom = (data) => {
    let roomExist = false;
    console.log(data);

    // Check if given room exist
    for(const room in rooms) {
      if(room.roomId === data.roomId) {
        roomExist = true;
      }
    }

    // If room does not exist create one
    if(!roomExist) {
      //socket.leave(socket.room);
      socket.join(data.roomId);
      socket.emit(EventType.ROOM_CREATED, data);
    } else {
      // TODO: throw error
    }
  }

  const joinRoom = (data) => {
    let roomExist = false;

    // Check if given room exist
    for(const room in rooms) {
      if(room.roomId === data.roomId) {
        roomExist = true;
      }
    }

    // If room exist, join
    if(roomExist) {
      socket.join(data.roomId);
      socket.emit(EventType.ROOM_JOINED, data);
    } else {
      // TODO: throw error
    }
  }

  socket.on(EventType.CREATING_ROOM, createRoom);
  socket.on(EventType.JOINING_ROOM, joinRoom);
}