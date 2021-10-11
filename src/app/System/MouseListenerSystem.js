import { System } from '../Library/Ecsy';
import { Tile, Unit, Building, MapPosition, Hud, ScreenStatus, ActionStatus } from '../Component';
import { evenrToPixel, cubeToPixel, isInsideHexagon, applyTransformation, isInsideCircle } from '../Util';
import { ActionType, SelectType, AttackType, MovementType, TileStatus } from '../Type';

/**
 * Handles all the events that could happen when 
 * there is mouse input
 */
export class MouseListenerSystem extends System {
	execute(delta, time) {
		// Store pointer events (used for pinch gesture in mobile)
		let evCache = new Array();
		let prevDiff = {value: -1};

		document.addEventListener('pointerdown', e => {
			evCache.push(e);

			//this.checkTiles(e.clientX, e.clientY, 'hover');
		});

		document.addEventListener('pointermove', e => {
			const screenStatus = this.queries.screenStatus.results[0].getMutableComponent(ScreenStatus);
			let translation = {x: screenStatus.x, y: screenStatus.y};
			let scale = {x: screenStatus.scaleX, y:screenStatus.scaleY};
			let mousePos = applyTransformation(e.clientX, e.clientY, translation, scale);

			this.checkPinchGesture(e, evCache, prevDiff);
			this.checkTiles(mousePos.x, mousePos.y, 'hover');
		});

		document.addEventListener('pointerup', e => {
			for (let i = 0; i < evCache.length; i++) {
				if (evCache[i].pointerId == e.pointerId) {
					evCache.splice(i, 1);
					break;
				}
			}
			// If the number of pointers down is less than two then reset diff tracker
			if (evCache.length < 2) prevDiff.value = -1;

			const screenStatus = this.queries.screenStatus.results[0].getMutableComponent(ScreenStatus);
			let translation = {x: screenStatus.x, y: screenStatus.y};
			let scale = {x: screenStatus.scaleX, y:screenStatus.scaleY};
			let mousePos = applyTransformation(e.clientX, e.clientY, translation, scale);

			this.updateAction(mousePos.x, mousePos.y, 'click');
			this.checkTiles(mousePos.x, mousePos.y, 'click');
		});

		window.addEventListener('wheel', e => { 
			// -1 for up, 1 for down
			let scrollDirection = parseInt(e.deltaY * 0.01);
			let scaleAmount = scrollDirection * 0.1;
			let screenStatus = this.queries.screenStatus.results[0].getMutableComponent(ScreenStatus);
			
			if(scrollDirection === -1 && screenStatus.scaleX > 0.5 && screenStatus.scaleY > 0.5) {
				screenStatus.scaleX += scaleAmount;
				screenStatus.scaleY += scaleAmount;
			} else if(scrollDirection === 1 && screenStatus.scaleX < 1.5  && screenStatus.scaleY < 1.5) {
				screenStatus.scaleX += scaleAmount;
				screenStatus.scaleY += scaleAmount;
			}
		});

		// Stopping this system once listener is registered
		// Init doesn't work since other components are not yet registered
		this.stop();
	}

	checkPinchGesture(e, evCache, prevDiff) {
		const screenStatus = this.queries.screenStatus.results[0].getMutableComponent(ScreenStatus);

		// Find this event in the cache and update its record with this event
		for (let i = 0; i < evCache.length; i++) {
			if (e.pointerId == evCache[i].pointerId) {
				evCache[i] = e;
				break;
			}
		}

		// If two pointers are down, check for pinch gestures
		if (evCache.length == 2) {
			// Calculate the distance between the two pointers
			let dx = evCache[0].clientX - evCache[1].clientX;
			let dy = evCache[0].clientY - evCache[1].clientY;
			let curDiff = Math.hypot(dx, dy);

			if (prevDiff.value > 0) {
				// The distance between the two pointers has increased
				if (curDiff > prevDiff.value && screenStatus.scaleX < 1.5 && screenStatus.scaleY < 1.5) {
					screenStatus.scaleX += 0.1;
					screenStatus.scaleY += 0.1;
				}
				// The distance between the two pointers has decreased
				if (curDiff < prevDiff.value && screenStatus.scaleX > 0.5 && screenStatus.scaleY > 0.5) {
					screenStatus.scaleX -= 0.1;
					screenStatus.scaleY -= 0.1;
				}
			}

			// Cache the distance for the next move event
			prevDiff.value = curDiff;
		}
	}

