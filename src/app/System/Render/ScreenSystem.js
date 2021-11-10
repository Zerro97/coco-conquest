import { System } from "../../Library/Ecsy";
import { ScreenStatus } from "../../Component";

export class ScreenSystem extends System {
	execute(delta, time) {
    const screenStatus = this.queries.screenStatus.results[0].getComponent(ScreenStatus);

    this.clearCanvas();

    this.ctx.save();

    // Applying coordinate transformation according to screenStatus
    // Currently no intention of applying rotate transformation
    this.ctx.translate(-screenStatus.x, -screenStatus.y);
    this.ctx.scale(screenStatus.scaleX, screenStatus.scaleY);
    this.ctx.rotate(screenStatus.rotate);
	}

  clearCanvas() {
    this.ctx.fillStyle = "#69696c";
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  }
}

ScreenSystem.queries = {
  screenStatus: {
    components: [ScreenStatus],
  },
};