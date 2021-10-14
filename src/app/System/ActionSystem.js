import { System } from '../Library/Ecsy';
import {
	Hud,
	Tile,
	Block,
	Timer,
	Range,
	Speed,
	Unit,
	Building,
	Object,
	MapPosition,
	ScreenStatus,
	ActionStatus,
	MovePosition,
	AttackPosition,
	SelectPosition,
	SelectedTile,
	SelectedUnit,
	SelectedBuilding,
} from '../Component';
import {
	cube_distance,
	cubeToPixel,
	isInsideHexagon,
	applyTransformation,
	isInsideCircle,
} from '../Util';
import {
	ActionType,
	ObjectType,
	AttackType,
	MovementType,
	TileStatus,
} from '../Type';

/**
 * Handles all the events that could happen when
 * there is mouse input
 */
export class ActionSystem extends System {
	execute(delta, time) {

	}

	updateAction(mouseX, mouseY) {
		const actionStatus = this.queries.actionStatus.results[0].getMutableComponent(ActionStatus);

		const control = this.queries.control.results[0];
		const block = control.getComponent(Block);

		if (!block.value) {
			switch (actionStatus.action) {
			case ActionType.NOT_SELECTED:
				// 1) If the player just selected tile
				this.checkSelect(mouseX, mouseY);
				break;
			case ActionType.SELECTED:
				// 2) Check which option player selected
				this.checkOption(mouseX, mouseY);
				break;
			case ActionType.ATTACK:
				// 3a) If the player is attacking
				this.checkAttack(mouseX, mouseY);
				break;
			case ActionType.MOVE:
				// 3b) If the player is moving
				this.checkMovement(mouseX, mouseY);
				break;
			}
		}
	}

	checkSelect(mouseX, mouseY) {
		const actionEntity = this.queries.actionStatus.results[0];
		const actionStatus = actionEntity.getMutableComponent(ActionStatus);
		const selectPosition = actionEntity.getMutableComponent(SelectPosition);

		this.queries.tiles.results.forEach((entity) => {
			let tile = entity.getMutableComponent(Tile);
			let tilePos = entity.getMutableComponent(MapPosition);
			let canvasPos = cubeToPixel(tilePos.x, tilePos.z, tile.size);

			if (isInsideHexagon(canvasPos.x, canvasPos.y, mouseX, mouseY, tile.size)) {
				this.removeSelect();

				const object = this.getObjectOnTile(tilePos.x, tilePos.z);
				const objectType = object.getComponent(Object).value;

				switch (objectType) {
				case ObjectType.TILE:
					object.addComponent(SelectedTile);
					break;
				case ObjectType.UNIT:
					object.addComponent(SelectedUnit);
					break;
				case ObjectType.BUILDING:
					object.addComponent(SelectedBuilding);
					break;
				}

				actionStatus.action = ActionType.SELECTED;
				actionStatus.selectType = objectType;

				selectPosition.x = tilePos.x;
				selectPosition.y = tilePos.y;
				selectPosition.z = tilePos.z;
			}
		});
	}

	checkOption(mouseX, mouseY) {
		const actionEntity = this.queries.actionStatus.results[0];
		const actionStatus = actionEntity.getMutableComponent(ActionStatus);
		const selectPosition = actionEntity.getMutableComponent(SelectPosition);

		const tilePos = cubeToPixel(selectPosition.x, selectPosition.z, 50);
		const attackPos = { x: tilePos.x - 25, y: tilePos.y - 65 };
		const movementPos = { x: tilePos.x + 25, y: tilePos.y - 65 };

		switch(actionStatus.selectType) {
		case ObjectType.TILE:
			this.checkSelect(mouseX, mouseY);
			break;
		case ObjectType.BUILDING:
			this.checkSelect(mouseX, mouseY);
			break;
		case ObjectType.UNIT:
			if (isInsideCircle(attackPos.x, attackPos.y, mouseX, mouseY, 20)) {
				actionStatus.action = ActionType.ATTACK;
				actionStatus.attackType = AttackType.SIMPLE;
			} else if (isInsideCircle(movementPos.x, movementPos.y, mouseX, mouseY, 20)) {
				actionStatus.action = ActionType.MOVE;
				actionStatus.movementType = MovementType.SIMPLE;
			} else {
				this.checkSelect(mouseX, mouseY);
			}

			break;
		}
	}