	checkTiles(mouseX, mouseY, type) {
		const actionStatus = this.queries.actionStatus.results[0].getMutableComponent(ActionStatus);

		this.queries.tiles.results.forEach(entity => {
			let tile = entity.getMutableComponent(Tile);
			let canvasPos = cubeToPixel(tile.x, tile.z, tile.size);

			if(isInsideHexagon(canvasPos.x, canvasPos.y, mouseX, mouseY, tile.size)){
				if(type === 'hover' && tile.status != TileStatus.SELECTED) {
					tile.status = TileStatus.HOVER;
				} else if(type === 'click') {
					tile.status = TileStatus.SELECTED;
				}
			} else {
				if(type === 'click' && tile.status === TileStatus.SELECTED){
					tile.status = TileStatus.SEEN;
				}
				tile.status = tile.status != TileStatus.SELECTED ? TileStatus.SEEN : TileStatus.SELECTED;
			}
		});
	}

	updateAction(mouseX, mouseY) {
		const actionStatus = this.queries.actionStatus.results[0].getMutableComponent(ActionStatus);
		console.log('BEFORE: ', actionStatus);

		switch(actionStatus.action) {
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

		console.log('AFTER: ', actionStatus);
	}

	checkSelect(mouseX, mouseY) {
		const actionStatus = this.queries.actionStatus.results[0].getMutableComponent(ActionStatus);

		this.queries.tiles.results.forEach(entity => {
			let tile = entity.getMutableComponent(Tile);
			let canvasPos = cubeToPixel(tile.x, tile.z, tile.size);

			if(isInsideHexagon(canvasPos.x, canvasPos.y, mouseX, mouseY, tile.size)){
				actionStatus.action = ActionType.SELECTED;
				actionStatus.selectType = this.checkObjectTypeOnTile(tile.x, tile.z);
				actionStatus.selectX = tile.x;
				actionStatus.selectZ = tile.z;
			}
		});
	}

	checkOption(mouseX, mouseY) {
		const actionStatus = this.queries.actionStatus.results[0].getMutableComponent(ActionStatus);

		const tilePos = cubeToPixel(actionStatus.selectX, actionStatus.selectZ, 50);
		const attackPos = {x: tilePos.x - 25, y: tilePos.y - 65};
		const movementPos = {x: tilePos.x + 25, y: tilePos.y - 65};

		if(isInsideCircle(attackPos.x, attackPos.y, mouseX, mouseY, 20)) {
			actionStatus.action = ActionType.ATTACK;
			actionStatus.attackType = AttackType.SIMPLE;
		} else if(isInsideCircle(movementPos.x, movementPos.y, mouseX, mouseY, 20)) {
			actionStatus.action = ActionType.MOVE;
			actionStatus.movementType = MovementType.SIMPLE;
		} else {
			this.checkSelect(mouseX, mouseY);
		}
	}

	checkAttack(mouseX, mouseY) {
		const actionStatus = this.queries.actionStatus.results[0].getMutableComponent(ActionStatus);
		
		const tilePos = cubeToPixel(actionStatus.selectX, actionStatus.selectZ, 50);
		const cancelPos = {x: tilePos.x, y: tilePos.y - 75};
		
		if(isInsideCircle(cancelPos.x, cancelPos.y, mouseX, mouseY, 20)) {
			actionStatus.action = ActionType.NOT_SELECTED;
		} else {
			this.checkSelect(mouseX, mouseY);
		}
	}

	checkMovement(mouseX, mouseY) {
		const actionStatus = this.queries.actionStatus.results[0].getMutableComponent(ActionStatus);
		
		const tilePos = cubeToPixel(actionStatus.selectX, actionStatus.selectZ, 50);
		const cancelPos = {x: tilePos.x, y: tilePos.y - 75};
		console.log(actionStatus);
		
		if(isInsideCircle(cancelPos.x, cancelPos.y, mouseX, mouseY, 20)) {
			actionStatus.action = ActionType.NOT_SELECTED;
		} else {
			this.checkSelect(mouseX, mouseY);
		}
	}

	checkObjectTypeOnTile(x, z) {
		let objectType = 0;

		this.queries.unit.results.some(entity => {
			const mapPos = entity.getComponent(MapPosition);
			
			if(x === mapPos.x && z === mapPos.z) {
				objectType = SelectType.UNIT;
				return true;
			}

			return false;
		});

		this.queries.building.results.some(entity => {
			const mapPos = entity.getComponent(MapPosition);

			if(x === mapPos.x && z === mapPos.z) {
				objectType = SelectType.BUILDING;
				return true;
			}

			return false;
		});

		return objectType;
	}
}

// Define a query of entities
MouseListenerSystem.queries = {
	screenStatus: {
		components: [ScreenStatus]
	},
	actionStatus: {
		components: [ActionStatus]
	},
	hud: {
		components: [Hud]
	},
	tiles: {
		components: [Tile]
	},
	unit: {
		components: [Unit, MapPosition]
	},
	building: {
		components: [Building, MapPosition]
	}
};