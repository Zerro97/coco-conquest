import { System } from "../../../Library/Ecsy";
import {
    Tile,
    TileImage,
    Image,
    SceneStatus,
    MapEditorStatus,
    CanvasPosition,
    CurrentHudHover,
    MenuHud,
    Size
} from "../../../Component";
import { drawEditPanel, drawTileGrid, evenrToCube, cubeToPixel } from "../../../Util";
import { MenuHudType, TileSize } from "../../../Type";

export class MapEditorRenderSystem extends System {
    execute(delta, time) {
        this.drawTiles();

        // Finish Applying Transformations
        this.ctx.restore();
        this.drawHud();
    }

    drawHud() {
        this.drawEditPanel();

        this.queries.mapEditorHud.results.forEach(hud => {
            const type = hud.getComponent(MenuHud).type;
            const pos = hud.getComponent(CanvasPosition);
            const size = hud.getComponent(Size);

            switch(type) {
                case MenuHudType.MAP_EDITOR_GO_BACK_BUTTON: {
                    //drawBackButton(this.ctx, pos, size, "Go Back");
                    break;
                }
            }
        });

        // Hovering Menu
        this.queries.hoveringMapEditorHud.results.forEach(hud => {
            const type = hud.getComponent(MenuHud).type;
            const pos = hud.getComponent(CanvasPosition);
            const size = hud.getComponent(Size);

            switch(type) {
                case MenuHudType.MAP_EDITOR_GO_BACK_BUTTON: {
                    //drawHoveringBackButton(this.ctx, pos, size, "Go Back");
                    break;
                }
            }
        });
    }

    drawEditPanel() {
        drawEditPanel(this.ctx, {x: this.canvasWidth-350, y: 30}, {width: 320, height: this.canvasHeight-60});

        let editCategory = 0;
        switch(editCategory) {
          case 0:
            this.drawEditPanelTiles(editCategory);
            break;
          case 1:
            this.drawEditPanelTiles(editCategory);
            break;
        }
    }

    drawEditPanelTiles(editCategory) {
      const spriteSheet = this.getSpriteSheet(editCategory);

      for(let i=0; i<8; i++) {
        const spritePos = this.getSpriteSheetPosition(i);
        let row = Math.floor(i/3);
        let col = i%3;

        this.ctx.drawImage(
          spriteSheet,
          spritePos.x,
          spritePos.y,
          spritePos.width,
          spritePos.height,
          this.canvasWidth - 330 + col * 320/3,
          40 + row * (this.canvasHeight-60)/8,
          TileSize.REGULAR * 1.4,
          TileSize.REGULAR * 1.4
        );
      }
    }

    drawTiles() {
        // const mapEditorStatus = this.queries.mapEditorStatus.results[0].getComponent(MapEditorStatus);
        // const width = mapEditorStatus.width;
        // const height = mapEditorStatus.height;
        // const name = mapEditorStatus.name;
        // const playerCount = mapEditorStatus.playerCount;

        this.queries.tiles.results.forEach(tile => {
            let canvasPos = tile.getComponent(CanvasPosition);
            drawTileGrid(this.ctx, canvasPos.x, canvasPos.y);

            
        });

        const spriteSheet = this.getSpriteSheet(33);

        for(let i=0; i<5; i++) {
            for(let j=0; j<5; j++) {
                let cube = evenrToCube(i, j);
                let pixel = cubeToPixel(cube.x, cube.z, TileSize.REGULAR);
                const spritePos = this.getSpriteSheetPositionNew(0);

                //this.ctx.fillStyle = "red";
                //this.ctx.fillRect(0,0,200,200);
                this.ctx.drawImage(
                    spriteSheet,
                    spritePos.x,
                    spritePos.y,
                    spritePos.width,
                    spritePos.height,
                    pixel.x,
                    pixel.y,
                    500,
                    500
                );
            }
        }


    }

    getSpriteSheet(type) {
        const spriteSheets = this.queries.tileImages.results;

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

        position.width = 93;
        position.height = 95;
        position.x = (variation % 9) * 105 + 6;
        position.y = Math.floor(variation / 9) * 105 + 5;

        return position;
    }

    getSpriteSheetPositionNew(variation) {
        let position = {};

        position.width = 500;
        position.height = 500;
        position.x = variation * 500;
        //position.y = Math.floor(variation / 9) * 105 + 5;

        return position;
    }
}

MapEditorRenderSystem.queries = {
    mapEditorStatus: {
        components: [MapEditorStatus]
    },
    tiles: {
        components: [Tile]
    },
    tileImages: {
        components: [Image, TileImage],
    },
    sceneStatus: {
		components: [SceneStatus]
	},
    mapEditorHud: {
        components: [MenuHud]
    },
    hoveringMapEditorHud: {
        components: [CurrentHudHover, MenuHud]
    },
};