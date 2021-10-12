import { Image as ImageComponent, UnitImage, BuildingImage, IconImage } from '../Component';

export class ImageLoader {
	constructor(world) {
		this.world = world;

		this.iconImages;
		this.unitImages;
		this.buildingImages;

		// Terrain
		this.dirtImages;
		this.grassImages;
		this.marsImages;
		this.sandImages;
		this.stoneImages;
	}

	importAll(r) {
		let images = {};
		r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });

		return images;
	}

	async loadImages(url, type) {
		const images = {};

		// TODO: require without variable, add switch case
		this[type] = this.importAll(require.context('../Assets/Images/' + url, false, /\.(png|jpe?g|svg)$/));
		
		for(const key in this[type]) {
			const image = new Image();

			image.src = this[type][key];
			await image.decode();
			images[key] = image;
		}

		return images;
	}

	loadUnitImages() {
		return this.loadImages('Units', 'unitImages');
	}

	loadBuildingImages() {
		return this.loadImages('Buildings', 'buildingImages');
	}

	loadIconImages() {
		return this.loadImages('Icons', 'iconImages');
	}

	loadDirtTerrainImages() {
		return this.loadImages('Tiles/Terrain/Dirt', 'dirtImages');
	}

	loadGrassTerrainImages() {
		return this.loadImages('Tiles/Terrain/Grass', 'grassImages');
	}

	loadMarsTerrainImages() {
		return this.loadImages('Tiles/Terrain/Mars', 'marsImages');
	}

	loadSandTerrainImages() {
		return this.loadImages('Tiles/Terrain/Sand', 'sandImages');
	}

	loadStoneTerrainImages() {
		return this.loadImages('Tiles/Terrain/Stone', 'stoneImages');
	}

	generateImage(component, type) {
		for(const key in this[type]) {
			this.world
				.createEntity()
				.addComponent(ImageComponent)
				.addComponent(component);
		}
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
}