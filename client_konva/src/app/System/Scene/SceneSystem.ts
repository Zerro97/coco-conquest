import { GameEndScene, GameLoadingScene, GameScene, MapEditorScene, MapEditorSetUpScene, MenuScene, MultiMenuScene, MultiSetUpScene, MultiStageScene, SceneStatus, SettingScene, SingleLoadScene, SingleMenuScene, SingleSetUpScene, SingleStoryScene, SingleTutorialScene } from "@/Component/Scene";
import { Hud } from "@/Component/Hud";
import * as SystemClass from "@/System";
import { SceneType } from "@/Const";
import { System } from "@/Ecsy";
import { KonvaObject, Layer } from "@/Component";

export class SceneSystem extends System {
  execute(delta: Number, time: Number) {
    const sceneStatus = this.queries.sceneStatus.changed[0]?.getComponent(SceneStatus);

    if (sceneStatus) {
      this.toggleSystems(sceneStatus.currentScene);
      this.toggleHuds(sceneStatus.currentScene);
    }
  }

  /**
   * Toggle systems on/off according to the current scene.
   */
  toggleSystems(scene: SceneType) {
    // Stop all systems
    for (const [k, v] of Object.entries(SystemClass)) {
      this.world.getSystem(v).stop();
    }

    // Change visibility of huds when switching scene
    switch (scene) {
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
      default: {
        this.world.getSystem(SystemClass.SceneRenderSystem).play();
        break;
      }
    }



    // Core Systems
    // this.world.getSystem(SystemClass.KeyboardHandlerSystem).play();
    // this.world.getSystem(SystemClass.KeyboardListenerSystem).play();
    // this.world.getSystem(SystemClass.MouseHandlerSystem).play();
    // this.world.getSystem(SystemClass.MouseListenerSystem).play();
    // this.world.getSystem(SystemClass.SocketEmitSystem).play();
    // this.world.getSystem(SystemClass.SocketListenerSystem).play();
    // this.world.getSystem(SystemClass.MenuSystem).play();
  }

  toggleHuds(scene: SceneType) {
    switch (scene) {
      case SceneType.MENU: {
        const layer = this.queries.menuHud.results[0].getComponent(KonvaObject).value;

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
      default: {
        this.world.getSystem(SystemClass.SceneRenderSystem).play();
        break;
      }
    }
  }
}

SceneSystem.queries = {
  sceneStatus: {
    components: [SceneStatus],
    listen: {
      changed: true
    }
  },
  layer: {
    components: [Layer, KonvaObject]
  },

  menuHud: {
    components: [Hud, MenuScene]
  },
  settingHud: {
    components: [Hud, SettingScene]
  },

  singleMenuHud: {
    components: [Hud, SingleMenuScene]
  },
  singleSetUpHud: {
    components: [Hud, SingleSetUpScene]
  },
  singleLoad: {
    components: [Hud, SingleLoadScene]
  },
  singleStory: {
    components: [Hud, SingleStoryScene]
  },
  singleTutorial: {
    components: [Hud, SingleTutorialScene]
  },

  multiMenuHud: {
    components: [Hud, MultiMenuScene]
  },
  multiSetUpHud: {
    components: [Hud, MultiSetUpScene]
  },
  multiStageHud: {
    components: [Hud, MultiStageScene]
  },

  gameLoadingHud: {
    components: [Hud, GameLoadingScene]
  },
  gameHud: {
    components: [Hud, GameScene]
  },
  gameEndHud: {
    components: [Hud, GameEndScene]
  },

  mapEditorHud: {
    components: [Hud, MapEditorScene]
  },
  mapEditorSetUpHud: {
    components: [Hud, MapEditorSetUpScene]
  }
};