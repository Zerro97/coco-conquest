import { System } from 'ecsy';
import { Velocity, Position } from '../Component';

export class MovableSystem extends System {
	// This method will get called on every frame by default
	execute(delta, time) {
		// Iterate through all the entities on the query
		this.queries.moving.results.forEach(entity => {
			var velocity = entity.getComponent(Velocity);
			var position = entity.getMutableComponent(Position);
			position.x += velocity.x * delta;
			position.y += velocity.y * delta;
		});
	}

	outOfCanvas(position) {

	}
}

// Define a query of entities that have "Velocity" and "Position" components
MovableSystem.queries = {
	moving: {
		components: [Velocity, Position]
	}
};