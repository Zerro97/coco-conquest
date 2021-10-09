
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

	async loadUnitImages() {
		this.imageNames = this.importAll(require.context('../Assets/Images/Units', false, /\.(png|jpe?g|svg)$/));

		for(const key in this.imageNames) {
			const image = new Image();

			image.src = this.imageNames[key];
			await image.decode();
			this.images[key] = image;
		}

		return this.images;
	}
}