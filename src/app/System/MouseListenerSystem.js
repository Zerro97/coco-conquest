import { System } from '../Library/Ecsy';
import { Tile, Unit, Building, Hud } from '../Component';
import { hexToCanvas, isInsideHexagon } from '../Util';

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

		// Stopping this system once listener is registered
		// Init doesn't work since other components are not yet registered
		this.stop();
	}

	checkTiles(mouseX, mouseY, type) {
		this.queries.tiles.results.forEach(entity => {
			let tile = entity.getMutableComponent(Tile);

			let canvasPos = hexToCanvas(tile.x, tile.y, tile.size);

			if(isInsideHexagon(canvasPos.x, canvasPos.y, mouseX, mouseY, tile.size)){
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