import { System } from '../Library/Ecsy';
import { 
	Unit, 
	UnitImage,
	IconImage,
	Image,
	Health, 
	Damage, 
	Sight,
	Range,
	Speed,
	Object,
	MapPosition,
	MovePosition, 
	AttackPosition, 
	SelectPosition,
	ScreenStatus,
	ActionStatus,
	Tile, 
	DamagePopup,
	Timer,
	CanvasPosition
} from '../Component';
import { 
	drawBaseTile, 
	drawHoveringTile, 
	drawSelectedTile, 
	drawAttackingTile,
	drawMovingTile,
	drawSelectIcon, 
	drawCancelIcon, 
	cubeToPixel, 
	tiles_in_range
} from '../Util';
import { ActionType, TileStatus } from '../Type';

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

		this.drawActionHud();
		this.drawDamagePopup();

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
			let tilePos = entity.getMutableComponent(MapPosition);
			let canvasPos = cubeToPixel(tilePos.x, tilePos.z, tile.size);

			switch(tile.status){
			case TileStatus.HOVER:
				drawHoveringTile(this.ctx, canvasPos.x, canvasPos.y);
				break;
			case TileStatus.SELECTED:
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
		const unitImages = [];
		this.queries.images.results.forEach(entity => {
			if(entity.hasComponent(UnitImage)) {
				unitImages.push({ 
					name: entity.getMutableComponent(Image).name,
					value: entity.getMutableComponent(Image).value
				});
			}
		});

		this.queries.units.results.forEach(entity => {
			let type = entity.getComponent(Unit).value;
			let image = unitImages.reduce((item, acc) => {
				if(item.name === `${type}.png`){
					return item;
				}
				return acc;
			});

			let mapPos = entity.getComponent(MapPosition);
			let canvasPos = cubeToPixel(mapPos.x, mapPos.z, 50);

			this.ctx.save();
			this.ctx.beginPath();
			this.ctx.arc(canvasPos.x, canvasPos.y, 30, 0, Math.PI*2, true);   
			this.ctx.closePath();
			this.ctx.clip();
			this.ctx.drawImage(image.value, canvasPos.x - 30, canvasPos.y - 30, 60, 60);
			this.ctx.restore();
		});
	}

	drawActionHud() {
		const actionStatus = this.queries.actionStatus.results[0].getComponent(ActionStatus);

		switch(actionStatus.action) {
		case ActionType.SELECTED:
			// 2) Draw unit's options
			this.drawOption();			
			break;
		case ActionType.ATTACK:
			// 3a) Draw attack hud
			this.drawAttack();
			break;
		case ActionType.MOVE:
			// 3b) Draw movement hud
			this.drawMove();
			break;
		}
	}

	drawOption() {
		const actionEntity = this.queries.actionStatus.results[0];
		const actionStatus = actionEntity.getMutableComponent(ActionStatus);
		const selectPosition = actionEntity.getMutableComponent(SelectPosition);

		const iconImages = [];
		this.queries.images.results.forEach(entity => {
			if(entity.hasComponent(IconImage)) {
				iconImages.push({ 
					name: entity.getMutableComponent(Image).name,
					value: entity.getMutableComponent(Image).value
				});
			}
		});

		let mapPos = { x: selectPosition.x, z: selectPosition.z };
		let canvasPos = cubeToPixel(mapPos.x, mapPos.z, 50);

		switch(actionStatus.selectType) {
		case 0:
			break;
		case 1:
			drawSelectIcon(this.ctx, canvasPos.x, canvasPos.y, iconImages[1].value, iconImages[0].value);
			break;
		case 2:
			break;
		}
	}

	drawAttack() {
		const actionEntity = this.queries.actionStatus.results[0];
		const selectPosition = actionEntity.getMutableComponent(SelectPosition);

		const selectedUnit = this.getSelectedUnit();
		const range = selectedUnit.getComponent(Range).value;

		let mapPos = { x: selectPosition.x, z: selectPosition.z };
		let canvasPos = cubeToPixel(mapPos.x, mapPos.z, 50);

		let tilesInRange = tiles_in_range({
			x: selectPosition.x, 
			y: selectPosition.y, 
			z: selectPosition.z
		}, range);

		tilesInRange.forEach(tile => {
			const pixelPos = cubeToPixel(tile.x, tile.z, 50);
			drawAttackingTile(this.ctx, pixelPos.x, pixelPos.y);
		});
		this.drawUnits();
		this.drawBuildings();

		// Draw Cancel Button
		drawCancelIcon(this.ctx, canvasPos.x, canvasPos.y);
	}

	drawMove() {
		const actionEntity = this.queries.actionStatus.results[0];
		const selectPosition = actionEntity.getMutableComponent(SelectPosition);

		const selectedUnit = this.getSelectedUnit();
		const speed = selectedUnit.getComponent(Speed).value;

		let mapPos = { x: selectPosition.x, z: selectPosition.z };
		let canvasPos = cubeToPixel(mapPos.x, mapPos.z, 50);

		let tilesInRange = tiles_in_range({
			x: selectPosition.x, 
			y: selectPosition.y, 
			z: selectPosition.z
		}, speed);

		tilesInRange.forEach(tile => {
			const pixelPos = cubeToPixel(tile.x, tile.z, 50);
			drawMovingTile(this.ctx, pixelPos.x, pixelPos.y);
		});
		this.drawUnits();
		this.drawBuildings();

		drawCancelIcon(this.ctx, canvasPos.x, canvasPos.y);
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

	drawDamagePopup(){
		this.queries.popup.results.forEach(entity => {
			const damage = entity.getComponent(DamagePopup);
			const timer = entity.getMutableComponent(Timer);
			const canvasPos = entity.getComponent(CanvasPosition);

			if(timer.curTime < timer.maxTime) {
				this.ctx.font = '20px Arial';
				this.ctx.fillStyle = 'red';
				this.ctx.textAlign = 'center';
				this.ctx.fillText('-' + damage.value, canvasPos.x, canvasPos.y - 50);

				timer.curTime += 1;
			} else {
				entity.remove();
			}
		});
	}

	getSelectedUnit() {
		const actionEntity = this.queries.actionStatus.results[0];
		const selectPosition = actionEntity.getMutableComponent(SelectPosition);

		let selectedUnit = {};
		this.queries.units.results.some(entity => {
			const mapPos = entity.getComponent(MapPosition);
			
			if(selectPosition.x === mapPos.x && 
				selectPosition.y === mapPos.y && 
				selectPosition.z === mapPos.z) {

				selectedUnit = entity;
				return true;
			}

			return false;
		});

		return selectedUnit;
	}
}

RenderSystem.queries = {
	tiles: {
		components: [Tile, MapPosition, Object]
	},
	units: { 
		components: [Unit, MapPosition, Object, Health, Damage, Sight, Range, Speed]
	},
	images: {
		components: [Image]
	},
	popup: { 
		components: [DamagePopup, Timer, MapPosition, CanvasPosition]
	},
	screenStatus: {
		components: [ScreenStatus]
	},
	actionStatus: {
		components: [ActionStatus, MovePosition, AttackPosition, SelectPosition]
	}
};