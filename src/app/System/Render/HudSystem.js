import { System } from "../../Library/Ecsy";
import {
  ActionStatus, CurrentSelect, Damage, Health, Range, Sight, Speed, Tile, Unit, Building, BackgroundImage, Image, UnitImage
} from "../../Component";
import { ActionType, BackgroundType } from "../../Type";
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
    this.drawMap();
  }

  drawTPanel(){

  }

  drawBRPanel() {
    this.drawUnitPanel();

    const posX = this.canvasWidth - 110;
    const posY = this.canvasHeight - 100;

    const gradient = this.ctx.createRadialGradient(posX+40, posY-40, 1, posX, posY, 80);
    
    // Add three color stops
    gradient.addColorStop(0, "white");
    gradient.addColorStop(.1, "#eabb8e");
    gradient.addColorStop(1, "#86613e");

    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(posX, posY, 80, 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.font = "26px Arial";
    this.ctx.fillStyle = "rgb(40, 40, 40)";
    this.ctx.textAlign = "center";
    this.ctx.fillText("NEXT", posX, posY - 5);
    this.ctx.fillText("TURN", posX, posY + 25);
  }

  drawUnitPanel() {
    const actionStatus = this.queries.actionStatus.results[0].getComponent(ActionStatus);

    const selectedTile = this.queries.selectedTile.results[0];
    const selectedUnit = this.queries.selectedUnit.results[0];
    const selectedBuilding = this.queries.selectedBuilding.results[0];

    
    if (actionStatus.action !== ActionType.NOT_SELECTED) {
      // Top right panel
      this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      this.ctx.lineWidth = 5;
      this.ctx.strokeStyle = "rgb(100, 100, 100)";

      const startPoint = {x: this.canvasWidth - 205, y: this.canvasHeight - 205};

      this.ctx.beginPath();
      this.ctx.moveTo(startPoint.x, startPoint.y);
      this.ctx.bezierCurveTo(startPoint.x + 20, startPoint.y - 20, startPoint.x + 55, startPoint.y + 15, startPoint.x + 35, startPoint.y + 35);
      //this.ctx.lineTo(this.canvasWidth - 155, this.canvasHeight - 200);
      this.ctx.arc(this.canvasWidth - 110, this.canvasHeight - 100, 100, -Math.PI/1.5, Math.PI/1.5, true);
      this.ctx.lineTo(this.canvasWidth - 155, this.canvasHeight);
      this.ctx.lineTo(this.canvasWidth - 180, this.canvasHeight);
      this.ctx.arc(this.canvasWidth - 180, this.canvasHeight - 100, 100, Math.PI/1.5, -Math.PI/1.5, false);
      this.ctx.closePath();
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.moveTo(this.canvasWidth - 580, this.canvasHeight - 190);
      this.ctx.lineTo(this.canvasWidth - 255, this.canvasHeight - 190);
      this.ctx.arc(this.canvasWidth - 210, this.canvasHeight - 100, 100, -Math.PI/1.5, Math.PI/1.5, true);
      this.ctx.lineTo(this.canvasWidth - 255, this.canvasHeight);
      this.ctx.lineTo(this.canvasWidth - 580, this.canvasHeight);
      this.ctx.closePath();
      this.ctx.fill();

      //this.ctx.fillRect(this.canvasWidth - 500, this.canvasHeight - 150, 300, 150);
  
      if(selectedUnit) {
        const spriteSheet = this.getSpriteSheet(0);
        const type = selectedUnit.getComponent(Unit).value;
        const spritePos = this.getSpriteSheetPosition(type);

        this.ctx.drawImage(
          spriteSheet,
          spritePos.x,
          spritePos.y,
          spritePos.width,
          spritePos.height,
          this.canvasWidth - 550, 
          this.canvasHeight - 150,
          100,
          100
        );

        const health = selectedUnit.getComponent(Health).value;
        const damage = selectedUnit.getComponent(Damage).value;
        const range = selectedUnit.getComponent(Range).value;
        const sight = selectedUnit.getComponent(Sight).value;
        const speed = selectedUnit.getComponent(Speed).value;

        this.ctx.font = "18px Arial";
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "center";

        this.ctx.fillText("HP: " + health, this.canvasWidth - 250, this.canvasHeight - 45);
        this.ctx.fillText("DG: " + damage, this.canvasWidth - 320, this.canvasHeight - 45);
        this.ctx.fillText("RA: " + range, this.canvasWidth - 390, this.canvasHeight - 45);
        this.ctx.fillText("SI: " + sight, this.canvasWidth - 250, this.canvasHeight - 85);
        this.ctx.fillText("SP: " + speed, this.canvasWidth - 320, this.canvasHeight - 85);
      }
    }
  }

  drawMap() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.canvasWidth - 250, 10, 240, 150);

    this.ctx.fillStyle = "white";
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "white";
    this.ctx.strokeRect(this.canvasWidth - 220, 30, 180, 100);
  }

  getSpriteSheet(type) {
    const spriteSheets = this.queries.unitImages.results;

    for (let i = 0; i < spriteSheets.length; i++) {
        let image = spriteSheets[i].getMutableComponent(Image);
        let imageType = image.name.substr(0, image.name.indexOf("."));
    
        if (imageType == type) {
            return image.value;
        }
    }

    console.error("Could not find corresponding sprite sheet from given type");
    return "Error";
  }

  getSpriteSheetPosition(variation) {
      let position = {};

      position.width = 194;
      position.height = 194;
      position.x = (variation % 11) * 194;
      position.y = Math.floor(variation / 11) * 194;

      return position;
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
  },
  backgroundImages: {
		components: [Image, BackgroundImage]
	},
  unitImages: {
		components: [Image, UnitImage]
	},
};
