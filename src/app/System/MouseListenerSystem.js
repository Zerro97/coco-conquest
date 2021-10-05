import { System } from '../Library/Ecsy';
import { Tile, Unit, Building, Hud, ScreenStatus } from '../Component';
import { hexToCanvas, isInsideHexagon, applyTransformation } from '../Util';

/**
 * Handles all the events that could happen when 
 * there is mouse input
 */
export class MouseListenerSystem extends System {
	execute(delta, time) {
		document.addEventListener('mousemove', e => {
			e.preventDefault();
			e.stopPropagation();

			this.checkTiles(e.clientX, e.clientY, 'hover');
		});

		document.addEventListener('click', e => {
			e.preventDefault();
			e.stopPropagation();

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