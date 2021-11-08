import { System } from '../../Library/Ecsy';
import { Velocity, CanvasPosition } from '../../Component';

export class MovementSystem extends System {
	// This method will get called on every frame by default
	execute(delta, time) {
		// Iterate through all the entities on the query
		this.queries.moving.results.forEach(entity => {
			var velocity = entity.getComponent(Velocity);
			var position = entity.getMutableComponent(CanvasPosition);
			position.x += velocity.x * delta;
			position.y += velocity.y * delta;
		});
	}
}

// Define a query of entities that have "Velocity" and "Position" components
MovementSystem.queries = {
	moving: {
		components: [Velocity, CanvasPosition]
	}
};