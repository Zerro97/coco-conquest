import { System } from "../../Library/Ecsy";
import { MouseStatus, ScreenStatus } from "../../Component";
import { applyTransformation } from "../../Util";

/**
 * Store mouse event data to entity
 */
export class MouseListenerSystem extends System {
	execute(delta, time) {
		// Disable default right click
		document.addEventListener("contextmenu", function(e){
			e.preventDefault();
		}, false);

		this.canvas.addEventListener("pointerdown", (e) => {
			const mouseStatus = this.queries.mouseStatus.results[0].getMutableComponent(MouseStatus);

			if(e.button === 0) {
				mouseStatus.isMouseDown = true;
				mouseStatus.clickBuffer = 0;
			} else if(e.button === 2) {
				mouseStatus.isRightMouseDown = true;
				mouseStatus.rightClickBuffer = 0;
			}
		});

		this.canvas.addEventListener("pointerup", (e) => {
			const mouseStatus = this.queries.mouseStatus.results[0].getMutableComponent(MouseStatus);

			if(e.button === 0) {
				mouseStatus.isMouseDown = false;
			} else if(e.button === 2) {
				mouseStatus.isRightMouseDown = false;
			}
		});

		this.canvas.addEventListener("pointermove", (e) => {
			const mouseStatus = this.queries.mouseStatus.results[0].getMutableComponent(MouseStatus);
			let offset = e.target.getBoundingClientRect();

			mouseStatus.x = e.clientX - offset.left;
			mouseStatus.y = e.clientY - offset.top;

			const screenStatus = this.queries.screenStatus.results[0].getMutableComponent(ScreenStatus);
			let translation = { x: screenStatus.x, y: screenStatus.y };
			let scale = { x: screenStatus.scaleX, y: screenStatus.scaleY };
			let canvasInfo = { width: this.canvasWidth, height: this.canvasHeight };
			let mousePos = applyTransformation(
				mouseStatus.x,
				mouseStatus.y,
				translation,
				scale,
				canvasInfo
			);
			mouseStatus.mapX = mousePos.x;
			mouseStatus.mapY = mousePos.y;
		});

		this.canvas.addEventListener("wheel", (e) => {
			const mouseStatus = this.queries.mouseStatus.results[0].getMutableComponent(MouseStatus);
			mouseStatus.wheelY = e.deltaY * 0.001;
		});

		// Stopping this system once listener is registered
		// Init doesn't work since other components are not yet registered
		this.stop();
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
