import { System } from "../../../Library/Ecsy";
import { ScreenStatus, MouseStatus, CurrentSelect, Tile, MapPosition, CanvasPosition, ScreenFocusStatus } from "../../../Component";
import { isInsideRectangle, applyTransformation, reverseTransformation } from "../../../Util";
import { TileSize } from "../../../Type";

export class MapEditorScreenSystem extends System {
  execute(delta, time) {
    const screenStatus = this.queries.screenStatus.results[0].getComponent(ScreenStatus);

    this.updateScreen();

    this.clearCanvas();

    this.ctx.save();

    // Applying coordinate transformation according to screenStatus
    // Currently no intention of applying rotate transformation
    this.ctx.translate(-screenStatus.x, -screenStatus.y);

    this.ctx.translate(this.canvasWidth/2, this.canvasHeight/2);
    this.ctx.scale(screenStatus.scaleX, screenStatus.scaleY);
    this.ctx.translate(-this.canvasWidth/2, -this.canvasHeight/2);
  }

  clearCanvas() {
    this.ctx.fillStyle = "rgb(10, 10, 10)";
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  updateScreen() {
    this.checkMouseWheel();
    this.checkScreenMove();
  }

  checkMouseWheel() {
    const mouseStatus = this.queries.mouseStatus.results[0].getMutableComponent(MouseStatus);
    const screenStatus = this.queries.screenStatus.results[0].getMutableComponent(ScreenStatus);

    if ( screenStatus.scaleX >= 0.5 && screenStatus.scaleY >= 0.5 && screenStatus.scaleX <= 5.0 && screenStatus.scaleY <= 5.0) {
      screenStatus.scaleX += mouseStatus.wheelY;
      screenStatus.scaleY += mouseStatus.wheelY;
    }

    if(screenStatus.scaleX < 0.5 && screenStatus.scaleY < 0.5) {
      screenStatus.scaleX = 0.5;
      screenStatus.scaleY = 0.5;
    }

    if(screenStatus.scaleX > 5.0 && screenStatus.scaleY > 5.0) {
      screenStatus.scaleX = 5.0;
      screenStatus.scaleY = 5.0;
    }

    mouseStatus.wheelY = 0;
  }

  checkScreenMove() {
    const mouseStatus = this.queries.mouseStatus.results[0].getMutableComponent(MouseStatus);
    const screenStatus = this.queries.screenStatus.results[0].getMutableComponent(ScreenStatus);
    const mouseX = mouseStatus.x;
    const mouseY = mouseStatus.y;

    if(mouseX < 50) {
      screenStatus.x -= Math.abs(mouseX-100) * 0.1;
    }

    if(mouseY < 50) {
      screenStatus.y -= Math.abs(mouseY-100) * 0.1;
    }

    if(mouseX > this.canvasWidth - 50) {
      screenStatus.x += Math.abs(this.canvasWidth - mouseX - 100) * 0.1;
    }

    if(mouseY > this.canvasHeight - 50) {
      screenStatus.y += Math.abs(this.canvasHeight - mouseY - 100) * 0.1;
    }
  }
}

MapEditorScreenSystem.queries = {
  mouseStatus: {
    components: [MouseStatus],
  },
  screenStatus: {
    components: [ScreenStatus],
  },
};
