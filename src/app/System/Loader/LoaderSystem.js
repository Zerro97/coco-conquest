import { System } from "../../Library/Ecsy";
import { 
	Image, 
	UnitImage, 
	BuildingImage,
	IconImage, 
	TileImage,
	BackgroundImage,
	ScreenStatus 
} from "../../Component";
import { evenrToPixel } from "../../Util";

export class LoaderSystem extends System {
	execute(delta, time) {
		this.loadImages();
		this.setInitialPosition();

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
		let canvasPos = evenrToPixel(this.mapHeight, this.mapWidth, 50);

		let dx = this.canvasWidth - canvasPos.x;
		let dy = this.canvasHeight - canvasPos.y;

		screenStatus.x = -dx/2;
		screenStatus.y = -dy/2;
    screenStatus.scaleX = 2;
    screenStatus.scaleY = 2;
	}
}

LoaderSystem.queries = {
	images: {
		components: [Image]
	},
	screenStatus: {
		components: [ScreenStatus]
	}
};