import { System } from "../../Library/Ecsy";
import {
    SceneStatus
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
import { SceneType } from "../../Type";

export class SceneSystem extends System {
  execute(delta, time) {
    const scene = this.queries.sceneStatus.results[0].getComponent(SceneStatus);

    if(scene.currentScene !== SceneType.GAME) {
        this.stopGame();
    }

    switch(scene.currentScene) {
        case SceneType.MENU: {
            break;
        }
        case SceneType.SINGLE_PLAY: {

            break;
        }
        case SceneType.MULTI_PLAY: {

            break;
        }
        case SceneType.SETTING: {

            break;
        }
        case SceneType.SETUP_GAME: {

            break;
        }
        case SceneType.LOAD_GAME: {

            break;
        }
        case SceneType.JOIN_GAME: {

            break;
        }
        case SceneType.LOADING_GAME: {

            break;
        }
        case SceneType.GAME: {

            break;
        }
        case SceneType.END_GAME: {

            break;
        }
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
}

SceneSystem.queries = {
    sceneStatus: {
        components: [SceneStatus]
    }
};
