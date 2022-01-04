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
import * as SystemClass from "../../System";
import {  } from "../../Util";
import { MenuHudType, SceneType, ObjectShape } from "../../Type";

export class SceneSystem extends System {
  execute(delta, time) {
    const scene = this.queries.sceneStatus.changed[0]?.getComponent(SceneStatus);
    
    if(scene) {
        this.updateHudInScene(scene.currentScene);
        console.log("Before Stop");
        this.stopAll();

        switch(scene.currentScene) {
          case SceneType.MAP_EDITOR: {
            this.world.getSystem(SystemClass.MapEditorScreenSystem).play();
            this.world.getSystem(SystemClass.MapEditorRenderSystem).play();
            
            break;
          }
          case SceneType.GAME: {
            console.log("Resume Game");
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


  

  
      