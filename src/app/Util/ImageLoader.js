import { Image as ImageComponent, UnitImage, BuildingImage, IconImage } from '../Component';

export class ImageLoader {
	constructor(world) {
		this.world = world;

		this.iconImages;
		this.unitImages;
		this.buildingImages;
	}

	importAll(r) {
		let images = {};
		r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });

		return images;
	}

	async loadUnitImages() {
		const images = {};
		this.unitImages = this.importAll(require.context('../Assets/Images/Units', false, /\.(png|jpe?g|svg)$/));
		
		for(const key in this.unitImages) {
			const image = new Image();

			image.src = this.unitImages[key];
			await image.decode();
			images[key] = image;
		}

		return images;
	}

	async loadBuildingImages() {
		const images = {};
		this.buildingImages = this.importAll(require.context('../Assets/Images/Buildings', false, /\.(png|jpe?g|svg)$/));

		for(const key in this.buildingImages) {
			const image = new Image();

			image.src = this.buildingImages[key];
			await image.decode();
			images[key] = image;
		}

		return images;
	}

	async loadIconImages() {
		const images = {};
		this.iconImages = this.importAll(require.context('../Assets/Images/Icons', false, /\.(png|jpe?g|svg)$/));

		for(const key in this.iconImages) {
			const image = new Image();

			image.src = this.iconImages[key];
			await image.decode();
			images[key] = image;
		}

		return images;
	}

	generateUnitImage() {
		for(const key in this.unitImages) {
			this.world
				.createEntity()
				.addComponent(ImageComponent)
				.addComponent(UnitImage);
		}
	}

	generateBuildingImage() {
		for(const key in this.buildingImages) {
			this.world
				.createEntity()
				.addComponent(ImageComponent)
				.addComponent(BuildingImage);
		}
	}

	generateIconImage() {
		for(const key in this.iconImages) {
			this.world
				.createEntity()
				.addComponent(ImageComponent)
				.addComponent(IconImage);
		}
	}
}