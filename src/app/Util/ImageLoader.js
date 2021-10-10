import { UnitImage } from '../Component';

export class ImageLoader {
	constructor(world) {
		this.world = world;
	}

	importAll(r) {
		let images = {};
		r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });

		return images;
	}

	async loadUnitImages() {
		const images = {};
		const imageNames = this.importAll(require.context('../Assets/Images/Units', false, /\.(png|jpe?g|svg)$/));

		for(const key in imageNames) {
			const image = new Image();

			image.src = imageNames[key];
			await image.decode();
			images[key] = image;
		}

		return images;
	}

	async loadBuildingImages() {
		const images = {};
		const imageNames = this.importAll(require.context('../Assets/Images/Buildings', false, /\.(png|jpe?g|svg)$/));

		for(const key in imageNames) {
			const image = new Image();

			image.src = imageNames[key];
			await image.decode();
			images[key] = image;
		}

		return images;
	}

	async loadIconImages() {
		const images = {};
		const imageNames = this.importAll(require.context('../Assets/Images/Icons', false, /\.(png|jpe?g|svg)$/));

		for(const key in imageNames) {
			const image = new Image();

			image.src = imageNames[key];
			await image.decode();
			images[key] = image;
		}

		return images;
	}

	generateUnitImage() {
		this.world
			.createEntity()
			.addComponent(UnitImage);
	}
}