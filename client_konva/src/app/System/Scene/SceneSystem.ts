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
    this.setAllVisibleFalse();
    console.log(scene === SceneType.SINGLE_PLAY_MENU);

    switch (scene) {
      case SceneType.MENU: {
        
        this.setVisibleTrue("menuHud");
        
        break;
      }
      case SceneType.SINGLE_PLAY_MENU: {
        console.log("In Single Manu");
        this.setVisibleTrue("singleMenuHud");
        break;
      }
      case SceneType.SINGLE_PLAY_SETUP: {
        this.setVisibleTrue("singleSetUpHud");
        break;
      }
      case SceneType.SINGLE_PLAY_LOAD: {
        this.setVisibleTrue("singleLoadHud");
        break;
      }
      case SceneType.SINGLE_PLAY_STORY: {
        this.setVisibleTrue("singleStoryHud");
        break;
      }
      case SceneType.SINGLE_PLAY_TUTORIAL: {
        this.setVisibleTrue("singleTutorialHud");
        break;
      }
      case SceneType.MULTI_PLAY_MENU: {
        this.setVisibleTrue("multiMenuHud");
        break;
      }
      case SceneType.MULTI_PLAY_SETUP: {
        this.setVisibleTrue("multiSetUpHud");
        break;
      }
      case SceneType.MULTI_PLAY_STAGE: {
        this.setVisibleTrue("mutliStageHud");
        break;
      }
      case SceneType.MAP_EDITOR: {
        this.setVisibleTrue("mapEditorHud");
        break;
      }
      case SceneType.MAP_EDITOR_SETUP: {
        this.setVisibleTrue("mapEditorSetUpHud");
        break;
      }
      case SceneType.SETTING: {
        this.setVisibleTrue("settingHud");
        break;
      }
      case SceneType.GAME_LOADING: {
        this.setVisibleTrue("gameLoadingHud");
        break;
      }
      case SceneType.GAME: {
        this.setVisibleTrue("gameHud");
        break;
      }
      case SceneType.GAME_END: {
        this.setVisibleTrue("gameEndHud");
        break;
      }
      default: {
        this.world.getSystem(SystemClass.SceneRenderSystem).play();
        break;
      }
    }
  }

  setVisibleTrue(hudType: keyof typeof this.queries){
    this.queries[hudType].results.forEach(hud => {
      let konvaObj = hud.getComponent(KonvaObject).value;
      konvaObj.setAttr("visible", true);
    })
  }

  setAllVisibleFalse() {
    this.queries.huds.results.forEach(hud => {
      let konvaObj = hud.getComponent(KonvaObject).value;
      konvaObj.setAttr("visible", false);
    })
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

  huds: {
    components: [Hud]
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