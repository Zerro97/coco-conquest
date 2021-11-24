import { System } from "../../../Library/Ecsy";
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
  DamagePopup,
  Velocity,
  CurrentFocus,
  CurrentSelect,
  CurrentRightSelect,
  Tile,
  TileMap,
  WeightMap,
  PreviousSelect,
  Team,
  GlobalStatus,
  Turn,
  ScreenFocusStatus
} from "../../../Component";
import {  } from "../../../Type";
import { getTilesInRange } from "../../../Util";

export class UnitSystem extends System {
  execute(delta, time) {
    const globalStatus = this.queries.globalStatus.results[0].getComponent(GlobalStatus);
    const turnStatus = this.queries.turn.results[0].getComponent(Turn);
    const isPlayerTurn = turnStatus.turnProgress === globalStatus.myTeamId;

    if(isPlayerTurn) {
      this.updateMovementRange();
      this.moveUnit();
    }
    //this.attackUnit();
    //this.stop();
  }

  // Create weight map for determining available movement range
  updateMovementRange() {
    const selectedUnit = this.queries.selectedUnit.results[0];
    const previousUnit = this.queries.previousUnit.results[0];

    let weightMap = this.queries.weightMap.results[0].getMutableComponent(WeightMap);

    // Fix for weightmap not updating when background was selected instead of unit
    if(!selectedUnit) {
      weightMap.value = {};
    }

    // Only update movement range when:
    // 1) unit is selected,
    // 2) movement range isn't updated yet
    // 3) different unit is selected
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
    const focusStatus = this.queries.screenFocusStatus.results[0].getMutableComponent(ScreenFocusStatus);

    let weightMap = this.queries.weightMap.results[0].getMutableComponent(WeightMap);
    const tileMap = this.queries.tileMap.results[0].getMutableComponent(TileMap).value;
    
    const allUnits = this.queries.units.results;
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
        let targetUnit = {};

        allUnits.forEach(unit => {
          let unitPos = unit.getComponent(MapPosition);
          if(unitPos.x === movingPos.x && unitPos.y === movingPos.y && unitPos.z === movingPos.z) {
            targetUnit = unit;
          }
        });

        if(Object.keys(targetUnit).length === 0) {
          // Update the selected tile (also focus screen to moved tile)
          let originalTile = tileMap[originalPos.x][originalPos.y][originalPos.z];
          let movedTile = tileMap[movingPos.x][movingPos.y][movingPos.z];

          if(originalTile.hasComponent(CurrentSelect)) {
            originalTile.removeComponent(CurrentSelect);
          }
          if(!movedTile.hasComponent(CurrentSelect)) {
            movedTile.addComponent(CurrentSelect);
            focusStatus.startFocusing = true;
          }

          // Move the unit
          originalPos.x = movingPos.x;
          originalPos.y = movingPos.y;
          originalPos.z = movingPos.z;
          originalCanvasPos.x = movingCanvasPos.x;
          originalCanvasPos.y = movingCanvasPos.y;
          originalCanvasPos.z = movingCanvasPos.z;
  
          weightMap.value = {};
        } else {
          // Attack the unit if it's different team
          let selectTeam = selectedUnit.getComponent(Team)?.value;
          let targetTeam = targetUnit.getComponent(Team)?.value;
          
          if(selectTeam !== targetTeam) {
            this.attackUnit(selectedUnit, targetUnit);
          }
        }
      }
    }
  }

  attackUnit(selectedUnit, targetUnit) {
    const damage = selectedUnit.getComponent(Damage);
    const targetHp = targetUnit.getMutableComponent(Health);
    const popMapPos = targetUnit.getComponent(MapPosition);
    const popCanvasPos = targetUnit.getComponent(CanvasPosition);

    targetHp.value -= damage.value;

    if (targetHp.value <= 0) {
      targetUnit.remove();
    }

    this.world
      .createEntity()
      .addComponent(MapPosition, {
        x: popMapPos.x,
        y: popMapPos.y,
        z: popMapPos.z,
      })
      .addComponent(CanvasPosition, {
        x: popCanvasPos.x,
        y: popCanvasPos.y
      })
      .addComponent(Velocity, { x: 0, y: -0.03 })
      .addComponent(DamagePopup, { value: damage.value })
      .addComponent(Timer, { maxTime: 50, curTime: 0 });
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
  turn: {
    components: [Turn]
  },
  globalStatus: {
    components: [GlobalStatus]
  },
  screenFocusStatus: {
    components: [ScreenFocusStatus]
  }
};
