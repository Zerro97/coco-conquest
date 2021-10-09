import { System } from '../Library/Ecsy';
import { Image } from '../Component';

export class LoaderSystem extends System {
	execute(delta, time) {
		this.queries.images.results.forEach((entity, index) => {
			var image = entity.getMutableComponent(Image);
			image.value = this.images[`${index}.png`];
		});

		this.stop();
	}
}

LoaderSystem.queries = {
	images: {
		components: [Image]
	}
};