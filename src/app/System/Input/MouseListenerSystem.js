import { System } from "../../Library/Ecsy";
import { MouseStatus, ScreenStatus } from "../../Component";
import { applyTransformation } from "../../Util";

/**
 * Store mouse event data to entity
 */
export class MouseListenerSystem extends System {
	execute(delta, time) {
		document.addEventListener("pointerdown", (e) => {
			const mouseStatus = this.queries.mouseStatus.results[0].getMutableComponent(MouseStatus);
			mouseStatus.isMouseDown = true;
		});

		document.addEventListener("pointerup", (e) => {
			const mouseStatus = this.queries.mouseStatus.results[0].getMutableComponent(MouseStatus);
			mouseStatus.isMouseUp = true;
		});

		document.addEventListener("pointermove", (e) => {
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
			mouseStatus.mapX = mousePos.x;
			mouseStatus.mapY = mousePos.y;
		});

		document.addEventListener("wheel", (e) => {
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
