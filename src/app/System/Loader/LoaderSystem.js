import { System } from '../../Library/Ecsy';
import { 
	Image, 
	UnitImage, 
	BuildingImage,
	IconImage, 
	DirtImage, 
	GrassImage, 
	MarsImage, 
	SandImage,
	StoneImage, 
	BackgroundImage,
	ScreenStatus 
} from '../../Component';
import { evenrToPixel } from '../../Util';

export class LoaderSystem extends System {
	execute(delta, time) {
		this.loadImages();
		this.setInitialPosition();

		this.stop();
	}

	loadImages() {
		let counter = {
			unit: 0,
			building: 0,
			icon: 0,
			dirt: 0,
			grass: 0,
			mars: 0,
			sand: 0,
			stone: 0,
			background: 0
		};
		let unitKeys = Object.keys(this.unitImages);
		let buildingKeys = Object.keys(this.buildingImages);
		let iconKeys = Object.keys(this.iconImages);
		let dirtKeys = Object.keys(this.dirtImages);
		let grassKeys = Object.keys(this.grassImages);
		let marsKeys = Object.keys(this.marsImages);
		let sandKeys = Object.keys(this.sandImages);
		let stoneKeys = Object.keys(this.stoneImages);
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
			} else if(entity.hasComponent(IconImage)){
				image.name = iconKeys[counter.icon];
				image.value = this.iconImages[iconKeys[counter.icon]];
				counter.icon += 1;
			} else if(entity.hasComponent(DirtImage)){
				image.name = dirtKeys[counter.dirt];
				image.value = this.dirtImages[dirtKeys[counter.dirt]];
				counter.dirt += 1;
			} else if(entity.hasComponent(GrassImage)){
				image.name = grassKeys[counter.grass];
				image.value = this.grassImages[grassKeys[counter.grass]];
				counter.grass += 1;
			} else if(entity.hasComponent(MarsImage)){
				image.name = marsKeys[counter.mars];
				image.value = this.marsImages[marsKeys[counter.mars]];
				counter.mars += 1;
			} else if(entity.hasComponent(SandImage)){
				image.name = sandKeys[counter.sand];
				image.value = this.sandImages[sandKeys[counter.sand]];
				counter.sand += 1;
			} else if(entity.hasComponent(StoneImage)){
				image.name = stoneKeys[counter.stone];
				image.value = this.stoneImages[stoneKeys[counter.stone]];
				counter.stone += 1;
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