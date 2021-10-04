import { System } from '../Library/Ecsy';
import { Shape, Position, Renderable } from '../Component';

/**
 * Handles all the drawing
 */
export class RenderSystem extends System {
	// This method will get called on every frame by default
	execute(delta, time) {
		this.clearCanvas();

		// Iterate through all the entities on the query
		this.queries.renderables.results.forEach(entity => {
			var shape = entity.getComponent(Shape);
			var position = entity.getComponent(Position);

			this.draw(shape.primitive, position);
		});
	}

	// Clear canvas screen
	clearCanvas() {
		this.ctx.fillStyle = '#d4d4d4';
		this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
	}
        
	draw(shape, position) {
		switch(shape) {
		case 'box':
			this.ctx.beginPath();
			this.ctx.rect(position.x - 25, position.y - 25, 50, 50);
			this.ctx.fillStyle= '#e2736e';
			this.ctx.fill();
			this.ctx.lineWidth = 2;
			this.ctx.strokeStyle = '#b74843';
			this.ctx.stroke();
			break;
		}
	}
}

// Define a query of entities that have "Renderable" and "Shape" components
RenderSystem.queries = {
	renderables: { 
		components: [Renderable, Shape]
	}
};