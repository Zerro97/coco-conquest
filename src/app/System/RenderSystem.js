import { System } from '../Library/Ecsy';
import { 
	Unit, 
	Image,
	Health, 
	Damage, 
	Sight,
	Range,
	Speed,
	MapPosition,
	ScreenStatus,
	ActionStatus,
	Tile 
} from '../Component';
import { drawBaseTile, drawHoveringTile, drawSelectedTile, hexToCanvas } from '../Util';

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
		this.drawSelectOption();

		this.ctx.restore();

		this.drawHud();
	}

	// Clear canvas screen
	clearCanvas() {
		this.ctx.fillStyle = '#222222';
		this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
	}

	drawTiles() {
		const screenStatus = this.queries.screenStatus.results[0].getComponent(ScreenStatus);

		this.queries.tiles.results.forEach(entity => {
			let tile = entity.getMutableComponent(Tile);
			let canvasPos = hexToCanvas(tile.x, tile.y, tile.size);

			switch(tile.status){
			case 'hover':
				drawHoveringTile(this.ctx, canvasPos.x, canvasPos.y);
				break;
			case 'selected':
				drawSelectedTile(this.ctx, canvasPos.x, canvasPos.y);
				break;
			default:
				drawBaseTile(this.ctx, canvasPos.x, canvasPos.y);
				break;
			}
		});
	}
        
	drawBuildings() {
		
	}

	drawUnits() {
		const images = [];
		this.queries.images.results.forEach(entity => {
			images.push(entity.getMutableComponent(Image).value);
		});

		this.queries.units.results.forEach(entity => {
			let type = entity.getComponent(Unit).value;
			let image = images[type];

			let mapPos = entity.getComponent(MapPosition);
			let canvasPos = hexToCanvas(mapPos.x, mapPos.y, 50);

			this.ctx.save();
			this.ctx.beginPath();
			this.ctx.arc(canvasPos.x, canvasPos.y, 30, 0, Math.PI*2, true);   
			this.ctx.closePath();
			this.ctx.clip();
			
			this.ctx.drawImage(image, canvasPos.x - 30, canvasPos.y - 30, 60, 60);

			this.ctx.restore();
		});
	}

	drawSelectOption() {
		const actionStatus = this.queries.actionStatus.results[0].getComponent(ActionStatus);
		//console.log(actionStatus);

		if(actionStatus.selectType !== -1) {
			let mapPos = { x: actionStatus.selectX, y: actionStatus.selectY };
			let canvasPos = hexToCanvas(mapPos.x, mapPos.y, 50);

			switch(actionStatus.selectType) {
			case 0:
				break;
			case 1:
				this.ctx.fillStyle = 'red';
				this.ctx.beginPath();
				this.ctx.arc(canvasPos.x -25, canvasPos.y - 65, 20, 0, Math.PI*2, true);   
				this.ctx.closePath();
				this.ctx.fill();

				this.ctx.fillStyle = 'blue';
				this.ctx.beginPath();
				this.ctx.arc(canvasPos.x + 25, canvasPos.y - 65, 20, 0, Math.PI*2, true);   
				this.ctx.closePath();
				this.ctx.fill();

				this.ctx.fillStyle = '#ffffff';
				this.ctx.beginPath();
				this.ctx.arc(canvasPos.x -25, canvasPos.y - 65, 17, 0, Math.PI*2, true);   
				this.ctx.closePath();
				this.ctx.fill();

				this.ctx.fillStyle = '#ffffff';
				this.ctx.beginPath();
				this.ctx.arc(canvasPos.x + 25, canvasPos.y - 65, 17, 0, Math.PI*2, true);   
				this.ctx.closePath();
				this.ctx.fill();
				break;
			case 2:
				break;
			}
		}
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
		components: [Unit, MapPosition, Health, Damage, Sight, Range, Speed]
	},
	images: {
		components: [Image]
	},
	tiles: {
		components: [Tile]
	},
	screenStatus: {
		components: [ScreenStatus]
	},
	actionStatus: {
		components: [ActionStatus]
	}
};