import { System } from "../../Library/Ecsy";
import {
    MenuHud,
    SceneStatus,
    HudHoverable,
    HudSelectable,
    CanvasPosition,
    Shape,
    Size
} from "../../Component";
import { 
    RegionSystem,
    RenderSystem,
    ScreenSystem,
    TileRenderSystem,
    UnitRenderSystem,
    BuildingRenderSystem,
    GameHudSystem,
    HudRenderSystem,
    ActionSystem,
    GlobalGameSystem,
    HudSystem,
    MovementSystem,
    UnitSystem
} from "../../System";
import {  } from "../../Util";
import { MenuHudType, SceneType, ObjectShape } from "../../Type";

export class SceneSystem extends System {
  execute(delta, time) {
    const scene = this.queries.sceneStatus.changed[0]?.getComponent(SceneStatus);
    this.stopGame();

    if(scene) {
        console.log("CHANGED");
        this.updateHuds(scene.currentScene);
    }
  }

  stopGame() {
    this.stopGameRender();
    this.stopGameUpdate();
  }

  stopGameRender() {
    this.world.getSystem(RegionSystem).stop();
    this.world.getSystem(RenderSystem).stop();
    this.world.getSystem(ScreenSystem).stop();
    this.world.getSystem(TileRenderSystem).stop();
    this.world.getSystem(UnitRenderSystem).stop();
    this.world.getSystem(BuildingRenderSystem).stop();
    this.world.getSystem(GameHudSystem).stop();
    this.world.getSystem(HudRenderSystem).stop();
  }

  stopGameUpdate() {
    this.world.getSystem(ActionSystem).stop();
    this.world.getSystem(GlobalGameSystem).stop();
    this.world.getSystem(HudSystem).stop();
    this.world.getSystem(MovementSystem).stop();
    this.world.getSystem(UnitSystem).stop();
  }

  updateHuds(scene) {
      this.queries.menuHuds.results.forEach(hud => {
          hud.remove();
      });

      switch(scene) {
        case SceneType.MENU: {
            this.updateMenu();
            break;
        }
        case SceneType.SINGLE_PLAY: {
            this.updateSinglePlay();
            break;
        }
        case SceneType.MULTI_PLAY: {
            this.updateMultiPlay();
            break;
        }
        case SceneType.SETTING: {
            this.updateSetting();
            break;
        }
        case SceneType.SETUP_GAME: {
            this.updateSetUpGame();
            break;
        }
        case SceneType.LOAD_GAME: {
            this.updateLoadGame();
            break;
        }
        case SceneType.JOIN_GAME: {
            this.updateJoinGame();
            break;
        }
        case SceneType.LOADING_GAME: {
            this.updateLoadingGame();
            break;
        }
        case SceneType.END_GAME: {
            this.updateEndGame();
            break;
        }
      }
  }

  updateMenu() {
    // Menu Buttons
    let menuButtonTypes = [
        MenuHudType.SINGLE_PLAY_BUTTON,
        MenuHudType.MULTI_PLAY_BUTTON,
        MenuHudType.SETTING_BUTTON,
        MenuHudType.EXIT_BUTTON
    ];

    for(let i=0; i<4; i++) {
        this.world
            .createEntity()
            .addComponent(MenuHud, {type: menuButtonTypes[i]})
            .addComponent(HudHoverable)
            .addComponent(HudSelectable)
            .addComponent(CanvasPosition, {x: this.canvasWidth/2 - 100, y: 350 + i * 50})
            .addComponent(Shape, {type: ObjectShape.RECTANGLE})
            .addComponent(Size, {width: 200, height: 50});
    }
  }

  updateSinglePlay() {
      // Single/Multi Play Buttons
      let singlePlayButtonTypes = [
        MenuHudType.SETUP_GAME_BUTTON,
        MenuHudType.LOAD_GAME_BUTTON,
        MenuHudType.SINGLE_GO_BACK_BUTTON
      ];
  
      for(let i=0; i<3; i++) {
        this.world
          .createEntity()
          .addComponent(MenuHud, {type: singlePlayButtonTypes[i]})
          .addComponent(HudHoverable)
          .addComponent(HudSelectable)
          .addComponent(CanvasPosition, {x: this.canvasWidth/2 - 100, y: 350 + i * 50})
          .addComponent(Shape, {type: ObjectShape.RECTANGLE})
          .addComponent(Size, {width: 200, height: 50});
      }
  }

  updateMultiPlay() {
    let multiPlayButtonTypes = [
        MenuHudType.SETUP_GAME_BUTTON,
        MenuHudType.LOAD_GAME_BUTTON,
        MenuHudType.JOIN_GAME_BUTTON,
        MenuHudType.MULTI_GO_BACK_BUTTON
    ];

    for(let i=0; i<4; i++) {
        this.world
            .createEntity()
            .addComponent(MenuHud, {type: multiPlayButtonTypes[i]})
            .addComponent(HudHoverable)
            .addComponent(HudSelectable)
            .addComponent(CanvasPosition, {x: this.canvasWidth/2 - 100, y: 350 + 100})
            .addComponent(Shape, {type: ObjectShape.RECTANGLE})
            .addComponent(Size, {width: 200, height: 50});
    }
  }

  updateSetting() {

  }

  updateSetUpGame() {

  }

  updateLoadGame() {

  }

  updateJoinGame() {

  }

  updateLoadingGame() {

  }

  updateEndGame() {

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


  

  
      