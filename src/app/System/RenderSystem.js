import { System } from '../Library/Ecsy';
import { Renderable, Tile } from '../Component';

/**
 * Handles all the drawing
 */
export class RenderSystem extends System {
	// This method will get called on every frame by default
	execute(delta, time) {
		this.clearCanvas();
		this.drawTiles();
	}

	// Clear canvas screen
	clearCanvas() {
		this.ctx.fillStyle = '#222222';
		this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
	}

	drawTiles() {
		this.queries.tiles.results.forEach(entity => {	
			let tile = entity.getMutableComponent(Tile);

			let canvasX = tile.x * Math.sqrt(3) * tile.size;
			let canvasY = tile.y * 3/2 * tile.size;

			if(tile.y % 2 === 0) {
				canvasX += Math.sqrt(3) * tile.size/2;
			}

			this.drawHexagon(canvasX, canvasY, tile.size);
		});

		this.stop();
	}

	drawHexagon(x, y, r) {
		const angle = 2 * Math.PI / 6; // 60 degree

		this.ctx.beginPath();
		this.ctx.strokeStyle = '#444444';
		for (var i = 0; i < 6; i++) {
			this.ctx.lineTo(x + r * Math.sin(angle * i), y + r * Math.cos(angle * i));
		}
		this.ctx.closePath();
		this.ctx.stroke();
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
		components: [Renderable]
	},
	tiles: {
		components: [Tile]
	}
};