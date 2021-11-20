import { System } from "../../../Library/Ecsy";
import {
  ScreenStatus,
  ActionStatus,
  GameObject,
  Health,
  Damage,
  Sight,
  Speed,
  Range,
  MapPosition,
  CanvasPosition,
  SelectPosition,
  CurrentSelect,
  IconImage,
  Image,
  Tile,
  Unit,
  Building
} from "../../../Component";
import { ActionType, TileSize } from "../../../Type";
import { tilesInRange, cubeToPixel, drawAttackingTile, drawMovingTile } from "../../../Util";

export class GameHudSystem extends System {
  execute(delta, time) {
    this.drawGameHud();
  }

  drawGameHud() {
    this.drawActionOptions();
  }

  drawActionOptions() {
    const actionStatus = this.queries.actionStatus.results[0].getComponent(ActionStatus);

    switch (actionStatus.action) {
      case ActionType.FOCUSED:
        // 1) Draw unit info on panel
        break;
      case ActionType.SELECTED:
        // 2) Draw unit's available action options
        //this.drawOptionHud();
        break;
      case ActionType.MOVE:
        // 3) Draw movement hud
        //this.drawMoveHud();
        break;
      case ActionType.ATTACK:
        // 4) Draw attack hud
        //this.drawAttackHud();
        break;
    }
  }
}

GameHudSystem.queries = {
  screenStatus: {
    components: [ScreenStatus],
  },
  actionStatus: {
    components: [ActionStatus],
  },
  images: {
    components: [Image],
  },
  selectedTile: {
    components: [Tile, CurrentSelect, MapPosition, CanvasPosition]
  },
  selectedUnit: {
    components: [Unit, CurrentSelect, MapPosition, CanvasPosition]
  },
  selectedBuilding: {
    components: [Building, CurrentSelect, MapPosition, CanvasPosition]
  }
};
