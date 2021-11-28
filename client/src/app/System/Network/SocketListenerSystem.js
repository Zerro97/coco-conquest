import { System } from "../../Library/Ecsy";
import { Turn, GlobalStatus, SocketEvents, Room, MenuHud, LobbyScene, Size, Scene, HudHoverable, HudSelectable, CanvasPosition, Shape } from "../../Component";
import { SocketEvent, MenuHudType, SceneType, ObjectShape } from "../../Type";
import {  } from "../../Util";

export class SocketListenerSystem extends System {
  execute(delta, time) {
    const socketStatus = this.queries.socketEvents.results[0].getMutableComponent(SocketEvents);
    
    // Register Socket Listeners
    this.onCreateRoom();
    this.onJoinRoom();
    this.onConnect();

    // Inform server that client just connected
    // Client needed to wait until all socket listeners were registered
    // before telling server that client connected...
    this.connect();

    // Stop the system once sockets are registered
    this.stop();
  }

  connect() {
    this.socket.emit(SocketEvent.CONNECTING);
  }

  onConnect() {
    this.socket.on(SocketEvent.CONNECTED, data => {
      // Create rooms that are currently stored on server
      let roomCount = 0;
      for(const key in data) {
        this.world
          .createEntity()
          .addComponent(MenuHud, {type: MenuHudType.LOBBY_ROOM_ROW})
          .addComponent(HudHoverable)
          .addComponent(HudSelectable)
          .addComponent(CanvasPosition, {x: this.canvasWidth/2 - 400, y: 120 + roomCount * 35})
          .addComponent(Shape, {type: ObjectShape.RECTANGLE})
          .addComponent(Size, {width: 800, height: 30})
          .addComponent(LobbyScene)
          .addComponent(Scene, {value: SceneType.LOBBY})
          .addComponent(Room, data[key]);
        
        roomCount += 1;
      }
    });
  }

  onCreateRoom() {
    this.socket.on(SocketEvent.ROOM_CREATED, data => {
      let roomCount = 0;
      this.queries.lobbyHud.results.forEach(room => {
        if(room.hasComponent(Room)) {
          roomCount += 1;
        }
      });

      this.world
        .createEntity()
        .addComponent(MenuHud, {type: MenuHudType.LOBBY_ROOM_ROW})
        .addComponent(HudHoverable)
        .addComponent(HudSelectable)
        .addComponent(CanvasPosition, {x: this.canvasWidth/2 - 400, y: 120 + roomCount * 35})
        .addComponent(Shape, {type: ObjectShape.RECTANGLE})
        .addComponent(Size, {width: 800, height: 30})
        .addComponent(LobbyScene)
        .addComponent(Scene, {value: SceneType.LOBBY})
        .addComponent(Room, data);
    });
  }

  onJoinRoom() {
    this.socket.on(SocketEvent.ROOM_JOINED, data => {

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
  },
  lobbyHud: {
    components: [MenuHud, LobbyScene]
  },
};
