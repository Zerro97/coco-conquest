import { System } from '../Library/Ecsy';
import { Renderable, Tile } from '../Component';
import { roundRect, drawPause, drawHp } from '../Util';

/**
 * Handles all the drawing
 */
export class RenderSystem extends System {
	// This method will get called on every frame by default
	execute(delta, time) {
		this.clearCanvas();

		// Drawing order matters
		this.drawTiles();
		this.drawBuildings();
		this.drawUnits();
		this.drawHud();
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
        
	drawBuildings() {
		
	}

	drawUnits() {

	}

	drawHud() {
		// Pause Button
		this.ctx.fillStyle = 'rgb(210, 210, 210)';
		this.ctx.fillRect(40, 40, 10, 50);
		this.ctx.fillRect(60, 40, 10, 50);

		// Top right panel
		this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
		this.ctx.lineWidth = 5;
		this.ctx.strokeStyle = 'rgb(100, 100, 100)';
		roundRect(this.ctx, this.canvasWidth - 350, 0, 350, 120, {bl: 20}, true, true);
		
		// Circle		
		this.ctx.fillStyle = 'rgb(150, 150, 150)';
		this.ctx.lineWidth = 5;
		this.ctx.strokeStyle = 'rgb(100, 100, 100)';
		this.ctx.beginPath();
		this.ctx.arc(this.canvasWidth - 285, 60, 50, 0, 2 * Math.PI);
		this.ctx.fill();
		this.ctx.stroke();

		// HP
		for(let i=0; i<15; i++) {
			this.ctx.fillStyle = '#eb4034';
			this.ctx.lineWidth = 1;
			this.ctx.strokeStyle = 'white';
			this.ctx.rect(this.canvasWidth - 200 + i*10, 30, 7, 25);
			this.ctx.fill();
			this.ctx.stroke();
		}

		this.stop();		
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