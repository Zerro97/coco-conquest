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
    MenuScene
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
    

    if(scene) {
        this.updateHudInScene(scene.currentScene);

        if(scene.currentScene === SceneType.GAME) {
          this.startGame();
        } else {
          this.stopGame();
        }
    }
  }

  startGame() {
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
  }

  stopGame() {
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
  }

  /**
   * On scene change, add all the huds associated with the scene
   * HudSelectable component
   */
  updateHudInScene(scene) {
    this.queries.menuHuds.results.forEach(hud => {
        hud.removeComponent(HudSelectable);
    });

    this.queries.menuHuds.results.forEach(hud => {
        let hudScene = hud.getComponent(Scene).value;

        if(hudScene === scene) {
            hud.addComponent(HudSelectable);
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


  

  
      