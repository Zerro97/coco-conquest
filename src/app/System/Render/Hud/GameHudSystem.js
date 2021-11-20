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
import { tilesInRange, cubeToPixel, drawAttackingTile, drawCancelIcon, drawSelectIcon, drawMovingTile } from "../../../Util";

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
        this.drawOptionHud();
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

  drawOptionHud() {
    const actionEntity = this.queries.actionStatus.results[0];
    const actionStatus = actionEntity.getMutableComponent(ActionStatus);

    const selectedUnit = this.queries.selectedUnit.results[0];

    if(selectedUnit) {
      const canvasPos = selectedUnit.getMutableComponent(CanvasPosition);

      const iconImages = [];
      this.queries.images.results.forEach((entity) => {
        if (entity.hasComponent(IconImage)) {
          iconImages.push({
            name: entity.getMutableComponent(Image).name,
            value: entity.getMutableComponent(Image).value,
          });
        }
      });
  
      drawSelectIcon(
        this.ctx,
        canvasPos.x,
        canvasPos.y,
        iconImages[0].value,
        iconImages[0].value
      );
    }
  }

  drawAttackHud() {
    const actionEntity = this.queries.actionStatus.results[0];
    const selectPosition = actionEntity.getMutableComponent(SelectPosition);

    const selectedUnit = this.getSelectedObject();
    const range = selectedUnit.getComponent(Range).value;

    let mapPos = { x: selectPosition.x, z: selectPosition.z };
    let canvasPos = cubeToPixel(mapPos.x, mapPos.z, TileSize.REGULAR);

    let tiles = tilesInRange(
      {
        x: selectPosition.x,
        y: selectPosition.y,
        z: selectPosition.z,
      },
      range
    );

    tiles.forEach((tile) => {
      const pixelPos = cubeToPixel(tile.x, tile.z, TileSize.REGULAR);
      drawAttackingTile(this.ctx, pixelPos.x, pixelPos.y);
    });
    this.drawUnits();
    this.drawBuildings();

    // Draw Cancel Button
    drawCancelIcon(this.ctx, canvasPos.x, canvasPos.y);
  }

  drawMoveHud() {
    const actionEntity = this.queries.actionStatus.results[0];
    const selectPosition = actionEntity.getMutableComponent(SelectPosition);

    const selectedUnit = this.getSelectedObject();
    const speed = selectedUnit.getComponent(Speed).value;

    let mapPos = { x: selectPosition.x, z: selectPosition.z };
    let canvasPos = cubeToPixel(mapPos.x, mapPos.z, TileSize.REGULAR);

    let tiles = tilesInRange(
      {
        x: selectPosition.x,
        y: selectPosition.y,
        z: selectPosition.z,
      },
      speed
    );

    tiles.forEach((tile) => {
      const pixelPos = cubeToPixel(tile.x, tile.z, TileSize.REGULAR);
      drawMovingTile(this.ctx, pixelPos.x, pixelPos.y);
    });

    this.drawUnits();
    this.drawBuildings();

    drawCancelIcon(this.ctx, canvasPos.x, canvasPos.y);
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
