import { System } from "../../Library/Ecsy";
import {
    MenuHud,
    SceneStatus,
    HudHoverable,
    CanvasPosition,
    Shape,
    HudClickable,
    Scene,
    MenuScene,
    SinglePlayScene,
    SingleSetUpScene,
    MultiSetUpScene,
    LobbyScene,
    MultiStageScene,
    SettingScene,
    MapEditorSetUpScene,
    MapEditorScene,
    Size,
    Team
} from "../../Component";
import * as SystemClass from "../../System";
import {  } from "../../Util";
import { MenuHudType, SceneType, ObjectShape } from "../../Type";

export class SceneSystem extends System {
  execute(delta, time) {
    const scene = this.queries.sceneStatus.changed[0]?.getComponent(SceneStatus);
    
    if(scene) {
        this.updateHudInScene(scene.currentScene);
        this.stopAll();

        switch(scene.currentScene) {
          case SceneType.MAP_EDITOR: {
            this.world.getSystem(SystemClass.MapEditorScreenSystem).play();
            this.world.getSystem(SystemClass.MapEditorRenderSystem).play();
            
            break;
          }
          case SceneType.LOADING_GAME: {
            this.world.getSystem(SystemClass.GameLoaderSystem).play();

            break;
          }
          case SceneType.GAME: {
            // Render
            this.world.getSystem(SystemClass.RegionSystem).play();
            this.world.getSystem(SystemClass.RenderSystem).play();
            this.world.getSystem(SystemClass.ScreenSystem).play();
            this.world.getSystem(SystemClass.TileRenderSystem).play();
            this.world.getSystem(SystemClass.UnitRenderSystem).play();
            this.world.getSystem(SystemClass.BuildingRenderSystem).play();
            this.world.getSystem(SystemClass.GameHudSystem).play();
            this.world.getSystem(SystemClass.HudRenderSystem).play();
        
            // Update
            this.world.getSystem(SystemClass.ActionSystem).play();
            this.world.getSystem(SystemClass.GlobalGameSystem).play();
            this.world.getSystem(SystemClass.HudSystem).play();
            this.world.getSystem(SystemClass.MovementSystem).play();
            this.world.getSystem(SystemClass.UnitSystem).play();
            //this.world.getSystem(SystemClass.ProductionSystem).play();
            this.world.getSystem(SystemClass.ResourceSystem).play();

            break;
          }
          default: {
            this.world.getSystem(SystemClass.MenuRenderSystem).play();

            break;
          }
        }

        // Set visibility of input huds
        switch(scene.currentScene) {
          case SceneType.MULTI_SETUP_GAME: {
            let input = document.getElementById(MenuHudType.MULTI_NAME_INPUT);
            input.style.display = "block";

            break;
          }
          default: {
            let input = document.getElementById(MenuHudType.MULTI_NAME_INPUT);
            input.style.display = "none";
          }
        }
    }

    this.stop();
  }


  stopAll() {
    // Stop all systems
    Object.keys(SystemClass).forEach((system) => {
      this.world.getSystem(SystemClass[system]).stop();
    });

    // Core Systems
    this.world.getSystem(SystemClass.KeyboardHandlerSystem).play();
    this.world.getSystem(SystemClass.KeyboardListenerSystem).play();
    this.world.getSystem(SystemClass.MouseHandlerSystem).play();
    this.world.getSystem(SystemClass.MouseListenerSystem).play();
    this.world.getSystem(SystemClass.SocketEmitSystem).play();
    this.world.getSystem(SystemClass.SocketListenerSystem).play();
    this.world.getSystem(SystemClass.MenuSystem).play();
  }

