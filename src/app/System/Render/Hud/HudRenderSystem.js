import { System } from "../../../Library/Ecsy";
import {
  ActionStatus, 
  CurrentSelect, 
  Damage, 
  Health, 
  Range, 
  Sight, 
  Speed, 
  Tile, 
  Unit, 
  Building, 
  BackgroundImage, 
  Image, 
  UnitImage, 
  IconImage, 
  Turn,
  CurrentHudHover,
  CurrentHudSelect,
  CanvasPosition,
  Hud,
  Radius
} from "../../../Component";
import { ActionType, BackgroundType, IconType, HudType } from "../../../Type";
import { roundRect, arcToPoint, drawTurnButton, drawHoveringTurnButton } from "../../../Util";

export class HudRenderSystem extends System {
  execute(delta, time) {
    this.ctx.restore();

    this.drawHudEntities();
    this.drawNotHudEntities();
    this.drawHoveringHuds();
  }

  drawNotHudEntities() {
    this.drawTPanel();
    this.drawTRPanel();
    this.drawUnitPanel();
  }

  drawHudEntities() {
    this.queries.huds.results.forEach(hud => {
      const pos = hud.getComponent(CanvasPosition);
      const type = hud.getComponent(Hud).type;

      switch (type) {
        case HudType.TURN_BUTTON: {
          const radius = hud.getComponent(Radius).value;

          drawTurnButton(this.ctx, pos, radius);
          break;
        }
      }
    });
  }

  drawHoveringHuds() {
    const hud = this.queries.currentHudHover.results[0];

    if(hud) {
      const pos = hud.getComponent(CanvasPosition);
      const type = hud.getComponent(Hud).type;
  
      switch (type) {
        case HudType.TURN_BUTTON: {
          const radius = hud.getComponent(Radius).value;
  
          drawHoveringTurnButton(this.ctx, pos, radius);
          break;
        }
      }
    }
  }

  drawTRPanel() {
    this.drawMap();
  }

  drawTPanel(){
    this.ctx.fillStyle = "rgb(39, 42, 54)";
    this.ctx.fillRect(0, 0, this.canvasWidth, 50);

    this.drawResources();
    this.drawTurn();
  }

  drawResources() {
    const iconSpriteSheet2 = this.getIconSpriteSheet(1);
    const coin = this.getIconSpriteSheetPosition(IconType.COIN);
    const production = this.getIconSpriteSheetPosition(IconType.AXE);

    const iconSpriteSheet1 = this.getIconSpriteSheet(0);
    const science = this.getIconSpriteSheetPosition(IconType.INTELLIGENCE);

    this.ctx.drawImage(
      iconSpriteSheet2,
      coin.x,
      coin.y,
      coin.width,
      coin.height,
      10, 
      10,
      30,
      30
    );

    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.fillText(100, 70, 30);

    this.ctx.drawImage(
      iconSpriteSheet2,
      production.x,
      production.y,
      production.width,
      production.height,
      120, 
      10,
      30,
      30
    );
    this.ctx.fillText(20, 180, 30);

    this.ctx.drawImage(
      iconSpriteSheet1,
      science.x,
      science.y,
      science.width,
      science.height,
      230, 
      10,
      30,
      30
    );
    this.ctx.fillText(30, 290, 30);
  }

  drawTurn() {
    const turn = this.queries.turn.results[0].getComponent(Turn);

    this.ctx.beginPath();
    this.ctx.moveTo(this.canvasWidth/2 - 80, -20);
    this.ctx.lineTo(this.canvasWidth/2 - 80, 65);
    this.ctx.lineTo(this.canvasWidth/2, 90);
    this.ctx.lineTo(this.canvasWidth/2 + 80, 65);
    this.ctx.lineTo(this.canvasWidth/2 + 80, -20);
    this.ctx.closePath();

    this.ctx.fillStyle = "rgb(52, 60, 89)";
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 5;
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.font = "40px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.fillText(turn.currentTurn, this.canvasWidth/2, 40);

    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.6";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Turn", this.canvasWidth/2, 65);
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
    this.ctx.fillStyle = "rgb(41, 54, 96)";
    this.ctx.fillRect(0, this.canvasHeight - 170, 260, 170);

    let grad1 = this.ctx.createLinearGradient(0, 0, 260, 0);
    grad1.addColorStop(0, "rgb(28, 33, 50)");
    grad1.addColorStop(0.05, "rgba(28, 33, 50, 0)");
    grad1.addColorStop(0.95, "rgba(28, 33, 50, 0)");
    grad1.addColorStop(1.0, "rgb(28, 33, 50)");

    let grad2 = this.ctx.createLinearGradient(0, this.canvasHeight - 170, 0, this.canvasHeight);
    grad2.addColorStop(0, "rgb(28, 33, 50)");
    grad2.addColorStop(0.05, "rgba(28, 33, 50, 0)");
    grad2.addColorStop(0.95, "rgba(28, 33, 50, 0)");
    grad2.addColorStop(1.0, "rgb(28, 33, 50)");

    this.ctx.fillStyle = grad1;
    this.ctx.fillRect(0, this.canvasHeight - 170, 260, 170);

    this.ctx.fillStyle = grad2;
    this.ctx.fillRect(0, this.canvasHeight - 170, 260, 170);

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(10, this.canvasHeight - 160, 240, 150);

    this.ctx.fillStyle = "white";
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "white";
    this.ctx.strokeRect(30, this.canvasHeight - 140, 200, 110);
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

      if(variation >= 64) {
        variation %= 63;
      }

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

HudRenderSystem.queries = {
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
  turn: {
    components: [Turn]
  },
  huds: {
    components: [Hud, CanvasPosition]
  },
  currentHudHover: {
    components: [Hud, CurrentHudHover]
  },
  currentHudSelect: {
    components: [Hud, CurrentHudSelect]
  },
};
