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
	CurrentSelect
} from "../../Component";
import { ActionType, TileSize, UnitType } from "../../Type";
import { cubeToPixel } from "../../Util";

export class UnitSystem extends System {
	execute(delta, time) {
		//this.attackUnit();
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
};