  /**
   * On scene change, add all the huds associated with the scene
   * HudClickable component so that they can be clicked
   * when at the scene they are associated with
   */
  updateHudInScene(scene) {
    let menuHuds = this.queries.menuHuds.results;
    console.log("Huds Count (" + scene +"): ",  this.queries.menuHuds.results.length);
    
    // Remove all 
    let index = menuHuds.length - 1;

    while (index !== -1) {
      menuHuds[index].remove(true);
      index -= 1;
    }
    // for(var index of this.reverseKeys(menuHuds)) {
    //   console.log(menuHuds[i] === undefined);
    //   menuHuds[index].remove();
    // }

    // Create corresponding menu huds
    switch(scene) {
			case SceneType.MENU: {
        let menuButtonTypes = [
          MenuHudType.SINGLE_PLAY_BUTTON,
          MenuHudType.MULTI_PLAY_BUTTON,
          MenuHudType.MAP_EDITOR_BUTTON,
          MenuHudType.SETTING_BUTTON,
          MenuHudType.EXIT_BUTTON
        ];
    
        for(let i=0; i<5; i++) {
          this.world
            .createEntity()
            .addComponent(MenuHud, {type: menuButtonTypes[i]})
            .addComponent(HudHoverable)
            .addComponent(HudClickable)
            .addComponent(CanvasPosition, {x: this.canvasWidth/2 - 110, y: 350 + i * 50})
            .addComponent(Shape, {type: ObjectShape.RECTANGLE})
            .addComponent(Size, {width: 220, height: 40})
            .addComponent(MenuScene)
            .addComponent(Scene, {value: SceneType.MENU});
        }

				break;
			}
			case SceneType.SETTING: {
        let settingButtonTypes = [
          MenuHudType.SETTING_GAME_BUTTON,
          MenuHudType.SETTING_GRAPHICS_BUTTON,
          MenuHudType.SETTING_AUDIO_BUTTON,
        ];
    
        for(let i=0; i<3; i++) {
          this.world
            .createEntity()
            .addComponent(MenuHud, {type: settingButtonTypes[i]})
            .addComponent(HudHoverable)
            .addComponent(HudClickable)
            .addComponent(CanvasPosition, {x: this.canvasWidth/2 - 485, y: 70 + i * 60})
            .addComponent(Shape, {type: ObjectShape.RECTANGLE})
            .addComponent(Size, {width: 200, height: 50})
            .addComponent(SettingScene)
            .addComponent(Scene, {value: SceneType.SETTING});
        }

				break;
			}
		
			// Single Player
			case SceneType.SINGLE_PLAY: {
        let singlePlayButtonTypes = [
          MenuHudType.SINGLE_SETUP_GAME_BUTTON,
          MenuHudType.LOAD_GAME_BUTTON,
          MenuHudType.SINGLE_GO_BACK_BUTTON,
        ];
    
        for(let i=0; i<3; i++) {
          this.world
            .createEntity()
            .addComponent(MenuHud, {type: singlePlayButtonTypes[i]})
            .addComponent(HudHoverable)
            .addComponent(HudClickable)
            .addComponent(CanvasPosition, {x: this.canvasWidth/2 - 110, y: 350 + i * 50})
            .addComponent(Shape, {type: ObjectShape.RECTANGLE})
            .addComponent(Size, {width: 220, height: 40})
            .addComponent(SinglePlayScene)
            .addComponent(Scene, {value: SceneType.SINGLE_PLAY});
        }

				break;
			}
			case SceneType.SINGLE_SETUP_GAME: {
        for(let i=0; i<8; i++) {
          this.world
            .createEntity()
            .addComponent(MenuHud, {type: MenuHudType.PLAYER_BOX})
            .addComponent(HudHoverable)
            .addComponent(HudClickable)
            .addComponent(CanvasPosition, {x: this.canvasWidth/2 - 500, y: 100 + i * 55})
            .addComponent(Shape, {type: ObjectShape.RECTANGLE})
            .addComponent(Size, {width: 260, height: 50})
            .addComponent(SingleSetUpScene)
            .addComponent(Scene, {value: SceneType.SINGLE_SETUP_GAME});
          
          this.world
            .createEntity()
            .addComponent(MenuHud, {type: MenuHudType.PLAYER_TEAM_BUTTON})
            .addComponent(HudHoverable)
            .addComponent(HudClickable)
            .addComponent(CanvasPosition, {x: this.canvasWidth/2 - 220, y: 100 + i * 55})
            .addComponent(Shape, {type: ObjectShape.RECTANGLE})
            .addComponent(Size, {width: 50, height: 50})
            .addComponent(SingleSetUpScene)
            .addComponent(Scene, {value: SceneType.SINGLE_SETUP_GAME})
            .addComponent(Team, {value: i % 4});
        }
    
        this.world
          .createEntity()
          .addComponent(MenuHud, {type: MenuHudType.START_BUTTON})
          .addComponent(HudHoverable)
          .addComponent(HudClickable)
          .addComponent(CanvasPosition, {x: this.canvasWidth/2 + 330, y: 730})
          .addComponent(Shape, {type: ObjectShape.RECTANGLE})
          .addComponent(Size, {width: 220, height: 50})
          .addComponent(SingleSetUpScene)
          .addComponent(Scene, {value: SceneType.SINGLE_SETUP_GAME});
    
        this.world
          .createEntity()
          .addComponent(MenuHud, {type: MenuHudType.SINGLE_SETUP_GO_BACK_BUTTON})
          .addComponent(HudHoverable)
          .addComponent(HudClickable)
          .addComponent(CanvasPosition, {x: this.canvasWidth/2 - 550, y: 730})
          .addComponent(Shape, {type: ObjectShape.RECTANGLE})
          .addComponent(Size, {width: 220, height: 50})
          .addComponent(SingleSetUpScene)
          .addComponent(Scene, {value: SceneType.SINGLE_SETUP_GAME});

				break;
			}
			case SceneType.LOAD_GAME: {
				break;
			}
		
			// Multi Player
			case SceneType.LOBBY: {
        this.world
          .createEntity()
          .addComponent(MenuHud, {type: MenuHudType.LOBBY_ROOM_HEAD})
          .addComponent(HudHoverable)
          .addComponent(HudClickable)
          .addComponent(CanvasPosition, {x: this.canvasWidth/2 - 400, y: 80})
          .addComponent(Shape, {type: ObjectShape.RECTANGLE})
          .addComponent(Size, {width: 800, height: 30})
          .addComponent(LobbyScene)
          .addComponent(Scene, {value: SceneType.LOBBY});
        
        this.world
          .createEntity()
          .addComponent(MenuHud, {type: MenuHudType.LOBBY_GO_BACK_BUTTON})
          .addComponent(HudHoverable)
          .addComponent(HudClickable)
          .addComponent(CanvasPosition, {x: this.canvasWidth/2 - 420, y: 700})
          .addComponent(Shape, {type: ObjectShape.RECTANGLE})
          .addComponent(Size, {width: 200, height: 50})
          .addComponent(LobbyScene)
          .addComponent(Scene, {value: SceneType.LOBBY});
        
        this.world
          .createEntity()
          .addComponent(MenuHud, {type: MenuHudType.LOBBY_JOIN_GAME_BUTTON})
          .addComponent(HudHoverable)
          .addComponent(HudClickable)
          .addComponent(CanvasPosition, {x: this.canvasWidth/2, y: 700})
          .addComponent(Shape, {type: ObjectShape.RECTANGLE})
          .addComponent(Size, {width: 200, height: 50})
          .addComponent(LobbyScene)
          .addComponent(Scene, {value: SceneType.LOBBY});

        this.world
          .createEntity()
          .addComponent(MenuHud, {type: MenuHudType.LOBBY_SETUP_GAME_BUTTON})
          .addComponent(HudHoverable)
          .addComponent(HudClickable)
          .addComponent(CanvasPosition, {x: this.canvasWidth/2 + 220, y: 700})
          .addComponent(Shape, {type: ObjectShape.RECTANGLE})
          .addComponent(Size, {width: 200, height: 50})
          .addComponent(LobbyScene)
          .addComponent(Scene, {value: SceneType.LOBBY});

				break;
			}
			case SceneType.MULTI_SETUP_GAME: {
        this.world
          .createEntity()
          .addComponent(MenuHud, {type: MenuHudType.MULTI_CONFIRM_GAME_BUTTON})
          .addComponent(HudHoverable)
          .addComponent(HudClickable)
          .addComponent(CanvasPosition, {x: this.canvasWidth/2 + 100, y: 700})
          .addComponent(Shape, {type: ObjectShape.RECTANGLE})
          .addComponent(Size, {width: 200, height: 50})
          .addComponent(MultiSetUpScene)
          .addComponent(Scene, {value: SceneType.MULTI_SETUP_GAME});

        this.world
          .createEntity()
          .addComponent(MenuHud, {type: MenuHudType.MULTI_SETUP_GO_BACK_BUTTON})
          .addComponent(HudHoverable)
          .addComponent(HudClickable)
          .addComponent(CanvasPosition, {x: this.canvasWidth/2 - 300, y: 700})
          .addComponent(Shape, {type: ObjectShape.RECTANGLE})
          .addComponent(Size, {width: 200, height: 50})
          .addComponent(MultiSetUpScene)
          .addComponent(Scene, {value: SceneType.MULTI_SETUP_GAME});

				break;
			}
			case SceneType.MULTI_STAGE_GAME: {
        this.world
          .createEntity()
          .addComponent(MenuHud, {type: MenuHudType.MULTI_STAGE_START_BUTTON})
          .addComponent(HudHoverable)
          .addComponent(HudClickable)
          .addComponent(CanvasPosition, {x: this.canvasWidth/2 + 150, y: 700})
          .addComponent(Shape, {type: ObjectShape.RECTANGLE})
          .addComponent(Size, {width: 200, height: 50})
          .addComponent(MultiStageScene)
          .addComponent(Scene, {value: SceneType.MULTI_STAGE_GAME});

        this.world
          .createEntity()
          .addComponent(MenuHud, {type: MenuHudType.MULTI_STAGE_LEAVE_BUTTON})
          .addComponent(HudHoverable)
          .addComponent(HudClickable)
          .addComponent(CanvasPosition, {x: this.canvasWidth/2 - 350, y: 800})
          .addComponent(Shape, {type: ObjectShape.RECTANGLE})
          .addComponent(Size, {width: 200, height: 50})
          .addComponent(MultiStageScene)
          .addComponent(Scene, {value: SceneType.MULTI_STAGE_GAME});

				break;
			}
		
			// Actual Game
			case SceneType.LOADING_GAME: {
				break;
			}
			case SceneType.GAME: {
				break;
			}
			case SceneType.END_GAME: {
				break;
			}
		
			// Others
			case SceneType.MAP_EDITOR_SETUP:{
        this.world
          .createEntity()
          .addComponent(MenuHud, {type: MenuHudType.MAP_EDITOR_SETUP_GO_BACK_BUTTON})
          .addComponent(HudHoverable)
          .addComponent(HudClickable)
          .addComponent(CanvasPosition, {x: this.canvasWidth/2 - 270, y: 650})
          .addComponent(Shape, {type: ObjectShape.RECTANGLE})
          .addComponent(Size, {width: 220, height: 40})
          .addComponent(MapEditorSetUpScene)
          .addComponent(Scene, {value: SceneType.MAP_EDITOR_SETUP});

        this.world
          .createEntity()
          .addComponent(MenuHud, {type: MenuHudType.MAP_EDITOR_SETUP_BUTTON})
          .addComponent(HudHoverable)
          .addComponent(HudClickable)
          .addComponent(CanvasPosition, {x: this.canvasWidth/2 + 50, y: 650})
          .addComponent(Shape, {type: ObjectShape.RECTANGLE})
          .addComponent(Size, {width: 220, height: 40})
          .addComponent(MapEditorSetUpScene)
          .addComponent(Scene, {value: SceneType.MAP_EDITOR_SETUP});

				break;
			}
			case SceneType.MAP_EDITOR:{
        this.world
          .createEntity()
          .addComponent(MenuHud, {type: MenuHudType.MAP_EDITOR_GO_BACK_BUTTON})
          .addComponent(HudHoverable)
          .addComponent(HudClickable)
          .addComponent(CanvasPosition, {x: 20, y: this.canvasHeight - 60})
          .addComponent(Shape, {type: ObjectShape.RECTANGLE})
          .addComponent(Size, {width: 220, height: 40})
          .addComponent(MapEditorScene)
          .addComponent(Scene, {value: SceneType.MAP_EDITOR});

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
    menuHuds: {
        components: [MenuHud]
    }
};