import { System } from "../../Library/Ecsy";
import { ScreenStatus, ActionStatus, Health, Damage, Sight, Speed, GameObject } from "../../Component";
import { ActionType, GameObjectType } from "../../Type";
import { roundRect } from "../../Util";

export class HudSystem extends System {
	execute(delta, time) {
    this.ctx.restore();

    this.drawHud();
	}

  clearCanvas() {
    this.ctx.fillStyle = "#69696c";
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  drawHud() {
    const actionStatus = this.queries.actionStatus.results[0].getComponent(ActionStatus);

    let selectedObject = null;
    let type = null;
    let health = null;
    let damage = null;
    let range = null;
    let sight = null;
    let speed = null;

    if (actionStatus.action === ActionType.SELECTED) {
      selectedObject = this.getSelectedObject();
      type = selectedObject.getComponent(GameObject).value;
    }

    if (type === GameObjectType.UNIT) {
      health = selectedObject.getComponent(Health).value;
      damage = selectedObject.getComponent(Damage).value;
      range = selectedObject.getComponent(Range).value;
      sight = selectedObject.getComponent(Sight).value;
      speed = selectedObject.getComponent(Speed).value;
    }

    // Pause Button
    this.ctx.fillStyle = "rgb(210, 210, 210)";
    this.ctx.fillRect(40, 40, 10, 50);
    this.ctx.fillRect(60, 40, 10, 50);

    // Top right panel
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = "rgb(100, 100, 100)";
    roundRect(
      this.ctx,
      this.canvasWidth - 350,
      0,
      350,
      120,
      { bl: 20 },
      true,
      true
    );

    // Circle
    this.ctx.fillStyle = "rgb(150, 150, 150)";
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = "rgb(100, 100, 100)";
    this.ctx.beginPath();
    this.ctx.arc(this.canvasWidth - 285, 60, 50, 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    // HP
    switch (type) {
      case GameObjectType.TILE:
        break;
      case GameObjectType.UNIT:
        this.ctx.font = "18px Arial";
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "center";

        this.ctx.fillText("HP: " + health, this.canvasWidth - 50, 45);
        this.ctx.fillText("DG: " + damage, this.canvasWidth - 120, 45);
        this.ctx.fillText("RA: " + range, this.canvasWidth - 190, 45);
        this.ctx.fillText("SI: " + sight, this.canvasWidth - 50, 85);
        this.ctx.fillText("SP: " + speed, this.canvasWidth - 120, 85);

        break;
      case GameObjectType.BUILDING:
        break;
    }
  }
}

HudSystem.queries = {
  screenStatus: {
    components: [ScreenStatus],
  },
  actionStatus: {
    components: [ActionStatus],
  },
};