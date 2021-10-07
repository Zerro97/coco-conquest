export class ImageLoader {
	constructor() {
		this.images = {};
		this.imageNames = {};
	}

	importAll(r) {
		let images = {};
		r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });

		return images;
	}

	loadUnitImages() {
		this.imageNames = this.importAll(require.context('../Assets/Images/Units', false, /\.(png|jpe?g|svg)$/));

		for(const key in this.imageNames) {
			let image = new Image();
			image.src = this.imageNames[key];
			this.images[key] = image;
		}

		return this.images;
	}
}