	checkAttack(mouseX, mouseY) {
		const actionEntity = this.queries.actionStatus.results[0];
		const actionStatus = actionEntity.getMutableComponent(ActionStatus);
		const selectPosition = actionEntity.getMutableComponent(SelectPosition);
		const attackPosition = actionEntity.getMutableComponent(AttackPosition);

		const tilePos = cubeToPixel(selectPosition.x, selectPosition.z, 50);
		const cancelPos = { x: tilePos.x, y: tilePos.y - 75 };
		const mouseTilePos = {};

		const selectedUnit = this.getSelectedUnit();
		const range = selectedUnit.getComponent(Range).value;
		const unitPos = selectedUnit.getMutableComponent(MapPosition);

		const control = this.queries.control.results[0];
		const block = control.getMutableComponent(Block);

		this.queries.tiles.results.forEach((entity) => {
			let tile = entity.getMutableComponent(Tile);
			let tileMapPos = entity.getMutableComponent(MapPosition);
			let canvasPos = cubeToPixel(tileMapPos.x, tileMapPos.z, tile.size);

			if (isInsideHexagon(canvasPos.x, canvasPos.y, mouseX, mouseY, tile.size)) {
				mouseTilePos.x = tileMapPos.x;
				mouseTilePos.y = tileMapPos.y;
				mouseTilePos.z = tileMapPos.z;
			}
		});

		if (isInsideCircle(cancelPos.x, cancelPos.y, mouseX, mouseY, 20)) {
			actionStatus.action = ActionType.NOT_SELECTED;
		} else if (cube_distance(selectPosition, mouseTilePos) <= range) {
			attackPosition.x = mouseTilePos.x;
			attackPosition.y = mouseTilePos.y;
			attackPosition.z = mouseTilePos.z;

			// Temp
			// unitPos.x = mouseTilePos.x;
			// unitPos.y = mouseTilePos.y;
			// unitPos.z = mouseTilePos.z;
			block.value = true;
		} else {
			this.checkSelect(mouseX, mouseY);
		}
	}

	checkMovement(mouseX, mouseY) {
		const actionEntity = this.queries.actionStatus.results[0];
		const actionStatus = actionEntity.getMutableComponent(ActionStatus);
		const selectPosition = actionEntity.getMutableComponent(SelectPosition);
		const movePosition = actionEntity.getMutableComponent(MovePosition);

		const tilePos = cubeToPixel(selectPosition.x, selectPosition.z, 50);
		const cancelPos = { x: tilePos.x, y: tilePos.y - 75 };
		const mouseTilePos = {};

		const selectedUnit = this.getSelectedUnit();
		const speed = selectedUnit.getComponent(Speed).value;
		const unitPos = selectedUnit.getMutableComponent(MapPosition);

		this.queries.tiles.results.forEach((entity) => {
			let tile = entity.getMutableComponent(Tile);
			let tileMapPos = entity.getMutableComponent(MapPosition);

			let canvasPos = cubeToPixel(tileMapPos.x, tileMapPos.z, tile.size);

			if (isInsideHexagon(canvasPos.x, canvasPos.y, mouseX, mouseY, tile.size)) {
				mouseTilePos.x = tileMapPos.x;
				mouseTilePos.y = tileMapPos.y;
				mouseTilePos.z = tileMapPos.z;
			}
		});

		if (isInsideCircle(cancelPos.x, cancelPos.y, mouseX, mouseY, 20)) {
			actionStatus.action = ActionType.NOT_SELECTED;
		} else if (cube_distance(selectPosition, mouseTilePos) <= speed) {
			movePosition.x = mouseTilePos.x;
			movePosition.y = mouseTilePos.y;
			movePosition.z = mouseTilePos.z;

			unitPos.x = mouseTilePos.x;
			unitPos.y = mouseTilePos.y;
			unitPos.z = mouseTilePos.z;
			actionStatus.action = ActionType.NOT_SELECTED;
		} else {
			this.checkSelect(mouseX, mouseY);
		}
	}

	getObjectOnTile(x, z) {
		let object = {};

		this.queries.tiles.results.some((entity) => {
			const tilePos = entity.getComponent(MapPosition);

			if (x === tilePos.x && z === tilePos.z) {
				object = entity;
				return true;
			}

			return false;
		});

		this.queries.units.results.some((entity) => {
			const mapPos = entity.getComponent(MapPosition);

			if (x === mapPos.x && z === mapPos.z) {
				object = entity;
				return true;
			}

			return false;
		});

		this.queries.building.results.some((entity) => {
			const mapPos = entity.getComponent(MapPosition);

			if (x === mapPos.x && z === mapPos.z) {
				object = entity;
				return true;
			}

			return false;
		});

		return object;
	}

	getSelectedUnit() {
		let selectedUnit = {};

		this.queries.units.results.some((entity) => {
			if (entity.hasComponent(SelectedUnit)) {
				selectedUnit = entity;
				return true;
			}

			return false;
		});

		return selectedUnit;
	}

	removeSelect() {
		this.queries.tiles.results.forEach((entity) => {
			if (entity.hasComponent(SelectedTile)) {
				entity.removeComponent(SelectedTile);
			}
		});

		this.queries.units.results.forEach((entity) => {
			if (entity.hasComponent(SelectedUnit)) {
				entity.removeComponent(SelectedUnit);
			}
		});

		this.queries.building.results.forEach((entity) => {
			if (entity.hasComponent(SelectedBuilding)) {
				entity.removeComponent(SelectedBuilding);
			}
		});
	}
}

// Define a query of entities
ActionSystem.queries = {
	screenStatus: {
		components: [ScreenStatus],
	},
	actionStatus: {
		components: [ActionStatus, MovePosition, AttackPosition, SelectPosition],
	},
	control: {
		components: [Block, Timer],
	},
	hud: {
		components: [Hud],
	},
	tiles: {
		components: [Tile, MapPosition, Object],
	},
	units: {
		components: [Unit, MapPosition, Object],
	},
	building: {
		components: [Building, MapPosition, Object],
	},
};
