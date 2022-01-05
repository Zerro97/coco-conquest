import { System } from "../../../../Library/Ecsy";
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
  CanvasPosition,
  Hud,
  Radius,
  Size,
  Team,
  Money, 
  MoneyGeneration, 
  Food, 
  FoodGeneration, 
  Science, 
  ScienceGeneration, 
  GlobalStatus, 
  ResourceStatus
} from "../../../../Component";
import { ActionType, IconType, HudType, BuildingType } from "../../../../Type";
import { 
  arcToPoint, 
  drawTurnButton, 
  drawHoveringTurnButton, 
  drawMap, 
  drawTurnBox,
  drawTeamIcon,
  drawProductionPanel,
  drawProductionCategory,
  drawProductionButton,
  drawSelectedTeamIcon,
  drawHoveringProductionButton,
  drawTopPanel,
  drawScienceButton
} from "../../../../Util";

export class HudRenderSystem extends System {
  execute(delta, time) {
    this.ctx.restore();

    this.drawHudEntities();
    this.drawNotHudEntities();
    this.drawHoveringHuds();
  }

  drawNotHudEntities() {
    this.drawTopPanel();
    this.drawResources();
    this.drawTurn();
    this.drawUnitPanel();
  }

  drawHudEntities() {
    // Conditions for drawing some huds
    const selectedBuilding = this.queries.selectedBuilding.results[0];
    const isCastleSelected = selectedBuilding?.getComponent(Building).value === BuildingType.CASTLE;

    if(isCastleSelected) {
      console.log("Need to remove the production panel game hud!");
    }

    this.queries.huds.results.forEach(hud => {
      const pos = hud.getComponent(CanvasPosition);
      const type = hud.getComponent(Hud).type;

      switch (type) {
        case HudType.TURN_BUTTON: {
          const radius = hud.getComponent(Radius).value;
          drawTurnButton(this.ctx, pos, radius);

          break;
        }
        case HudType.MAP: {
          const size = hud.getComponent(Size);
          //drawMap(this.ctx, pos, size);

          break;
        }
        case HudType.SCIENCE_BUTTON: {
          const radius = hud.getComponent(Radius).value;
          drawScienceButton(this.ctx, pos, radius);

          break;
        }
        case HudType.PERK_BUTTON: {
          const radius = hud.getComponent(Radius).value;
          drawScienceButton(this.ctx, pos, radius);

          break;
        }
        case HudType.PRODUCTION_PANEL: {
          if(isCastleSelected) {
            const size = hud.getComponent(Size);
            drawProductionPanel(this.ctx, pos, size);
          }

          break;
        }
        case HudType.PRODUCTION_UNIT: {
          if(isCastleSelected) {
            const size = hud.getComponent(Size);
            drawProductionCategory(this.ctx, pos, size, "Units");
          }

          break;
        }
        case HudType.PRODUCTION_BUILDING: {
          if(isCastleSelected) {
            const size = hud.getComponent(Size);
            drawProductionCategory(this.ctx, pos, size, "Buildings");
          }

          break;
        }
        case HudType.PRODUCTION_BUTTON: {
          if(isCastleSelected) {
            const size = hud.getComponent(Size);
            drawProductionButton(this.ctx, pos, size, "Warrior");
          }

          break;
        }
        case HudType.TEAM_ICON: {
          const radius = hud.getComponent(Radius).value;
          const team = hud.getComponent(Team).value;
          const currentTurn = this.queries.turn.results[0].getComponent(Turn).turnProgress;

          if(currentTurn === team) {
            drawSelectedTeamIcon(this.ctx, pos, radius, team+1);
          } else {
            drawTeamIcon(this.ctx, pos, radius, team+1);
          }

          break;
        }
      }
    });
  }

  drawHoveringHuds() {
    const hud = this.queries.currentHudHover.results[0];

    if(hud) {
      // Conditions for drawing some huds
      const selectedBuilding = this.queries.selectedBuilding.results[0];
      const isCastleSelected = selectedBuilding?.getComponent(Building).value === BuildingType.CASTLE;

      const pos = hud.getComponent(CanvasPosition);
      const type = hud.getComponent(Hud).type;
  
      switch (type) {
        case HudType.TURN_BUTTON: {
          const radius = hud.getComponent(Radius).value;
  
          drawHoveringTurnButton(this.ctx, pos, radius);
          break;
        }
        case HudType.PRODUCTION_BUTTON: {
          if(isCastleSelected) {
            const size = hud.getComponent(Size);
            drawHoveringProductionButton(this.ctx, pos, size, "Warrior");
          }

          break;
        }
      }
    }
  }

  drawTopPanel(){
    drawTopPanel(this.ctx, {x:0, y:0}, {width: this.canvasWidth, height: 30});
  }

  drawResources() {
    const iconSpriteSheet2 = this.getIconSpriteSheet(1);
    const coin = this.getIconSpriteSheetPosition(IconType.COIN);

    const iconSpriteSheet1 = this.getIconSpriteSheet(0);
    const science = this.getIconSpriteSheetPosition(IconType.INTELLIGENCE);
    const fame = this.getIconSpriteSheetPosition(IconType.DISGUISED);

    this.ctx.drawImage(
      iconSpriteSheet2,
      coin.x,
      coin.y,
      coin.width,
      coin.height,
      5, 
      5,
      20,
      20
    );

    const resourceStatus = this.queries.resourceStatus.results[0].getComponent(ResourceStatus);
    const currentMoney = resourceStatus.money;

    this.ctx.font = "15px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(currentMoney, 55, 20);

    this.ctx.drawImage(
      iconSpriteSheet1,
      fame.x,
      fame.y,
      fame.width,
      fame.height,
      85, 
      5,
      20,
      20
    );
    this.ctx.fillText(currentMoney, 135, 20);

    this.ctx.drawImage(
      iconSpriteSheet1,
      science.x,
      science.y,
      science.width,
      science.height,
      165, 
      5,
      20,
      20
    );
    this.ctx.fillText(currentMoney, 215, 20);
  }

  drawTurn() {
    const turn = this.queries.turn.results[0].getComponent(Turn);

    drawTurnBox(this.ctx, {x: this.canvasWidth/2 + 50, y: -10}, turn.currentTurn);
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
        variation %= 64;
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
  resourceStatus: {
    components: [ResourceStatus]
  },
};
