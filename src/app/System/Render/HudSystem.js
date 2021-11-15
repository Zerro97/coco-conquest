import { System } from "../../Library/Ecsy";
import {
  ActionStatus, CurrentSelect, Damage, Health, Range, Sight, Speed, Tile, Unit, Building, BackgroundImage, Image, UnitImage, IconImage
} from "../../Component";
import { ActionType, BackgroundType } from "../../Type";
import { roundRect, arcToPoint } from "../../Util";

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
      const p0 = {x: this.canvasWidth - 205, y: this.canvasHeight - 205};
      const p1 = {x: p0.x + 35, y: p0.y + 35};
      const p2 = {x: p0.x + 35, y: p0.y + 170};
      const p3 = {x: p0.x, y: p0.y + 205};
      const c = {x: this.canvasWidth - 110, y: this.canvasHeight - 100};
      
      const arc1 = arcToPoint(p1, p2, c);
      const arc2 = arcToPoint(p3, p0, c);

      this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      this.ctx.beginPath();
      this.ctx.moveTo(p0.x, p0.y);
      this.ctx.lineTo(p1.x, p1.y);
      this.ctx.arc(c.x, c.y, arc1.rad, arc1.start, arc1.end, true);
      this.ctx.lineTo(p3.x, p3.y);
      this.ctx.arc(c.x, c.y, arc2.rad, arc2.start, arc2.end, false);
      this.ctx.closePath();
      this.ctx.fill();

      const p4 = {x: this.canvasWidth - 140, y: this.canvasHeight - 180};
      const p5 = {x: this.canvasWidth - 140, y: this.canvasHeight - 20};
      const arc3 = arcToPoint(p4, p5, {x: this.canvasWidth - 30, y: this.canvasHeight - 100});

      this.ctx.beginPath();
      this.ctx.moveTo(this.canvasWidth - 650, this.canvasHeight - 180);
      this.ctx.lineTo(p4.x, p4.y);
      this.ctx.arc(p5.x, this.canvasHeight - 100, arc3.rad, arc3.start, arc3.end, true);
      this.ctx.lineTo(this.canvasWidth - 650, this.canvasHeight - 20);
      this.ctx.arc(this.canvasWidth - 540, this.canvasHeight - 100, arc3.rad, arc3.start, arc3.end, true);
      this.ctx.closePath();
      this.ctx.fill();
  
      if(selectedUnit) {
        this.ctx.fillStyle = "red";
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        for(let i=0; i<12; i++) {
          this.ctx.rect(this.canvasWidth - 520 + (i*15), this.canvasHeight - 160, 15, 30);
        }
        this.ctx.fill();
        this.ctx.stroke();

        // Unit
        const spriteSheet = this.getSpriteSheet(0);
        const type = selectedUnit.getComponent(Unit).value;
        const spritePos = this.getSpriteSheetPosition(type);

        // Icon
        const iconSpriteSheet1 = this.getIconSpriteSheet(0);
        const iconSpriteSheet2 = this.getIconSpriteSheet(1);
        const damagePos = this.getIconSpriteSheetPosition(0);
        const rangePos = this.getIconSpriteSheetPosition(16);
        const speedPos = this.getIconSpriteSheetPosition(24);

        this.ctx.drawImage(
          spriteSheet,
          spritePos.x,
          spritePos.y,
          spritePos.width,
          spritePos.height,
          this.canvasWidth - 660, 
          this.canvasHeight - 170,
          120,
          120
        );

        

        const health = selectedUnit.getComponent(Health).value;
        const damage = selectedUnit.getComponent(Damage).value;
        const range = selectedUnit.getComponent(Range).value;
        const sight = selectedUnit.getComponent(Sight).value;
        const speed = selectedUnit.getComponent(Speed).value;

        this.ctx.font = "22px Arial";
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "center";

        this.ctx.drawImage(
          iconSpriteSheet1,
          damagePos.x,
          damagePos.y,
          damagePos.width,
          damagePos.height,
          this.canvasWidth - 520, 
          this.canvasHeight - 120,
          50,
          50
        );
        this.ctx.fillText(damage, this.canvasWidth - 495, this.canvasHeight - 45);

        this.ctx.drawImage(
          iconSpriteSheet1,
          rangePos.x,
          rangePos.y,
          rangePos.width,
          rangePos.height,
          this.canvasWidth - 460, 
          this.canvasHeight - 120,
          50,
          50
        );
        this.ctx.fillText(range, this.canvasWidth - 435, this.canvasHeight - 45);

        this.ctx.drawImage(
          iconSpriteSheet2,
          speedPos.x,
          speedPos.y,
          speedPos.width,
          speedPos.height,
          this.canvasWidth - 400, 
          this.canvasHeight - 120,
          50,
          50
        );
        this.ctx.fillText(speed, this.canvasWidth - 375, this.canvasHeight - 45);
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

  getIconSpriteSheet(type) {
    const spriteSheets = this.queries.iconImages.results;

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

  getIconSpriteSheetPosition(variation) {
      let position = {};

      position.width = 250;
      position.height = 250;
      position.x = (variation % 8) * 250;
      position.y = Math.floor(variation / 8) * 250;

      return position;
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
  iconImages: {
		components: [Image, IconImage]
	},
};
