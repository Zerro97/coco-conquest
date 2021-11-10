import { System } from "../../Library/Ecsy";
import {
  Unit,
  UnitImage,
  IconImage,
  Image,
  Health,
  Damage,
  Sight,
  Range,
  Speed,
  Object,
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
} from "../../Component";
import {
  roundRect,
  drawAttackingTile,
  drawMovingTile,
  drawSelectIcon,
  drawCancelIcon,
  cubeToPixel,
  tilesInRange,
} from "../../Util";
import { ActionType, ObjectType, TileSize, TileStatus } from "../../Type";

/**
 * Handles all the drawing
 */
export class RenderSystem extends System {
  // This method will get called on every frame by default
  execute(delta, time) {
    // Drawing order matters
    this.drawBuildings();
    this.drawUnits();

    this.drawActionHud();
    this.drawDamagePopup();

  }

  // Clear canvas screen
  clearCanvas() {
    this.ctx.fillStyle = "#69696c";
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  drawBuildings() {}

  drawUnits() {
    const unitImages = [];
    this.queries.images.results.forEach((entity) => {
      if (entity.hasComponent(UnitImage)) {
        unitImages.push({
          name: entity.getMutableComponent(Image).name,
          value: entity.getMutableComponent(Image).value,
        });
      }
    });

    this.queries.units.results.forEach((entity) => {
      let type = entity.getComponent(Unit).value;
      let image = unitImages.reduce((item, acc) => {
        if (item.name === `${type}.png`) {
          return item;
        }
        return acc;
      });

      let mapPos = entity.getComponent(MapPosition);
      let canvasPos = cubeToPixel(mapPos.x, mapPos.z, TileSize.REGULAR);

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(canvasPos.x, canvasPos.y, 30, 0, Math.PI * 2, true);
      this.ctx.closePath();
      this.ctx.clip();
      this.ctx.drawImage(
        image.value,
        canvasPos.x - 30,
        canvasPos.y - 30,
        60,
        60
      );
      this.ctx.restore();
    });
  }

  drawActionHud() {
    const actionStatus =
      this.queries.actionStatus.results[0].getComponent(ActionStatus);

    switch (actionStatus.action) {
      case ActionType.SELECTED:
        // 2) Draw unit's options
        this.drawOption();
        break;
      case ActionType.ATTACK:
        // 3a) Draw attack hud
        this.drawAttack();
        break;
      case ActionType.MOVE:
        // 3b) Draw movement hud
        this.drawMove();
        break;
    }
  }

  drawOption() {
    const actionEntity = this.queries.actionStatus.results[0];
    const actionStatus = actionEntity.getMutableComponent(ActionStatus);
    const selectPosition = actionEntity.getMutableComponent(SelectPosition);

    const iconImages = [];
    this.queries.images.results.forEach((entity) => {
      if (entity.hasComponent(IconImage)) {
        iconImages.push({
          name: entity.getMutableComponent(Image).name,
          value: entity.getMutableComponent(Image).value,
        });
      }
    });

    let mapPos = { x: selectPosition.x, z: selectPosition.z };
    let canvasPos = cubeToPixel(mapPos.x, mapPos.z, TileSize.REGULAR);

    switch (actionStatus.selectType) {
      case 0:
        break;
      case 1:
        drawSelectIcon(
          this.ctx,
          canvasPos.x,
          canvasPos.y,
          iconImages[1].value,
          iconImages[0].value
        );
        break;
      case 2:
        break;
    }
  }

  drawAttack() {
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

  drawMove() {
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

  getSelectedObject() {
    let selectedObject = {};

    this.queries.tiles.results.some((entity) => {
      if (entity.hasComponent(SelectedTile)) {
        selectedObject = entity;
        return true;
      }

      return false;
    });

    this.queries.units.results.some((entity) => {
      if (entity.hasComponent(SelectedUnit)) {
        selectedObject = entity;
        return true;
      }

      return false;
    });

    this.queries.buildings.results.some((entity) => {
      if (entity.hasComponent(SelectedBuilding)) {
        selectedObject = entity;
        return true;
      }

      return false;
    });

    return selectedObject;
  }
}

RenderSystem.queries = {
  tiles: {
    components: [Tile, MapPosition, Object],
  },
  units: {
    components: [
      Unit,
      MapPosition,
      Object,
      Health,
      Damage,
      Sight,
      Range,
      Speed,
    ],
  },
  buildings: {
    components: [Building, MapPosition, Object],
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
