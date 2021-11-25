import { System } from "../../Library/Ecsy";
import { Turn, GlobalStatus, SocketEvents } from "../../Component";
import {SocketEvent} from "../../Type";
import {  } from "../../Util";

export class SocketListenerSystem extends System {
  execute(delta, time) {
    const socketStatus = this.queries.socketEvents.results[0].getMutableComponent(SocketEvents);
    
    this.onCreateRoom();
    this.onJoinRoom();
  }

  onCreateRoom() {
    this.socket.on(SocketEvent.ROOM_CREATED, data => {
      console.log(data);
    });
  }

  onJoinRoom() {
    this.socket.on(SocketEvent.ROOM_JOINED, data => {
      console.log(data);
    });
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
