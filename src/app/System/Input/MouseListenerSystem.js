import { System } from '../../Library/Ecsy';
import { MouseStatus, ScreenStatus } from '../../Component';
import { applyTransformation } from '../../Util';

/**
 * Store mouse event data to entity
 */
export class MouseListenerSystem extends System {
	execute(delta, time) {
		// Store pointer events (used for pinch gesture in mobile)
		let evCache = new Array();
		let prevDiff = { value: -1 };

		document.addEventListener('pointerdown', (e) => {
			const mouseStatus = this.queries.mouseStatus.results[0].getMutableComponent(MouseStatus);

			mouseStatus.isMouseDown = true;
			evCache.push(e);
		});

		document.addEventListener('pointermove', (e) => {
			const mouseStatus = this.queries.mouseStatus.results[0].getMutableComponent(MouseStatus);
			mouseStatus.x = e.clientX;
			mouseStatus.y = e.clientY;

			const screenStatus = this.queries.screenStatus.results[0].getMutableComponent(ScreenStatus);
			let translation = { x: screenStatus.x, y: screenStatus.y };
			let scale = { x: screenStatus.scaleX, y: screenStatus.scaleY };
			let mousePos = applyTransformation(
				e.clientX,
				e.clientY,
				translation,
				scale
			);
			mouseStatus.transformedX = mousePos.x;
			mouseStatus.transformedY = mousePos.y;

			this.checkPinchGesture(e, evCache, prevDiff);
		});

		document.addEventListener('pointerup', (e) => {
			const mouseStatus = this.queries.mouseStatus.results[0].getMutableComponent(MouseStatus);
			mouseStatus.isMouseUp = true;

			for (let i = 0; i < evCache.length; i++) {
				if (evCache[i].pointerId == e.pointerId) {
					evCache.splice(i, 1);
					break;
				}
			}
			// If the number of pointers down is less than two then reset diff tracker
			if (evCache.length < 2) prevDiff.value = -1;
		});

		window.addEventListener('wheel', (e) => {
			// -1 for up, 1 for down
			let scrollDirection = parseInt(e.deltaY * 0.01);
			let scaleAmount = scrollDirection * 0.1;
			let screenStatus = this.queries.screenStatus.results[0].getMutableComponent(ScreenStatus);

			if ( scrollDirection === -1 && screenStatus.scaleX > 0.5 && screenStatus.scaleY > 0.5 ) {
				screenStatus.scaleX += scaleAmount;
				screenStatus.scaleY += scaleAmount;
			} else if (scrollDirection === 1 && screenStatus.scaleX < 1.5 && screenStatus.scaleY < 1.5) {
				screenStatus.scaleX += scaleAmount;
				screenStatus.scaleY += scaleAmount;
			}
		});

		// Stopping this system once listener is registered
		// Init doesn't work since other components are not yet registered
		this.stop();
	}

	checkPinchGesture(e, evCache, prevDiff) {
		const screenStatus = this.queries.screenStatus.results[0].getMutableComponent(ScreenStatus);

		// Find this event in the cache and update its record with this event
		for (let i = 0; i < evCache.length; i++) {
			if (e.pointerId == evCache[i].pointerId) {
				evCache[i] = e;
				break;
			}
		}

		// If two pointers are down, check for pinch gestures
		if (evCache.length == 2) {
			// Calculate the distance between the two pointers
			let dx = evCache[0].clientX - evCache[1].clientX;
			let dy = evCache[0].clientY - evCache[1].clientY;
			let curDiff = Math.hypot(dx, dy);

			if (prevDiff.value > 0) {
				// The distance between the two pointers has increased
				if (curDiff > prevDiff.value && screenStatus.scaleX < 1.5 && screenStatus.scaleY < 1.5) {
					screenStatus.scaleX += 0.1;
					screenStatus.scaleY += 0.1;
				}
				// The distance between the two pointers has decreased
				if (curDiff < prevDiff.value && screenStatus.scaleX > 0.5 && screenStatus.scaleY > 0.5) {
					screenStatus.scaleX -= 0.1;
					screenStatus.scaleY -= 0.1;
				}
			}

			// Cache the distance for the next move event
			prevDiff.value = curDiff;
		}
	}
}

// Define a query of entities
MouseListenerSystem.queries = {
	mouseStatus: {
		components: [MouseStatus]
	},
	screenStatus: {
		components: [ScreenStatus]
	}
};
