import { System } from '../../Library/Ecsy';
import { MouseStatus, ScreenStatus } from '../../Component';
import { applyTransformation } from '../../Util';

/**
 * Store mouse event data to entity
 */
export class MouseHandlerSystem extends System {
	execute(delta, time) {
		const mouseStatus = this.queries.mouseStatus.results[0].getMutableComponent(MouseStatus);
	}
}

// Define a query of entities
MouseListenerSystem.queries = {
	mouseStatus: {
		components: [MouseStatus]
	},
	screenStatus: {
		components: [ScreenStatus]
	}
};
