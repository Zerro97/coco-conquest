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
  Tile
} from "../../Component";
import { ActionType, TileSize, UnitType } from "../../Type";
import { cubeToPixel } from "../../Util";

export class UnitSystem extends System {
	execute(delta, time) {
    this.moveUnit();
		//this.attackUnit();
		//this.stop();
	}

  moveUnit() {
    const selectedUnit = this.queries.selectedUnit.results[0];
    const movingTile = this.queries.movingTile.results[0];

    if(selectedUnit && movingTile) {
      let originalPos = selectedUnit.getMutableComponent(MapPosition);
      let originalCanvasPos = selectedUnit.getMutableComponent(CanvasPosition);
      let movingPos = movingTile.getMutableComponent(MapPosition);
      let movingCanvasPos = movingTile.getMutableComponent(CanvasPosition);
  
      originalPos.x = movingPos.x;
      originalPos.y = movingPos.y;
      originalPos.z = movingPos.z;
      originalCanvasPos.x = movingCanvasPos.x;
      originalCanvasPos.y = movingCanvasPos.y;
      originalCanvasPos.z = movingCanvasPos.z;
    }
  }

	attackUnit() {
		const actionEntity = this.queries.actionStatus.results[0];
		const actionStatus = actionEntity.getMutableComponent(ActionStatus);
		const attackPosition = actionEntity.getMutableComponent(AttackPosition);

		const control = this.queries.control.results[0];
		const block = control.getMutableComponent(Block);

		if(actionStatus.action === ActionType.ATTACK) {
			const selectedUnit = this.getSelectedUnit();
			const damage = selectedUnit.getComponent(Damage);

			this.queries.units.results.forEach(entity => {
				const health = entity.getMutableComponent(Health);
				const mapPos = entity.getComponent(MapPosition);

				if(mapPos.x === attackPosition.x && 
					mapPos.y === attackPosition.y && 
					mapPos.z === attackPosition.z) {

					health.value -= damage.value;
					attackPosition.x = -999;
					attackPosition.y = -999;
					attackPosition.z = -999;
					actionStatus.action = ActionType.NOT_SELECTED;

					this.world
						.createEntity()
						.addComponent(MapPosition, {x: mapPos.x, y: mapPos.y, z: mapPos.z})
						.addComponent(CanvasPosition, cubeToPixel(mapPos.x, mapPos.z, TileSize.REGULAR))
						.addComponent(Velocity, {x: 0, y: -0.03})
						.addComponent(DamagePopup, {value: damage.value})
						.addComponent(Timer, {maxTime: 50, curTime: 0});
				}
				
				if(health.value <= 0) {
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
		components: [Unit, MapPosition, Health, Damage, Sight, Range, Speed]
	},
	control: {
		components: [Block, Timer]
	},
	actionStatus: {
		components: [ActionStatus, MovePosition, AttackPosition, SelectPosition]
	},
	focusedUnit: {
		components: [CurrentFocus, Unit, MapPosition]
	},
	selectedUnit: {
		components: [CurrentSelect, Unit, MapPosition]
	},
  movingTile: {
    components: [CurrentRightSelect, Tile]
  }
};