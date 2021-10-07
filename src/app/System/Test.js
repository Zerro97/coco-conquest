//import unitImage from '../Assets/Images/Units/0.png';

export class Test {
	test() {
		setTimeout(() => {
			let imageObject = new Image(50, 50);
			let unitImage = import('../Assets/Images/Units/0.png');
			imageObject.src = unitImage;
			console.log(imageObject, unitImage);
		}, 100);

		
	}
}