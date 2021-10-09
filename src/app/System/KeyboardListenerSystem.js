import { System } from '../Library/Ecsy';
import { Tile, Unit, Building, Hud, ScreenStatus } from '../Component';

/**
 * Handles all the events that could happen when 
 * there is keyboard input
 */
export class KeyboardListenerSystem extends System {
	// This method will get called on every frame by default
	execute(delta, time) {
		document.addEventListener('keydown', e => {
			this.handleTranslation(e.key);
		});

		// Stopping this system once listener is registered
		// Init doesn't work since other components are not yet registered
		this.stop();
	}

	handleTranslation(key) {
		const screenStatus = this.queries.screenStatus.results[0].getMutableComponent(ScreenStatus);

		switch(key) {
		case 'a':
			screenStatus.x -= 10;
			break;
		case 'd':
			screenStatus.x += 10;
			break;
		case 'w':
			screenStatus.y -= 10;
			break;
		case 's':
			screenStatus.y += 10;
			break;
		}
	}
}

// Define a query of entities
KeyboardListenerSystem.queries = {
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
	},
	screenStatus: {
		components: [ScreenStatus]
	}
};