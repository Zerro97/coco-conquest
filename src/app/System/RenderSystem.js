import { System } from '../Library/Ecsy';
import { CanvasContext, Shape, Position, Renderable } from '../Component';

/**
 * Handles all the drawing
 */
export class RenderSystem extends System {
	// This method will get called on every frame by default
	execute(delta, time) {
		let context = this.queries.context.results[0];
		let canvasComponent = context.getComponent(CanvasContext);

		let ctx = canvasComponent.ctx;
		let canvasWidth = canvasComponent.width;
		let canvasHeight = canvasComponent.height;

		this.clearCanvas(ctx, canvasWidth, canvasHeight);
          
		// Iterate through all the entities on the query
		this.queries.renderables.results.forEach(entity => {
			var shape = entity.getComponent(Shape);
			var position = entity.getComponent(Position);

			this.draw(shape.primitive, position);
		});
	}

	// Clear canvas screen
	clearCanvas(ctx, canvasWidth, canvasHeight) {
		ctx.fillStyle = '#d4d4d4';
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	}
        
	draw(shape, position) {
		let context = this.queries.context.results[0];
		let ctx = context.getComponent(CanvasContext).ctx;

		switch(shape) {
		case 'box':
			ctx.beginPath();
			ctx.rect(position.x - 25, position.y - 25, 50, 50);
			ctx.fillStyle= '#e2736e';
			ctx.fill();
			ctx.lineWidth = 2;
			ctx.strokeStyle = '#b74843';
			ctx.stroke();
			break;
		}
	}
}

// Define a query of entities that have "Renderable" and "Shape" components
RenderSystem.queries = {
	context: { 
		components: [CanvasContext], 
		mandatory: true 
	},
	renderables: { 
		components: [Renderable, Shape]
	}
};