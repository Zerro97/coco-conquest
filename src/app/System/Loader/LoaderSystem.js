import { System } from "../../Library/Ecsy";
import { 
	Image, 
	UnitImage, 
	BuildingImage,
	IconImage, 
	TileImage,
	BackgroundImage,
	ScreenStatus, 
	Region,
	Tile,
	MapPosition
} from "../../Component";
import { cubeToEvenr, evenrToPixel } from "../../Util";
import { TileSize } from "../../Type";

export class LoaderSystem extends System {
	execute(delta, time) {
		this.loadImages();
		this.setInitialPosition();
		this.assignRegion(8);

		this.stop();
	}

	loadImages() {
		let counter = {
			icon: 0,
			tile: 0,
			unit: 0,
			building: 0,
			background: 0
		};

		let iconKeys = Object.keys(this.iconImages);
		let tileKeys = Object.keys(this.tileImages);
		let unitKeys = Object.keys(this.unitImages);
		let buildingKeys = Object.keys(this.buildingImages);
		let backgroundKeys = Object.keys(this.backgroundImages);
		
		this.queries.images.results.forEach(entity => {
			var image = entity.getMutableComponent(Image);

			if(entity.hasComponent(UnitImage)){
				image.name = unitKeys[counter.unit];
				image.value = this.unitImages[unitKeys[counter.unit]];
				counter.unit += 1;
			} else if(entity.hasComponent(BuildingImage)){
				image.name = buildingKeys[counter.building];
				image.value = this.buildingImages[buildingKeys[counter.building]];
				counter.building += 1;
			} else if(entity.hasComponent(TileImage)){
				image.name = tileKeys[counter.tile];
				image.value = this.tileImages[tileKeys[counter.tile]];
				counter.tile += 1;
			} else if(entity.hasComponent(IconImage)){
				image.name = iconKeys[counter.icon];
				image.value = this.iconImages[iconKeys[counter.icon]];
				counter.icon += 1;
			} else if(entity.hasComponent(BackgroundImage)){
				image.name = backgroundKeys[counter.background];
				image.value = this.backgroundImages[backgroundKeys[counter.background]];
				counter.background += 1;
			}
		});
	}

	setInitialPosition() {
		let screenStatus = this.queries.screenStatus.results[0].getMutableComponent(ScreenStatus);
		let canvasPos = evenrToPixel(this.mapHeight/2, this.mapWidth/2, TileSize.REGULAR);

		screenStatus.x = canvasPos.x - this.canvasWidth/2;
		screenStatus.y = canvasPos.y - this.canvasHeight/2;
	}

	/**
	 * 
	 * @param {*} num 
	 */
	assignRegion(num) {
		let centers = [];

		for(let i=0; i<num; i++) {
			centers.push({x: Math.random() * this.mapWidth, y: Math.random() * this.mapHeight});
		}

		this.queries.tiles.results.forEach(tile => {
			let region = tile.getMutableComponent(Region).region;
			let mapPos = tile.getComponent(MapPosition);
			let evenRPos = cubeToEvenr(mapPos.x, mapPos.z);

			let minDist = 99999;
			let index = -1;

			for(let k=0; k<centers.length; k++) {
				const dx = centers[k].x - evenRPos.x;
				const dy = centers[k].y - evenRPos.y;
				const distance = Math.hypot(dx, dy);

				if(distance < minDist) {
					minDist = distance;
					index = k;
				}
			}

			region = index;
		});
	}
}

LoaderSystem.queries = {
	images: {
		components: [Image]
	},
	screenStatus: {
		components: [ScreenStatus]
	},
	tiles: {
		components: [Tile, Region]
	}
};