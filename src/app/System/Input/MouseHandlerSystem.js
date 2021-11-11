import { System } from "../../Library/Ecsy";
import { CanvasPosition, CurrentHover, CurrentSelect, Hoverable, MapPosition, MouseStatus, Radius, ScreenStatus, Selectable, Size, ActionStatus } from "../../Component";
import { isInsideCircle, isInsideHexagon, isInsideRectangle } from "../../Util";
import { Shape, TileSize, ActionType } from "../../Type";

/**
 * Store mouse event data to entity
 */
export class MouseHandlerSystem extends System {
	execute(delta, time) {
		this.trackClickBuffer();
		this.checkMouseClick();

		this.checkHover();
		this.checkSelect();
	}

	checkMouseClick() {
		const mouseStatus = this.queries.mouseStatus.results[0].getMutableComponent(MouseStatus);
		// Allow only one game frame to have isMouseCLicked to be true
		mouseStatus.isMouseClicked = false;

		// When mouse is up after mouse down within 20 game frame
		// set isMouseClicked to true
		if(mouseStatus.clickBuffer !== -1 && !mouseStatus.isMouseDown) {
			mouseStatus.isMouseClicked = true;
			mouseStatus.clickBuffer = -1;
		}
	}

	trackClickBuffer() {
		const mouseStatus = this.queries.mouseStatus.results[0].getMutableComponent(MouseStatus);

		if(mouseStatus.isMouseDown) {
			if(mouseStatus.clickBuffer !== -1) {
				mouseStatus.clickBuffer += 1;
			}
			if(mouseStatus.clickBuffer === 30) {
				mouseStatus.clickBuffer = -1;
			}
		}
	}

	checkHover() {
		const mouseStatus = this.queries.mouseStatus.results[0].getMutableComponent(MouseStatus);
		const mouseTransX = mouseStatus.mapX;
		const mouseTransY = mouseStatus.mapY;

		// Loop through all the hoverable objects
		this.queries.hoverableObjects.results.forEach((object) => {
			object.removeComponent(CurrentHover);

			let objectPosition = object.getMutableComponent(CanvasPosition);
			let objectShape = object.getMutableComponent(Selectable).shape;

			switch(objectShape) {
				case Shape.RECTANGLE: {
					let size = object.getComponent(Size);
					if(isInsideRectangle(objectPosition.x, objectPosition.y, mouseTransX, mouseTransY, size.width, size.height)) {
						if(!object.hasComponent(CurrentHover)) {
							object.addComponent(CurrentHover);
						}
					}
					break;
				}
				case Shape.CIRCLE: {
					let radius = object.getMutableComponent(Radius);
					if(isInsideCircle(objectPosition.x, objectPosition.y, mouseTransX, mouseTransY, radius)) {
						if(!object.hasComponent(CurrentHover)) {
							object.addComponent(CurrentHover);
						}
					}
					break;
				}
				case Shape.HEXAGON: {
					if(isInsideHexagon(objectPosition.x, objectPosition.y, mouseTransX, mouseTransY, TileSize.REGULAR)) {
						if(!object.hasComponent(CurrentHover)) {
							object.addComponent(CurrentHover);
						}
					}
					break;
				}
			}
		});
	}

	checkSelect() {
		const mouseStatus = this.queries.mouseStatus.results[0].getMutableComponent(MouseStatus);
		const actionStatus = this.queries.actionStatus.results[0].getMutableComponent(ActionStatus);

		if(mouseStatus.isMouseClicked) {
			let isSelected = false;

			const mouseTransX = mouseStatus.mapX;
			const mouseTransY = mouseStatus.mapY;

			// Loop through all the selectable objects
			this.queries.selectableObjects.results.forEach((object) => {
				object.removeComponent(CurrentSelect);

				let objectPosition = object.getMutableComponent(CanvasPosition);
				let objectShape = object.getMutableComponent(Selectable).shape;

				switch(objectShape) {
					case Shape.RECTANGLE: {
						let size = object.getComponent(Size);
						if(isInsideRectangle(objectPosition.x, objectPosition.y, mouseTransX, mouseTransY, size.width, size.height)) {
							if(!object.hasComponent(CurrentSelect)) {
								object.addComponent(CurrentSelect);
								isSelected = true;
							}
						}
						break;
					}
					case Shape.CIRCLE: {
						let radius = object.getMutableComponent(Radius);
						if(isInsideCircle(objectPosition.x, objectPosition.y, mouseTransX, mouseTransY, radius)) {
							if(!object.hasComponent(CurrentSelect)) {
								object.addComponent(CurrentSelect);
								isSelected = true;
							}
						}
						break;
					}
					case Shape.HEXAGON: {
						if(isInsideHexagon(objectPosition.x, objectPosition.y, mouseTransX, mouseTransY, TileSize.REGULAR)) {
							if(!object.hasComponent(CurrentSelect)) {
								object.addComponent(CurrentSelect);
								isSelected = true;
							}
						}
						break;
					}
				}
			});

			if(isSelected) {
				actionStatus.action = ActionType.SELECTED;
			} else {
				actionStatus.action = ActionType.NOT_SELECTED;
			}
		}
	}
}

// Define a query of entities
MouseHandlerSystem.queries = {
	mouseStatus: {
		components: [MouseStatus]
	},
	actionStatus: {
		components: [ActionStatus]
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
