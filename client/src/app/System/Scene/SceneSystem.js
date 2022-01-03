import { System } from "../../Library/Ecsy";
import {
    MenuHud,
    SceneStatus,
    HudHoverable,
    HudSelectable,
    CanvasPosition,
    Shape,
    Size,
    Scene,
    MenuScene,
    HudClickable
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
    UnitSystem,
    MenuRenderSystem, 
    MenuSystem
} from "../../System";
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
            this.world.getSystem(ScreenSystem).play();
            this.world.getSystem(MenuSystem).play();
            this.world.getSystem(MenuRenderSystem).play();
            break;
          }
          case SceneType.GAME: {
            // Render
            this.world.getSystem(RegionSystem).play();
            this.world.getSystem(RenderSystem).play();
            this.world.getSystem(ScreenSystem).play();
            this.world.getSystem(TileRenderSystem).play();
            this.world.getSystem(UnitRenderSystem).play();
            this.world.getSystem(BuildingRenderSystem).play();
            this.world.getSystem(GameHudSystem).play();
            this.world.getSystem(HudRenderSystem).play();
        
            // Update
            this.world.getSystem(ActionSystem).play();
            this.world.getSystem(GlobalGameSystem).play();
            this.world.getSystem(HudSystem).play();
            this.world.getSystem(MovementSystem).play();
            this.world.getSystem(UnitSystem).play();
            break;
          }
          default: {
            this.world.getSystem(MenuSystem).play();
            this.world.getSystem(MenuRenderSystem).play();
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
    // Render
    this.world.getSystem(RegionSystem).stop();
    this.world.getSystem(RenderSystem).stop();
    this.world.getSystem(ScreenSystem).stop();
    this.world.getSystem(TileRenderSystem).stop();
    this.world.getSystem(UnitRenderSystem).stop();
    this.world.getSystem(BuildingRenderSystem).stop();
    this.world.getSystem(GameHudSystem).stop();
    this.world.getSystem(HudRenderSystem).stop();

    // Update
    this.world.getSystem(ActionSystem).stop();
    this.world.getSystem(GlobalGameSystem).stop();
    this.world.getSystem(HudSystem).stop();
    this.world.getSystem(MovementSystem).stop();
    this.world.getSystem(UnitSystem).stop();

    // Menu
    this.world.getSystem(MenuSystem).stop();
    this.world.getSystem(MenuRenderSystem).stop();
  }

  /**
   * On scene change, add all the huds associated with the scene
   * HudClickable component so that they can be clicked
   * when at the scene they are associated with
   */
  updateHudInScene(scene) {
    this.queries.menuHuds.results.forEach(hud => {
        hud.removeComponent(HudClickable);
    });

    this.queries.menuHuds.results.forEach(hud => {
        let hudScene = hud.getComponent(Scene)?.value;

        if(hudScene === scene) {
            hud.addComponent(HudClickable);
        }
    });
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


  

  
      