import { System } from "../../../Library/Ecsy";
import {
  Unit,
  UnitImage,
  Image,
  Health,
  Damage,
  Sight,
  Range,
  Speed,
  GameObject,
  MapPosition,
  MovePosition,
  AttackPosition,
  SelectPosition,
  ScreenStatus,
  ActionStatus,
  Tile,
  DamagePopup,
  Timer,
  CanvasPosition,
  Building,
  SelectedTile,
  SelectedUnit,
  SelectedBuilding,
} from "../../../Component";
import {
  cubeToPixel,
} from "../../../Util";
import { TileSize } from "../../../Type";

/**
 * Handles all the drawing
 */
export class RenderSystem extends System {
  // This method will get called on every frame by default
  execute(delta, time) {
    this.drawDamagePopup();
  }

  drawDamagePopup() {
    this.queries.popup.results.forEach((entity) => {
      const damage = entity.getComponent(DamagePopup);
      const timer = entity.getMutableComponent(Timer);
      const canvasPos = entity.getComponent(CanvasPosition);

      if (timer.curTime < timer.maxTime) {
        this.ctx.font = "20px Arial";
        this.ctx.fillStyle = "red";
        this.ctx.textAlign = "center";
        this.ctx.fillText("-" + damage.value, canvasPos.x, canvasPos.y - 50);

        timer.curTime += 1;
      } else {
        entity.remove();
      }
    });
  }
}

RenderSystem.queries = {
  tiles: {
    components: [Tile, MapPosition, GameObject],
  },
  units: {
    components: [
      Unit,
      MapPosition,
      GameObject,
      Health,
      Damage,
      Sight,
      Range,
      Speed,
    ],
  },
  buildings: {
    components: [Building, MapPosition, GameObject],
  },
  images: {
    components: [Image],
  },
  popup: {
    components: [DamagePopup, Timer, MapPosition, CanvasPosition],
  },
  screenStatus: {
    components: [ScreenStatus],
  },
  actionStatus: {
    components: [ActionStatus, MovePosition, AttackPosition, SelectPosition],
  },
};
