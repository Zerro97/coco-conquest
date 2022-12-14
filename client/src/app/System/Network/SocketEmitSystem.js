import { System } from "../../Library/Ecsy";
import { Turn, GlobalStatus, SocketEvents, Room } from "../../Component";
import {SocketEvent} from "../../Type";
import {  } from "../../Util";

export class SocketEmitSystem extends System {
  execute(delta, time) {
    const socketStatus = this.queries.socketEvents.results[0].getMutableComponent(SocketEvents);
    
    if(socketStatus.creatingRoom) {
      this.createRoom();
    }
    if(socketStatus.joiningRoom) {
      this.joinRoom();
    }
    if(socketStatus.startingGame) {
      this.startGame();
    }
    if(socketStatus.endingTurn) {
      this.endTurn();
    }
    if(socketStatus.creatingUnit) {
      this.createUnit();
    }
    if(socketStatus.damagingUnit) {
      this.damageUnit();
    }
    if(socketStatus.movingUnit) {
      this.moveUnit();
    }
    if(socketStatus.creatingBuilding) {
      this.createBuilding();
    }
    if(socketStatus.damagingBuilding) {
      this.damageBuilding();
    }
    if(socketStatus.creatingMap) {
      this.createMap();
    }

    for(const key in socketStatus) {
      socketStatus[key] = false;
    }
  }

  createRoom() {
    const room = this.queries.rooms.added[0].getComponent(Room);

    if(room) {
      this.socket.emit(SocketEvent.CREATING_ROOM, {
        roomId: room.roomId,
        roomName: room.roomName,
        roomPass: room.roomPass,
        creatorName: room.creatorName,
        curPlayerCount: room.curPlayerCount,
        maxPlayerCount: room.maxPlayerCount
      });
    }
  }

  joinRoom() {
    this.socket.emit(SocketEvent.JOINING_ROOM, {roomId: 0, username: "Player 1"});
  }

  startGame() {

  }

  endTurn() {

  }

  createUnit() {

  }

  damageUnit() {

  }

  moveUnit() {

  }

  createBuilding() {

  }

  damageBuilding() {

  }

  createMap() {
      
  }
}

SocketEmitSystem.queries = {
  socketEvents: {
      components: [SocketEvents]
  },
  turn: {
    components: [Turn],
  },
  globalStatus: {
    components: [GlobalStatus]
  },
  rooms: {
    components: [Room],
    listen: {
      added: [Room]
    }
  }
};
