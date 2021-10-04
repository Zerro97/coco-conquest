import { System } from 'ecsy';
import { Tile, Unit, Building, Hud } from '../Component';

/**
 * Handles all the events that could happen when 
 * there is mouse input
 */
export class MouseListenerSystem extends System {
	// This method will get called on every frame by default
	execute(delta, time) {
		
	}
}

// Define a query of entities
MouseListenerSystem.queries = {
	hud: {
		components: [Hud]
	},
	tile: {
		components: [Tile]
	},
	unit: {
		components: [Unit]
	},
	building: {
		components: [Building]
	}
};