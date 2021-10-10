import { System } from '../Library/Ecsy';
import { Image, ScreenStatus } from '../Component';
import { hexToCanvas } from '../Util';

export class LoaderSystem extends System {
	execute(delta, time) {
		this.loadImages();
		this.setInitialPosition();

		this.stop();
	}

	loadImages() {
		this.queries.images.results.forEach((entity, index) => {
			var image = entity.getMutableComponent(Image);
			image.value = this.images[`${index}.png`];
		});
	}

	setInitialPosition() {
		let screenStatus = this.queries.screenStatus.results[0].getMutableComponent(ScreenStatus);
		let canvasPos = hexToCanvas(this.mapHeight, this.mapWidth, 50);

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