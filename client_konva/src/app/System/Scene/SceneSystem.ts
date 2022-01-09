import { SceneStatus } from "@/Component/Scene";
import * as SystemClass from "@/System";
import { SceneType } from "@/Const";
import { System, SystemConstructor } from "@/Ecsy";

export class SceneSystem extends System {
  execute(delta: Number, time: Number) {
    this.checkScene();
  }

  checkScene() {
    this.toggleSystems();
    //this.onSceneChange();
  }

  onSceneChange() {
    const sceneStatus = this.queries.sceneStatus.results[0].getComponent(SceneStatus);

    switch(sceneStatus.currentScene) {
      case SceneType.MENU: {

        break;
      }
      case SceneType.SINGLE_PLAY_MENU: {
        break;
      }
      case SceneType.SINGLE_PLAY_SETUP: {
        break;
      }
      case SceneType.SINGLE_PLAY_LOAD: {
        break;
      }
      case SceneType.SINGLE_PLAY_STORY: {
        break;
      }
      case SceneType.SINGLE_PLAY_TUTORIAL: {
        break;
      }
      case SceneType.MULTI_PLAY_MENU: {
        break;
      }
      case SceneType.MULTI_PLAY_SETUP: {
        break;
      }
      case SceneType.MULTI_PLAY_STAGE: {
        break;
      }
      case SceneType.MAP_EDITOR: {
        break;
      }
      case SceneType.MAP_EDITOR_SETUP: {
        break;
      }
      case SceneType.SETTING: {
        break;
      }
      case SceneType.GAME_LOADING: {
        break;
      }
      case SceneType.GAME: {
        break;
      }
      case SceneType.GAME_END: {
        break;
      }
    }
  }

  /**
   * Toggle systems on/off according to the current scene.
   */
  toggleSystems() {
    // Stop all systems
    let keys: keyof typeof SystemClass;

    // for (const [k, v] of Object.entries(SystemClass)) {
    //   console.log(SystemClass[k]);
    //   this.world.getSystem(v as SystemConstructor<typeof SystemClass[typeof k]>).stop();
    // }

    // for(keys in SystemClass) {
    //   console.log(typeof SystemClass[keys]);
    //   this.world.getSystem(SystemClass[system] as SystemConstructor<typeof SystemClass[keys]>).stop();
    // }
    // (Object.keys(SystemClass)).forEach((system => {
    //   console.log(typeof SceneSystem, typeof SystemClass[system]);
    //   this.world.getSystem(SystemClass[system]).stop();
    // }));

    // Object.keys(SystemClass).forEach((system) => {
    //   this.world.getSystem(SystemClass[system]).stop();
    // });

    // // Core Systems
    // this.world.getSystem(SystemClass.KeyboardHandlerSystem).play();
    // this.world.getSystem(SystemClass.KeyboardListenerSystem).play();
    // this.world.getSystem(SystemClass.MouseHandlerSystem).play();
    // this.world.getSystem(SystemClass.MouseListenerSystem).play();
    // this.world.getSystem(SystemClass.SocketEmitSystem).play();
    // this.world.getSystem(SystemClass.SocketListenerSystem).play();
    // this.world.getSystem(SystemClass.MenuSystem).play();
  }
}

SceneSystem.queries = {
  sceneStatus: {
    components: [SceneStatus]
  }
};