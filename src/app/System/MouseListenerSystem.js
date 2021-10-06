import { System } from '../Library/Ecsy';
import { Tile, Unit, Building, Hud, ScreenStatus } from '../Component';
import { hexToCanvas, isInsideHexagon, applyTransformation } from '../Util';

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

			this.checkTiles(e.clientX, e.clientY, 'hover');
		});

		document.addEventListener('pointermove', e => {
			this.checkPinchGesture(e, evCache, prevDiff);
			this.checkTiles(e.clientX, e.clientY, 'hover');
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

			this.checkTiles(e.clientX, e.clientY, 'click');
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
		const screenStatus = this.queries.screenStatus.results[0].getMutableComponent(ScreenStatus);

		this.queries.tiles.results.forEach(entity => {
			let tile = entity.getMutableComponent(Tile);

			let canvasPos = hexToCanvas(tile.x, tile.y, tile.size);
			let translation = {x: screenStatus.x, y: screenStatus.y};
			let scale = {x: screenStatus.scaleX, y:screenStatus.scaleY};
			let mousePos = applyTransformation(mouseX, mouseY, translation, scale);
			
			if(isInsideHexagon(canvasPos.x, canvasPos.y, mousePos.x, mousePos.y, tile.size)){
				if(type === 'hover' && tile.status != 'selected') {
					tile.status = 'hover';
				} else if(type === 'click') {
					tile.status = 'selected';
				}
			} else {
				tile.status = tile.status != 'selected' ? 'seen' : 'selected';
			}
		});
	}


}

// Define a query of entities
MouseListenerSystem.queries = {
	screenStatus: {
		components: [ScreenStatus]
	},
	hud: {
		components: [Hud]
	},
	tiles: {
		components: [Tile]
	},
	unit: {
		components: [Unit]
	},
	building: {
		components: [Building]
	}
};