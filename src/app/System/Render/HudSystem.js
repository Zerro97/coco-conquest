import { System } from "../../Library/Ecsy";
import {
  ActionStatus, CurrentSelect, Damage, Health, Range, Sight, Speed, Tile, Unit, Building
} from "../../Component";
import { ActionType } from "../../Type";
import { roundRect } from "../../Util";

export class HudSystem extends System {
  execute(delta, time) {
    this.ctx.restore();

    this.drawHud();
  }

  drawHud() {
    this.drawTRPanel();
    this.drawTPanel();
    this.drawBRPanel();
  }

  drawTRPanel() {
    const actionStatus = this.queries.actionStatus.results[0].getComponent(ActionStatus);

    const selectedTile = this.queries.selectedTile.results[0];
    const selectedUnit = this.queries.selectedUnit.results[0];
    const selectedBuilding = this.queries.selectedBuilding.results[0];

    
    if (actionStatus.action !== ActionType.NOT_SELECTED) {
      console.log("in");
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
  
      if(selectedUnit) {
        const health = selectedUnit.getComponent(Health).value;
        const damage = selectedUnit.getComponent(Damage).value;
        const range = selectedUnit.getComponent(Range).value;
        const sight = selectedUnit.getComponent(Sight).value;
        const speed = selectedUnit.getComponent(Speed).value;

        this.ctx.font = "18px Arial";
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "center";

        this.ctx.fillText("HP: " + health, this.canvasWidth - 50, 45);
        this.ctx.fillText("DG: " + damage, this.canvasWidth - 120, 45);
        this.ctx.fillText("RA: " + range, this.canvasWidth - 190, 45);
        this.ctx.fillText("SI: " + sight, this.canvasWidth - 50, 85);
        this.ctx.fillText("SP: " + speed, this.canvasWidth - 120, 85);
      } else if(selectedBuilding) {
        console.log("Building");
      } else if(selectedTile) {
        console.log("Tile");
      }
    }
  }

  drawTPanel(){

  }

  drawBRPanel() {
    this.ctx.fillStyle = "rgba(150, 150, 150, 0.6)";
    this.ctx.lineWidth = 20;
    this.ctx.strokeStyle = "rgba(100, 100, 100, 0.8)";
    this.ctx.beginPath();
    this.ctx.arc(this.canvasWidth - 100, this.canvasHeight - 100, 60, 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.font = "26px Arial";
    this.ctx.fillStyle = "rgba(50, 50, 50, 0.8)";
    this.ctx.textAlign = "center";

    this.ctx.fillText("NEXT", this.canvasWidth - 100, this.canvasHeight - 110);
    this.ctx.fillText("TURN", this.canvasWidth - 100, this.canvasHeight - 75);
  }
}

HudSystem.queries = {
  actionStatus: {
    components: [ActionStatus],
  },
  selectedTile: {
    components: [CurrentSelect, Tile]
  },
  selectedUnit: {
    components: [CurrentSelect, Unit, Health, Damage, Sight, Speed, Range]
  },
  selectedBuilding: {
    components: [CurrentSelect, Building]
  }
};
