import { System } from "../../Library/Ecsy";
import {
	Block,
	Timer,
	Unit, 
	Health, 
	Damage, 
	Sight, 
	Range, 
	Speed,
  Tile,
	MapPosition,
	CanvasPosition, 
	ActionStatus, 
	MovePosition, 
	AttackPosition, 
	SelectPosition, 
	UnitImage,
	CurrentFocus,
	CurrentSelect,
  Image,
  TileMap
} from "../../Component";
import { TileSize, UnitType } from "../../Type";
import { cubeToPixel, drawMovingTile, tilesInRange, drawBoundary, getTilesInRange } from "../../Util";

export class UnitRenderSystem extends System {
	execute(delta, time) {
    this.drawMovementRange();
		this.drawUnits();
    //this.stop();
	}

	drawUnits() {
		const spriteSheet = this.getSpriteSheet(0);

		this.queries.units.results.forEach((entity) => {
			const canvasPos = entity.getComponent(CanvasPosition);
			const type = entity.getComponent(Unit).value;
			const spritePos = this.getSpriteSheetPosition(type);

			this.ctx.drawImage(
				spriteSheet,
				spritePos.x,
				spritePos.y,
				spritePos.width,
				spritePos.height,
				canvasPos.x - 35,
				canvasPos.y - 40,
				70,
				70
			);
		});
	}

  drawMovementRange() {
    const selectedUnit = this.queries.selectedUnit.results[0];

    if(selectedUnit) {
      const tileMap = this.queries.tileMap.results[0].getMutableComponent(TileMap).value;
      const speed = selectedUnit.getComponent(Speed).value;
      const pos = selectedUnit.getComponent(MapPosition);
      const mapPos = {x: pos.x, y: pos.y, z: pos.z};

      let weightMap = getTilesInRange(mapPos, speed * 2); 

      let nodes = [{x: mapPos.x, y: mapPos.y, z: mapPos.z, weight: 0}];
      while(nodes.length !== 0) {
        let new_nodes = [];
        nodes.forEach(node => {
          for(let x=-1; x <= 1; x++) {
            for(let y = Math.max(-1, -x-1); y <= Math.min(1, -x+1); y++){
              let z = -x -y;

              if(!(x === 0 && y === 0 && z === 0) &&
               tileMap[node.x + x] &&
               tileMap[node.x + x][node.y + y] &&
               tileMap[node.x + x][node.y + y][node.z + z]) {
                let curWeight = node.weight + tileMap[node.x + x][node.y + y][node.z + z].getComponent(Tile).weight;
  
                if (curWeight < weightMap[node.x + x][node.y + y][node.z + z] && curWeight <= speed) {
                  weightMap[node.x + x][node.y + y][node.z + z] = curWeight;
                  new_nodes.push({x: node.x + x, y: node.y + y, z: node.z + z, weight: curWeight});
                }
              }
            }
          }
        });

        nodes = new_nodes;
      }

      for(const x in weightMap) {
        for(const y in weightMap[x]) {
          for(const z in weightMap[x][y]) {
            if(weightMap[x][y][z] <= speed) {
              const pixelPos = cubeToPixel(x, z, TileSize.REGULAR);
              drawMovingTile(this.ctx, pixelPos.x, pixelPos.y);
            }
          }
        }
      }
    }
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

UnitRenderSystem.queries = {
	units: {
		components: [Unit, MapPosition, CanvasPosition]
	},
	unitImages: {
		components: [Image, UnitImage]
	},
  selectedUnit: {
    components: [CurrentSelect, Unit, MapPosition, CanvasPosition]
  },
	control: {
		components: [Block, Timer]
	},
	actionStatus: {
		components: [ActionStatus, MovePosition, AttackPosition, SelectPosition]
	},
	focusedUnit: {
		components: [CurrentFocus, Unit, MapPosition]
	},
  tileMap: {
    components: [TileMap]
  }
};