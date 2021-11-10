import { System } from "../../Library/Ecsy";
import { ScreenStatus, MouseStatus } from "../../Component";

export class ScreenSystem extends System {
	execute(delta, time) {
    const screenStatus = this.queries.screenStatus.results[0].getComponent(ScreenStatus);

    this.updateScreen();

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

  updateScreen() {
    const mouseStatus = this.queries.mouseStatus.results[0].getMutableComponent(MouseStatus);
    const screenStatus = this.queries.screenStatus.results[0].getMutableComponent(ScreenStatus);

    if ( screenStatus.scaleX > 0.5 && screenStatus.scaleY > 0.5 && screenStatus.scaleX < 5.0 && screenStatus.scaleY < 5.0) {
      screenStatus.scaleX += mouseStatus.wheelY;
      screenStatus.scaleY += mouseStatus.wheelY;
    }
    mouseStatus.wheelY = 0;
  }
}

ScreenSystem.queries = {
  mouseStatus: {
    components: [MouseStatus],
  },
  screenStatus: {
    components: [ScreenStatus],
  },
};