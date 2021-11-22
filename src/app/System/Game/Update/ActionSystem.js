import { System } from "../../../Library/Ecsy";
import {
	Hud,
	Tile,
	Block,
	Timer,
	Range,
	Speed,
	Unit,
	Building,
	GameObject,
	CurrentSelect,
	MapPosition,
	CanvasPosition,
	ScreenStatus,
	MouseStatus,
	ActionStatus,
	MovePosition,
	AttackPosition,
	SelectPosition
} from "../../../Component";
import {
	cubeDistance,
	cubeToPixel,
	isInsideHexagon,
	applyTransformation,
	isInsideCircle,
} from "../../../Util";
import {
	ActionType,
	GameObjectType,
	AttackType,
	MovementType,
	TileStatus,
  TileSize,
} from "../../../Type";

/**
 * Handles all the events that could happen when
 * there is mouse input
 */
export class ActionSystem extends System {
	execute(delta, time) {
		const mouseStatus = this.queries.mouseStatus.results[0].getMutableComponent(MouseStatus);
		this.updateAction(mouseStatus.x, mouseStatus.y);
	}

	updateAction(mouseX, mouseY) {
		const actionStatus = this.queries.actionStatus.results[0].getMutableComponent(ActionStatus);

		const control = this.queries.control.results[0];
		const block = control.getComponent(Block);

		if (!block.value) {
			switch (actionStatus.action) {
			case ActionType.NOT_SELECTED:
				break;
			case ActionType.SELECTED:
				// 1) Check which option player selected
				this.checkOption(mouseX, mouseY);
				break;
			case ActionType.ATTACK:
				// 2a) If the player is attacking
				//this.checkAttack(mouseX, mouseY);
				break;
			case ActionType.MOVE:
				// 2b) If the player is moving
				//this.checkMovement(mouseX, mouseY);
				break;
			}
		}
	}

	checkOption(mouseX, mouseY) {
		const currentTile = this.queries.selectedTile.results[0];
		// TODO: mapPos and unit map pos is different for some reason!
		const mapPos = currentTile.getMutableComponent(MapPosition);
		const canvasPos = currentTile.getMutableComponent(CanvasPosition);
		const selectedObject = this.getObjectOnTile(mapPos.x, mapPos.z);

		if(Object.keys(selectedObject).length !== 0) {
			const selectedType = selectedObject.getComponent(GameObject).value;

			const actionStatus = this.queries.actionStatus.results[0].getMutableComponent(ActionStatus);

			const attackPos = { x: canvasPos.x - 25, y: canvasPos.y - 65 };
			const movementPos = { x: canvasPos.x + 25, y: canvasPos.y - 65 };

			switch(selectedType) {
				case GameObjectType.TILE:
					
					break;
				case GameObjectType.BUILDING:
					break;
				case GameObjectType.UNIT:
					if (isInsideCircle(attackPos.x, attackPos.y, mouseX, mouseY, 20)) {
						actionStatus.action = ActionType.ATTACK;
						actionStatus.attackType = AttackType.SIMPLE;
					} else if (isInsideCircle(movementPos.x, movementPos.y, mouseX, mouseY, 20)) {
						actionStatus.action = ActionType.MOVE;
						actionStatus.movementType = MovementType.SIMPLE;
					}

					break;
			}
		}
	}

	// checkAttack(mouseX, mouseY) {
	// 	const actionEntity = this.queries.actionStatus.results[0];
	// 	const actionStatus = actionEntity.getMutableComponent(ActionStatus);
	// 	const selectPosition = actionEntity.getMutableComponent(SelectPosition);
	// 	const attackPosition = actionEntity.getMutableComponent(AttackPosition);

	// 	const tilePos = cubeToPixel(selectPosition.x, selectPosition.z, TileSize.REGULAR);
	// 	const cancelPos = { x: tilePos.x, y: tilePos.y - 75 };
	// 	const mouseTilePos = {};

	// 	const selectedUnit = this.getSelectedUnit();
	// 	const range = selectedUnit.getComponent(Range).value;
	// 	const unitPos = selectedUnit.getMutableComponent(MapPosition);

	// 	const control = this.queries.control.results[0];
	// 	const block = control.getMutableComponent(Block);

	// 	this.queries.tiles.results.forEach((entity) => {
	// 		let tile = entity.getMutableComponent(Tile);
	// 		let tileMapPos = entity.getMutableComponent(MapPosition);
	// 		let canvasPos = cubeToPixel(tileMapPos.x, tileMapPos.z, tile.size);

