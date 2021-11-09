import { 
	Image as ImageComponent, 
	UnitImage, 
	BuildingImage, 
	IconImage, 
	TileImage,
	BackgroundImage
} from '../Component';

export class ImageLoader {
	constructor(world) {
		this.world = world;

		this.iconImages;
		this.tileImages;
		this.unitImages;
		this.buildingImages;
		this.backgroundImages;
	}

	importAll(r) {
		let images = {};
		r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });

		return images;
	}

	async loadImages(type) {
		const images = {};

		switch(type) {
		case 'tileImages':
			this[type] = this.importAll(require.context('../Assets/Images/Tiles', false, /\.(png|jpe?g|svg)$/));
			break;
		case 'iconImages':
			this[type] = this.importAll(require.context('../Assets/Images/Icons', false, /\.(png|jpe?g|svg)$/));
			break;
		case 'unitImages':
			this[type] = this.importAll(require.context('../Assets/Images/Units', false, /\.(png|jpe?g|svg)$/));
			break;
		case 'buildingImages':
			this[type] = this.importAll(require.context('../Assets/Images/Buildings', false, /\.(png|jpe?g|svg)$/));
			break;
		case 'backgroundImages':
			this[type] = this.importAll(require.context('../Assets/Images/Background', false, /\.(png|jpe?g|svg)$/));
			break;
		}
		
		for(const key in this[type]) {
			const image = new Image();

			image.src = this[type][key];
			await image.decode();
			images[key] = image;
		}

		return images;
	}

	loadTileImages() {
		return this.loadImages('tileImages');
	}

	loadUnitImages() {
		return this.loadImages('unitImages');
	}

	loadBuildingImages() {
		return this.loadImages('buildingImages');
	}

	loadIconImages() {
		return this.loadImages('iconImages');
	}

	loadBackgroundImages() {
		return this.loadImages('backgroundImages');
	}

	generateImage(component, type) {
		for(const key in this[type]) {
			this.world
				.createEntity()
				.addComponent(ImageComponent)
				.addComponent(component);
		}
	}

	generateTileImage() {
		this.generateImage(TileImage, 'tileImages');
	}

	generateUnitImage() {
		this.generateImage(UnitImage, 'unitImages');
	}

	generateBuildingImage() {
		this.generateImage(BuildingImage, 'buildingImages');
	}

	generateIconImage() {
		this.generateImage(IconImage, 'iconImages');
	}

	generateBackgroundImage() {
		this.generateImage(BackgroundImage, 'backgroundImages');
	}
}