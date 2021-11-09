import { System } from '../../Library/Ecsy';
import { CanvasPosition, CurrentHover, CurrentSelect, Hoverable, MapPosition, MouseStatus, ScreenStatus, Selectable } from '../../Component';
import { applyTransformation } from '../../Util';

/**
 * Store mouse event data to entity
 */
export class MouseHandlerSystem extends System {
	execute(delta, time) {
		this.checkHover();
		this.checkSelect();
	}

	checkHover() {
		const mouseStatus = this.queries.mouseStatus.results[0].getMutableComponent(MouseStatus);

		// Loop through all the hoverable objects
		this.queries.hoverableObjects.results.forEach((object) => {
			let objectPosition = object.getMutableComponent(CanvasPosition);
		});

	}

	checkSelect() {
		const mouseStatus = this.queries.mouseStatus.results[0].getMutableComponent(MouseStatus);
		const mouseX = mouseStatus.x;
		const mouseY = mouseStatus.x;
		const mouseTransX = mouseStatus.mapX;
		const mouseTransY = mouseStatus.mapY;

		// Loop through all the hoverable objects
		this.queries.mouseStatus.results.forEach((object) => {
			let objectPosition = object.getMutableComponent(CanvasPosition);
		});
	}

	/**
	 * Check if a point is within given list of verticies
	 * 
	 * @param {*} nvert Number of vertices in the polygon. Whether to repeat the first vertex at the end is discussed below.
	 * @param {*} vertx Arrays containing the x-coordinates of the polygon's vertices.
	 * @param {*} verty Arrays containing the y-coordinates of the polygon's vertices.
	 * @param {*} testx x-coordinate of the test point.
	 * @param {*} testy y-coordinate of the test point.
	 * @returns 
	 */
	pnpoly( nvert, vertx, verty, testx, testy ) {
		var i, j, c = false;
		for( i = 0, j = nvert-1; i < nvert; j = i++ ) {
			if( ( ( verty[i] > testy ) != ( verty[j] > testy ) ) &&
				( testx < ( vertx[j] - vertx[i] ) * ( testy - verty[i] ) / ( verty[j] - verty[i] ) + vertx[i] ) ) {
					c = !c;
			}
		}
		return c;
	}
}

// Define a query of entities
MouseHandlerSystem.queries = {
	mouseStatus: {
		components: [MouseStatus]
	},
	screenStatus: {
		components: [ScreenStatus]
	},
	currentHover: {
		components: [CurrentHover]
	}, 
	currentSelect: {
		components: [CurrentSelect]
	},
	hoverableObjects: {
		components: [Hoverable, CanvasPosition]
	},
	selectableObjects: {
		components: [Selectable, CanvasPosition]
	}
};
