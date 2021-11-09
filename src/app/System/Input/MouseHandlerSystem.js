import { System } from '../../Library/Ecsy';
import { CanvasPosition, CurrentHover, CurrentSelect, Hoverable, MapPosition, MouseStatus, Radius, ScreenStatus, Selectable, Size } from '../../Component';
import { applyTransformation, isInsideCircle, isInsideHexagon, isInsideRectangle } from '../../Util';
import { Shape } from '../../Type';

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
		const mouseTransX = mouseStatus.mapX;
		const mouseTransY = mouseStatus.mapY;

		// Loop through all the hoverable objects
		this.queries.hoverableObjects.results.forEach((object) => {
			let objectPosition = object.getMutableComponent(CanvasPosition);
			let objectType = object.getMutableComponent(Hoverable).type;

			switch(objectType) {
				case Shape.RECTANGLE: {
					let size = object.getComponent(Size);
					if(isInsideRectangle(objectPosition.x, objectPosition.y, mouseTransX, mouseTransY, size.width, size.height)) {
						object.addComponent(CurrentHover);
					}
					break;
				}
				case Shape.CIRCLE: {
					let radius = object.getMutableComponent(Radius);
					if(isInsideCircle(objectPosition.x, objectPosition.y, mouseTransX, mouseTransY, radius)) {
						object.addComponent(CurrentHover);
					}
					break;
				}
				case Shape.HEXAGON: {
					if(isInsideHexagon(objectPosition.x, objectPosition.y, mouseTransX, mouseTransY, 50)) {
						object.addComponent(CurrentHover);
					}
					break;
				}
				default: {
					object.removeComponent(CurrentHover);
					break;
				}
			}
		});

	}

	checkSelect() {
		const mouseStatus = this.queries.mouseStatus.results[0].getMutableComponent(MouseStatus);
		const mouseTransX = mouseStatus.mapX;
		const mouseTransY = mouseStatus.mapY;

		// Loop through all the selectable objects
		this.queries.selectableObjects.results.forEach((object) => {
			let objectPosition = object.getMutableComponent(CanvasPosition);
			let objectType = object.getMutableComponent(Selectable).type;

			switch(objectType) {
				case Shape.RECTANGLE: {
					let size = object.getComponent(Size);
					if(isInsideRectangle(objectPosition.x, objectPosition.y, mouseTransX, mouseTransY, size.width, size.height)) {
						object.addComponent(CurrentSelect);
					}
					break;
				}
				case Shape.CIRCLE: {
					let radius = object.getMutableComponent(Radius);
					if(isInsideCircle(objectPosition.x, objectPosition.y, mouseTransX, mouseTransY, radius)) {
						object.addComponent(CurrentSelect);
					}
					break;
				}
				case Shape.HEXAGON: {
					if(isInsideHexagon(objectPosition.x, objectPosition.y, mouseTransX, mouseTransY, 50)) {
						object.addComponent(CurrentSelect);
					}
					break;
				}
				default: {
					object.removeComponent(CurrentSelect);
					break;
				}
			}
		});
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
	hoverableObjects: {
		components: [Hoverable, CanvasPosition]
	},
	selectableObjects: {
		components: [Selectable, CanvasPosition]
	}
};
