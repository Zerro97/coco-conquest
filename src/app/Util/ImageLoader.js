import { 
	Image as ImageComponent, 
	UnitImage, 
	BuildingImage, 
	IconImage, 
	DirtImage,
	GrassImage,
	MarsImage,
	SandImage,
	StoneImage 
} from '../Component';

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

	async loadImages(type) {
		const images = {};

		switch(type) {
		case 'iconImages':
			this[type] = this.importAll(require.context('../Assets/Images/Icons', false, /\.(png|jpe?g|svg)$/));
			break;
		case 'unitImages':
			this[type] = this.importAll(require.context('../Assets/Images/Units', false, /\.(png|jpe?g|svg)$/));
			break;
		case 'buildingImages':
			this[type] = this.importAll(require.context('../Assets/Images/Buildings', false, /\.(png|jpe?g|svg)$/));
			break;
		case 'dirtImages':
			this[type] = this.importAll(require.context('../Assets/Images/Tiles/Terrain/Dirt', false, /\.(png|jpe?g|svg)$/));
			break;
		case 'grassImages':
			this[type] = this.importAll(require.context('../Assets/Images/Tiles/Terrain/Grass', false, /\.(png|jpe?g|svg)$/));
			break;
		case 'marsImages':
			this[type] = this.importAll(require.context('../Assets/Images/Tiles/Terrain/Mars', false, /\.(png|jpe?g|svg)$/));
			break;
		case 'sandImages':
			this[type] = this.importAll(require.context('../Assets/Images/Tiles/Terrain/Sand', false, /\.(png|jpe?g|svg)$/));
			break;
		case 'stoneImages':
			this[type] = this.importAll(require.context('../Assets/Images/Tiles/Terrain/Stone', false, /\.(png|jpe?g|svg)$/));
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

	loadUnitImages() {
		return this.loadImages('unitImages');
	}

	loadBuildingImages() {
		return this.loadImages('buildingImages');
	}

	loadIconImages() {
		return this.loadImages('iconImages');
	}

	loadDirtTerrainImages() {
		return this.loadImages('dirtImages');
	}

	loadGrassTerrainImages() {
		return this.loadImages('grassImages');
	}

	loadMarsTerrainImages() {
		return this.loadImages('marsImages');
	}

	loadSandTerrainImages() {
		return this.loadImages('sandImages');
	}

	loadStoneTerrainImages() {
		return this.loadImages('stoneImages');
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

	generateDirtTerrainImage() {
		this.generateImage(DirtImage, 'dirtImages');
	}

	generateGrassTerrainImage() {
		this.generateImage(GrassImage, 'grassImages');
	}

	generateMarsTerrainImage() {
		this.generateImage(MarsImage, 'marsImages');
	}

	generateSandTerrainImage() {
		this.generateImage(SandImage, 'sandImages');
	}

	generateStoneTerrainImage() {
		this.generateImage(StoneImage, 'stoneImages');
	}
}