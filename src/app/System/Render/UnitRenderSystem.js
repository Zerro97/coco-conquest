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
      const speed = 10; //selectedUnit.getComponent(Speed).value;
      const pos = selectedUnit.getComponent(MapPosition);
      const mapPos = {x: pos.x, y: pos.y, z: pos.z};

      //const weightMap = getTilesInRange(mapPos, range * 2);
      let weightMap = getTilesInRange(mapPos, 10 * 2); 
      // for(const x in distMap) {
      //   for(const y in distMap[x]) {
      //     for(const z in distMap[x][y]) {
      //       if(tileMap[x] && tileMap[x][y] && tileMap[x][y][z]) {
      //         weightMap[x][y][z] = tileMap[x][y][z].getComponent(Tile).weight;
      //       }
      //     }
      //   }
      // }

      //weightMap[mapPos.x][mapPos.y][mapPos.z] = 1;
      let nodes = [{x: mapPos.x, y: mapPos.y, z: mapPos.z, weight: 1}];
      while(nodes.length !== 0) {
        let new_nodes = [];
        nodes.forEach(node => {
          console.log(node);
          for(let x=-1; x <= 1; x++) {
            for(let y = Math.max(-1, -x-1); y <= Math.min(1, -x+1); y++){
              let z = -x -y;

              if(!(x === 0 && y === 0 && z === 0)) {
                let curWeight = node.weight + tileMap[node.x + x][node.y + y][node.z + z].getComponent(Tile).weight;
  
                // TODO: check if the tile is out of map bounds
                if (curWeight < weightMap[node.x + x][node.y + y][node.z + z] && curWeight < speed) {
                  weightMap[node.x + x][node.y + y][node.z + z] = curWeight;
                  new_nodes.push({x: node.x + x, y: node.y + y, z: node.z + z, weight: curWeight});
                }
              }
            }
          }
        });

        nodes = new_nodes;
        console.log(tileMap); //Error at: [12][-17][5]
        console.log("END", nodes);
      }
      //console.log(weightMap);
      this.stop();

      // for(let i=0; i<range; i++) {
      //   for(let j=0; j<range; j++) {
          
      //   }
      // }

      // const tiles = tilesInRange(mapPos, range);

      // for(let i=0; i<tiles.length; i++) {
      //   const pos = cubeToPixel(tiles[i].x, tiles[i].z, TileSize.REGULAR);
      //   const edges = [false, false, false, false, false, false];
      //   drawMovingTile(this.ctx, pos.x, pos.y);
      // }
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