import { System } from "../../Library/Ecsy";
import {
  Block,
  Timer,
  Unit,
  Health,
  Damage,
  Sight,
  Range,
  Speed,
  MapPosition,
  CanvasPosition,
  ActionStatus,
  MovePosition,
  AttackPosition,
  SelectPosition,
  SelectedUnit,
  DamagePopup,
  UnitImage,
  Velocity,
  CurrentFocus,
  CurrentSelect,
  CurrentRightSelect,
  Tile,
  TileMap,
  WeightMap,
  PreviousSelect,
} from "../../Component";
import { ActionType, TileSize, UnitType } from "../../Type";
import { cubeToPixel, getTilesInRange } from "../../Util";

export class UnitSystem extends System {
  execute(delta, time) {
    this.updateMovementRange();
    this.moveUnit();
    //this.attackUnit();
    //this.stop();
  }

  // Create weight map for determining available movement range
  updateMovementRange() {
    const selectedUnit = this.queries.selectedUnit.results[0];
    const previousUnit = this.queries.previousUnit.results[0];

    let weightMap = this.queries.weightMap.results[0].getMutableComponent(WeightMap);

    if(!selectedUnit) {
      weightMap.value = {};
    }
    // Only update movement range when unit is selected
    // and movement range isn't updated yet
    if (
      selectedUnit && (Object.keys(weightMap.value).length === 0 ||
      (previousUnit && previousUnit.getComponent(Unit) !== selectedUnit.getComponent(Unit)))
    ) {
      const tileMap = this.queries.tileMap.results[0].getMutableComponent(TileMap).value;
      const speed = selectedUnit.getComponent(Speed).value;
      const pos = selectedUnit.getComponent(MapPosition);
      const mapPos = { x: pos.x, y: pos.y, z: pos.z };

      weightMap.value = getTilesInRange(mapPos, speed * 2);

      let nodes = [{ x: mapPos.x, y: mapPos.y, z: mapPos.z, weight: 0 }];
      while (nodes.length !== 0) {
        let new_nodes = [];

        nodes.forEach((node) => {
          for (let x = -1; x <= 1; x++) {
            for (let y = Math.max(-1, -x - 1); y <= Math.min(1, -x + 1); y++) {
              let z = -x - y;

              if (
                !(x === 0 && y === 0 && z === 0) &&
                tileMap[node.x + x] &&
                tileMap[node.x + x][node.y + y] &&
                tileMap[node.x + x][node.y + y][node.z + z]
              ) {
                let curWeight =
                  node.weight +
                  tileMap[node.x + x][node.y + y][node.z + z].getComponent(Tile)
                    .weight;

                if (
                  curWeight <
                    weightMap.value[node.x + x][node.y + y][node.z + z] &&
                  curWeight <= speed
                ) {
                  weightMap.value[node.x + x][node.y + y][node.z + z] =
                    curWeight;
                  new_nodes.push({
                    x: node.x + x,
                    y: node.y + y,
                    z: node.z + z,
                    weight: curWeight,
                  });
                }
              }
            }
          }
        });

        nodes = new_nodes;
      }
    }
  }

  moveUnit() {
    let weightMap =
      this.queries.weightMap.results[0].getMutableComponent(WeightMap);
    const selectedUnit = this.queries.selectedUnit.results[0];
    const movingTile = this.queries.movingTile.results[0];

    if (selectedUnit && movingTile) {
      let originalPos = selectedUnit.getMutableComponent(MapPosition);
      let originalCanvasPos = selectedUnit.getMutableComponent(CanvasPosition);
      let movingPos = movingTile.getMutableComponent(MapPosition);
      let movingCanvasPos = movingTile.getMutableComponent(CanvasPosition);

      if (
        weightMap.value[movingPos.x] &&
        weightMap.value[movingPos.x][movingPos.y] &&
        weightMap.value[movingPos.x][movingPos.y][movingPos.z] < 999
      ) {
        originalPos.x = movingPos.x;
        originalPos.y = movingPos.y;
        originalPos.z = movingPos.z;
        originalCanvasPos.x = movingCanvasPos.x;
        originalCanvasPos.y = movingCanvasPos.y;
        originalCanvasPos.z = movingCanvasPos.z;

        weightMap.value = {};
      }
    }
  }

  attackUnit() {
    const actionEntity = this.queries.actionStatus.results[0];
    const actionStatus = actionEntity.getMutableComponent(ActionStatus);
    const attackPosition = actionEntity.getMutableComponent(AttackPosition);

    const control = this.queries.control.results[0];
    const block = control.getMutableComponent(Block);

    if (actionStatus.action === ActionType.ATTACK) {
      const selectedUnit = this.getSelectedUnit();
      const damage = selectedUnit.getComponent(Damage);

      this.queries.units.results.forEach((entity) => {
        const health = entity.getMutableComponent(Health);
        const mapPos = entity.getComponent(MapPosition);

        if (
          mapPos.x === attackPosition.x &&
          mapPos.y === attackPosition.y &&
          mapPos.z === attackPosition.z
        ) {
          health.value -= damage.value;
          attackPosition.x = -999;
          attackPosition.y = -999;
          attackPosition.z = -999;
          actionStatus.action = ActionType.NOT_SELECTED;

          this.world
            .createEntity()
            .addComponent(MapPosition, {
              x: mapPos.x,
              y: mapPos.y,
              z: mapPos.z,
            })
            .addComponent(
              CanvasPosition,
              cubeToPixel(mapPos.x, mapPos.z, TileSize.REGULAR)
            )
            .addComponent(Velocity, { x: 0, y: -0.03 })
            .addComponent(DamagePopup, { value: damage.value })
            .addComponent(Timer, { maxTime: 50, curTime: 0 });
        }

        if (health.value <= 0) {
          entity.remove();
        }
      });
    }

    // Unblock mouse listener
    // (it was blocked to prevent changing action type from NOT_SELECTED to SELECTED)
    block.value = false;
  }
}

UnitSystem.queries = {
  units: {
    components: [Unit, MapPosition, Health, Damage, Sight, Range, Speed],
  },
  control: {
    components: [Block, Timer],
  },
  actionStatus: {
    components: [ActionStatus, MovePosition, AttackPosition, SelectPosition],
  },
  focusedUnit: {
    components: [CurrentFocus, Unit, MapPosition],
  },
  selectedUnit: {
    components: [CurrentSelect, Unit, MapPosition],
  },
  previousUnit: {
    components: [PreviousSelect, Unit],
  },
  movingTile: {
    components: [CurrentRightSelect, Tile],
  },
  weightMap: {
    components: [WeightMap],
  },
  tileMap: {
    components: [TileMap],
  },
};
