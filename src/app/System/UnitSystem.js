import { System } from '../Library/Ecsy';
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
	ActionStatus, 
	MovePosition, 
	AttackPosition, 
	SelectPosition, 
	SelectedUnit
} from '../Component';
import { ActionType, UnitType } from '../Type';

export class UnitSystem extends System {
	execute(delta, time) {
		this.attackUnit();

		//this.stop();
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
			console.log(damage);

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

	getSelectedUnit() {
		let selectedUnit = {};

		this.queries.units.results.some(entity => {			
			if(entity.hasComponent(SelectedUnit)){
				selectedUnit = entity;
				return true;
			}

			return false;
		});

		return selectedUnit;
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
	}
};