	// 		if (isInsideHexagon(canvasPos.x, canvasPos.y, mouseX, mouseY, tile.size)) {
	// 			mouseTilePos.x = tileMapPos.x;
	// 			mouseTilePos.y = tileMapPos.y;
	// 			mouseTilePos.z = tileMapPos.z;
	// 		}
	// 	});

	// 	if (isInsideCircle(cancelPos.x, cancelPos.y, mouseX, mouseY, 20)) {
	// 		actionStatus.action = ActionType.NOT_SELECTED;
	// 	} else if (cubeDistance(selectPosition, mouseTilePos) <= range) {
	// 		attackPosition.x = mouseTilePos.x;
	// 		attackPosition.y = mouseTilePos.y;
	// 		attackPosition.z = mouseTilePos.z;

	// 		// Temp
	// 		// unitPos.x = mouseTilePos.x;
	// 		// unitPos.y = mouseTilePos.y;
	// 		// unitPos.z = mouseTilePos.z;
	// 		block.value = true;
	// 	} else {
	// 		this.checkSelect(mouseX, mouseY);
	// 	}
	// }

	// checkMovement(mouseX, mouseY) {
	// 	const actionEntity = this.queries.actionStatus.results[0];
	// 	const actionStatus = actionEntity.getMutableComponent(ActionStatus);
	// 	const selectPosition = actionEntity.getMutableComponent(SelectPosition);
	// 	const movePosition = actionEntity.getMutableComponent(MovePosition);

	// 	const tilePos = cubeToPixel(selectPosition.x, selectPosition.z, TileSize.REGULAR);
	// 	const cancelPos = { x: tilePos.x, y: tilePos.y - 75 };
	// 	const mouseTilePos = {};

	// 	const selectedUnit = this.getSelectedUnit();
	// 	const speed = selectedUnit.getComponent(Speed).value;
	// 	const unitPos = selectedUnit.getMutableComponent(MapPosition);

	// 	this.queries.tiles.results.forEach((entity) => {
	// 		let tile = entity.getMutableComponent(Tile);
	// 		let tileMapPos = entity.getMutableComponent(MapPosition);

	// 		let canvasPos = cubeToPixel(tileMapPos.x, tileMapPos.z, tile.size);

	// 		if (isInsideHexagon(canvasPos.x, canvasPos.y, mouseX, mouseY, tile.size)) {
	// 			mouseTilePos.x = tileMapPos.x;
	// 			mouseTilePos.y = tileMapPos.y;
	// 			mouseTilePos.z = tileMapPos.z;
	// 		}
	// 	});

	// 	if (isInsideCircle(cancelPos.x, cancelPos.y, mouseX, mouseY, 20)) {
	// 		actionStatus.action = ActionType.NOT_SELECTED;
	// 	} else if (cubeDistance(selectPosition, mouseTilePos) <= speed) {
	// 		movePosition.x = mouseTilePos.x;
	// 		movePosition.y = mouseTilePos.y;
	// 		movePosition.z = mouseTilePos.z;

	// 		unitPos.x = mouseTilePos.x;
	// 		unitPos.y = mouseTilePos.y;
	// 		unitPos.z = mouseTilePos.z;
	// 		actionStatus.action = ActionType.NOT_SELECTED;
	// 	} else {
	// 		this.checkSelect(mouseX, mouseY);
	// 	}
	// }

	getObjectOnTile(x, z) {
		let object = {};

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
}

// Define a query of entities
ActionSystem.queries = {
	screenStatus: {
		components: [ScreenStatus],
	},
	actionStatus: {
		components: [ActionStatus, MovePosition, AttackPosition, SelectPosition],
	},
	mouseStatus: {
		components: [MouseStatus]
	},
	selectedTile: {
		components: [CurrentSelect, Tile, MapPosition]
	},
	selectedUnit: {
		components: [CurrentSelect, Unit, MapPosition]
	},
	selectedBuildingTile: {
		components: [CurrentSelect, Building, MapPosition]
	},
	tiles: {
		components: [Tile, MapPosition, GameObject],
	},
	units: {
		components: [Unit, MapPosition, GameObject],
	},
	building: {
		components: [Building, MapPosition, GameObject],
	},
	control: {
		components: [Block, Timer],
	},
	hud: {
		components: [Hud],
	}
};
