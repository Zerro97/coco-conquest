import { GameEndScene, GameLoadingScene, GameScene, MapEditorScene, UnitEditorScene, BuildingEditorScene, EditorSetUpScene, MenuScene, MultiMenuScene, MultiSetUpScene, MultiStageScene, SceneStatus, SettingScene, SingleLoadScene, SingleMenuScene, SingleSetUpScene, SingleStoryScene, SingleTutorialScene } from "@/Component/Scene";
import { Hud } from "@/Component/Hud";
import * as SystemClass from "@/System";
import { SceneType } from "@/Const";
import { System } from "@/Ecsy";
import { KonvaObject, Layer } from "@/Component";
import Konva from "konva";
import { TransitionHud } from "@/Component/Hud/TransitionHud";
import { MapEditorLoaderSystem } from "../Loader";

export class SceneSystem extends System {
  execute(delta: Number, time: Number) {
    const sceneStatus = this.queries.sceneStatus.changed[0]?.getComponent(SceneStatus);

    if (sceneStatus) {
      this.toggleSystems(sceneStatus.currentScene);
      this.toggleHuds(sceneStatus);
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

    // Core Systems
    this.world.getSystem(SceneSystem).play();

    // Change visibility of huds when switching scene
    switch (scene) {
      case SceneType.MENU:
      case SceneType.SINGLE_PLAY_MENU:
      case SceneType.SINGLE_PLAY_SETUP:
      case SceneType.MULTI_PLAY_MENU:
      case SceneType.MULTI_PLAY_SETUP:
      case SceneType.MULTI_PLAY_STAGE:
      case SceneType.EDITOR_SETUP:
      case SceneType.SETTING: {
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
      case SceneType.MAP_EDITOR: {
        this.world.getSystem(MapEditorLoaderSystem).play();
        break;
      }
      case SceneType.UNIT_EDITOR: {
        break;
      }
      case SceneType.BUILDING_EDITOR: {
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

  toggleHuds(scene: any) {
    let previousHuds = this.sceneToHud(scene.previousScene);

    switch (scene.currentScene) {
      case SceneType.MENU: {
        this.toggleVisibility("menuHud", previousHuds);
        break;
      }
      case SceneType.SINGLE_PLAY_MENU: {
        this.toggleVisibility("singleMenuHud", previousHuds);
        break;
      }
      case SceneType.SINGLE_PLAY_SETUP: {
        this.toggleVisibility("singleSetUpHud", previousHuds);
        break;
      }
      case SceneType.SINGLE_PLAY_LOAD: {
        this.toggleVisibility("singleLoadHud", previousHuds);
        break;
      }
      case SceneType.SINGLE_PLAY_STORY: {
        this.toggleVisibility("singleStoryHud", previousHuds);
        break;
      }
      case SceneType.SINGLE_PLAY_TUTORIAL: {
        this.toggleVisibility("singleTutorialHud", previousHuds);
        break;
      }
      case SceneType.MULTI_PLAY_MENU: {
        this.toggleVisibility("multiMenuHud", previousHuds);
        break;
      }
      case SceneType.MULTI_PLAY_SETUP: {
        this.toggleVisibility("multiSetUpHud", previousHuds);
        break;
      }
      case SceneType.MULTI_PLAY_STAGE: {
        this.toggleVisibility("mutliStageHud", previousHuds);
        break;
      }
      case SceneType.MAP_EDITOR: {
        this.toggleVisibility("mapEditorHud", previousHuds);
        break;
      }
      case SceneType.UNIT_EDITOR: {
        this.toggleVisibility("unitEditorHud", previousHuds);
        break;
      }
      case SceneType.BUILDING_EDITOR: {
        this.toggleVisibility("buildingEditorHud", previousHuds);
        break;
      }
      case SceneType.EDITOR_SETUP: {
        this.toggleVisibility("editorSetUpHud", previousHuds);
        break;
      }
      case SceneType.SETTING: {
        this.toggleVisibility("settingHud", previousHuds);
        break;
      }
      case SceneType.GAME_LOADING: {
        this.toggleVisibility("gameLoadingHud", previousHuds);
        break;
      }
      case SceneType.GAME: {
        this.toggleVisibility("gameHud", previousHuds);
        break;
      }
      case SceneType.GAME_END: {
        this.toggleVisibility("gameEndHud", previousHuds);
        break;
      }
    }
  }

  /**
   * Returns a hud name associated with the given scene name
   */
  sceneToHud(sceneName: SceneType): string {
    return sceneName === SceneType.MENU ? "menuHud" :
      sceneName === SceneType.SETTING ? "settingHud" :
        sceneName === SceneType.SINGLE_PLAY_MENU ? "singleMenuHud" :
          sceneName === SceneType.SINGLE_PLAY_STORY ? "singleStoryHud" :
            sceneName === SceneType.SINGLE_PLAY_SETUP ? "singleSetUpHud" :
              sceneName === SceneType.SINGLE_PLAY_TUTORIAL ? "singleTutorialHud" :
                sceneName === SceneType.SINGLE_PLAY_LOAD ? "singleLoadHud" :
                  sceneName === SceneType.MULTI_PLAY_MENU ? "multiMenuHud" :
                    sceneName === SceneType.MULTI_PLAY_SETUP ? "multiSetUpHud" :
                      sceneName === SceneType.MULTI_PLAY_STAGE ? "multiStageHud" :
                        sceneName === SceneType.GAME_LOADING ? "gameLoadingHud" :
                          sceneName === SceneType.GAME ? "gameHud" :
                            sceneName === SceneType.GAME_END ? "gameEndHud" :
                              sceneName === SceneType.MAP_EDITOR ? "mapEditorHud" :
                                sceneName === SceneType.UNIT_EDITOR ? "unitEditorHud" :
                                  sceneName === SceneType.BUILDING_EDITOR ? "buildingEditorHud" :
                                    sceneName === SceneType.EDITOR_SETUP ? "editorSetUpHud" : undefined
  }

  toggleVisibility(hudType: keyof typeof this.queries, prevHudType: keyof typeof this.queries) {
    const promises: any[] = [];
    const prevHuds = this.queries[prevHudType].results;
    const nextHuds = this.queries[hudType].results;

    // Fade out previous scene huds
    prevHuds.forEach(hud => {
      promises.push(fadeOut(hud));

      function fadeOut(hud: any) {
        return new Promise((resolve) => {
          let konvaObj = hud.getComponent(KonvaObject).value;
          let hasTransition = hud.hasComponent(TransitionHud);

          if (hasTransition) {
            new Konva.Tween({
              node: konvaObj,
              opacity: 0,
              onFinish: function () {
                konvaObj.hide();
                resolve("Done Fade Out");
              },
            }).play()
          } else {
            let carriedOn = false;

            // Check if the corresponding hud still exist in the next scene
            nextHuds.forEach((nextHud: any) => {
              let nextKonvaHud = nextHud.getComponent(KonvaObject).value;

              if (konvaObj.id() == nextKonvaHud.id()) {
                carriedOn = true;
              }
            });

            // If the hud is not in the next scene, hide the hud
            if (!carriedOn) {
              konvaObj.hide();
            }
            resolve("Done Fade Out");
          }
        })
      }
    })

    // Fade in current scene huds
    Promise.all(promises).then(() => {
      nextHuds.forEach(hud => {
        let konvaObj = hud.getComponent(KonvaObject).value;
        let hasTransition = hud.hasComponent(TransitionHud);

        konvaObj.show();
        if (hasTransition) {
          new Konva.Tween({
            node: konvaObj,
            opacity: 1,
          }).play();
        }
      })
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
  unitEditorHud: {
    components: [Hud, UnitEditorScene]
  },
  buildingEditorHud: {
    components: [Hud, BuildingEditorScene]
  },
  editorSetUpHud: {
    components: [Hud, EditorSetUpScene]
  }
};