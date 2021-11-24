import { System } from "../../Library/Ecsy";
import { Turn, GlobalStatus, SocketEvents } from "../../Component";
import {SocketEvent} from "../../Type";
import {  } from "../../Util";

export class SocketListenerSystem extends System {
  execute(delta, time) {
    const socketStatus = this.queries.socketEvents.results[0].getMutableComponent(SocketEvents);
    
    this.onJoinRoom();
  }

  onCreateRoom() {
    //this.socket.emit(SocketEvent.CREATE_ROOM, {roomId: 0, username: "Zerro"});
  }

  onJoinRoom() {
      //this.socket.on(SocketEvent.JOIN_ROOM)
    //this.socket.emit(SocketEvent.JOIN_ROOM, {roomId: 0, username: "Player 1"});
  }

  onStartGame() {

  }

  onEndTurn() {

  }

  onCreateUnit() {

  }

  onDamageUnit() {

  }

  onMoveUnit() {

  }

  onCreateBuilding() {

  }

  onDamageBuilding() {

  }

  onCreateMap() {
      
  }
}

SocketListenerSystem.queries = {
  socketEvents: {
      components: [SocketEvents]
  },
  turn: {
    components: [Turn],
  },
  globalStatus: {
    components: [GlobalStatus]
  }
};
