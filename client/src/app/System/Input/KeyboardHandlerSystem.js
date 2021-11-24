import { System } from "../../Library/Ecsy";
import { ScreenStatus } from "../../Component";

/**
 * Handles all the events that could happen when 
 * there is keyboard input
 */
export class KeyboardHandlerSystem extends System {
	// This method will get called on every frame by default
	execute(delta, time) {

	}
}

// Define a query of entities
KeyboardHandlerSystem.queries = {
	screenStatus: {
		components: [ScreenStatus]
	}
};