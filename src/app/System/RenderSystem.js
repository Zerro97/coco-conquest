import { System } from '../Library/Ecsy';
import { 
	Unit, 
	Health, 
	Damage, 
	Sight,
	Range,
	Speed,
	ScreenStatus, 
	Tile 
} from '../Component';
import { drawHexagon, drawHoveredHexagon, drawSelectedHexagon, hexToCanvas } from '../Util';

/**
 * Handles all the drawing
 */
export class RenderSystem extends System {
	// This method will get called on every frame by default
	execute(delta, time) {
		const screenStatus = this.queries.screenStatus.results[0].getComponent(ScreenStatus);

		this.clearCanvas();

		this.ctx.save();

		// Applying coordinate transformation according to screenStatus
		// Currently no intention of applying rotate transformation
		this.ctx.translate(-screenStatus.x, -screenStatus.y);
		this.ctx.scale(screenStatus.scaleX, screenStatus.scaleY);
		this.ctx.rotate(screenStatus.rotate);
		
		// Drawing order matters
		this.drawTiles();
		this.drawBuildings();
		this.drawUnits();

		this.ctx.restore();

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
			let canvasPos = hexToCanvas(tile.x, tile.y, tile.size);

			switch(tile.status){
			case 'hover':
				drawHoveredHexagon(this.ctx, canvasPos.x, canvasPos.y, tile.size);
				break;
			case 'selected':
				drawSelectedHexagon(this.ctx, canvasPos.x, canvasPos.y, tile.size);
				break;
			default:
				drawHexagon(this.ctx, canvasPos.x, canvasPos.y, tile.size);
				break;
			}
		});
	}
        
	drawBuildings() {
		
	}

	drawUnits() {
		this.queries.units.results.forEach(entity => {
			
		});
	}

	drawHud() {
		// Pause Button
		this.ctx.fillStyle = 'rgb(210, 210, 210)';
		this.ctx.fillRect(40, 40, 10, 50);
		this.ctx.fillRect(60, 40, 10, 50);

		// Top right panel
		/*
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

		this.stop();*/
	}
}

RenderSystem.queries = {
	units: { 
		components: [Unit]
	},
	tiles: {
		components: [Tile]
	},
	screenStatus: {
		components: [ScreenStatus]
	}
};