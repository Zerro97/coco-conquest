import { System } from "../../Library/Ecsy";
import { ScreenStatus, MouseStatus, CurrentSelect, Tile, MapPosition, CanvasPosition, ScreenFocusStatus } from "../../Component";
import { isInsideRectangle, applyTransformation, reverseTransformation } from "../../Util";

export class ScreenSystem extends System {
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
    
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.canvasWidth/2, this.canvasHeight/2, 5, 5);
	}

  clearCanvas() {
    this.ctx.fillStyle = "#69696c";
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  updateScreen() {
    this.checkMouseWheel();
    //this.checkScreenMove();
    this.checkFocus();
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

  checkFocus() {
    const selectedTile = this.queries.selectedTile.results[0];
    
    if(selectedTile) {
      const screenStatus = this.queries.screenStatus.results[0].getMutableComponent(ScreenStatus);
      const focusStatus = this.queries.screenFocusStatus.results[0].getMutableComponent(ScreenFocusStatus);
      const canvasPos = selectedTile.getMutableComponent(CanvasPosition);

      const transCenter = reverseTransformation(
        this.canvasWidth/2, 
        this.canvasHeight/2, 
        {x: screenStatus.x, y: screenStatus.y}, 
        {x: screenStatus.scaleX, y: screenStatus.scaleY}, 
        {width: this.canvasWidth, height: this.canvasHeight}
      );
      // transCenter.x -= this.canvasWidth/2;
      // transCenter.y -= this.canvasHeight/2;

      // console.log(transCenter, this.canvasWidth/2, this.canvasHeight/2);

      // const original = applyTransformation(
      //   transCenter.x, 
      //   transCenter.y, 
      //   {x: screenStatus.x, y: screenStatus.y}, 
      //   {x: screenStatus.scaleX, y: screenStatus.scaleY}, 
      //   {width: this.canvasWidth, height: this.canvasHeight}
      // );

      // const transPos = reverseTransformation(
      //   canvasPos.x, 
      //   canvasPos.y, 
      //   {x: screenStatus.x, y: screenStatus.y}, 
      //   {x: screenStatus.scaleX, y: screenStatus.scaleY}, 
      //   {width: this.canvasWidth, height: this.canvasHeight}
      // );

      if(focusStatus.startFocusing) {
        focusStatus.prevCenterX = transCenter.x;//this.canvasWidth/2;
        focusStatus.prevCenterY = transCenter.y; //this.canvasHeight/2;
        focusStatus.startFocusing = false;
        console.log(focusStatus.prevCenterX, focusStatus.prevCenterY, canvasPos.x, canvasPos.y);
      }

      const dx = Math.abs(focusStatus.prevCenterX - canvasPos.x);
      const dy = Math.abs(focusStatus.prevCenterY - canvasPos.y);
      const length = Math.hypot(dx, dy);

      
      if(!isInsideRectangle(transCenter.x - 50, transCenter.y - 50, canvasPos.x, canvasPos.y, 100, 100)) {
        screenStatus.x -= canvasPos.x/length;
        screenStatus.y -= canvasPos.y/length;
      }
    }
  }
}

ScreenSystem.queries = {
  mouseStatus: {
    components: [MouseStatus],
  },
  screenStatus: {
    components: [ScreenStatus],
  },
  screenFocusStatus: {
    components: [ScreenFocusStatus],
  },
  selectedTile: {
    components: [CurrentSelect, Tile, MapPosition, CanvasPosition],
  }
};