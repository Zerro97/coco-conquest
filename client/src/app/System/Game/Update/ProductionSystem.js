import { System } from "../../../Library/Ecsy";
import { Velocity, CanvasPosition } from "../../../Component";

export class ProductionSystem extends System {
	// This method will get called on every frame by default
	execute(delta, time) {
		
	}
}

// Define a query of entities that have "Velocity" and "Position" components
ProductionSystem.queries = {
	productions: {
		components: [Velocity, CanvasPosition]
	}
};