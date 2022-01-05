import { System } from "../../../Library/Ecsy";
import {
    Tile,
    TileImage,
    Image,
    SceneStatus,
    MapEditorStatus,
    CanvasPosition,
    CurrentHudHover,
    CurrentHover,
    CurrentPress,
    MenuHud,
    Size
} from "../../../Component";
import { drawEditPanel, drawTileGrid, drawImageTile, drawHoveringTile } from "../../../Util";
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

        // Draw tile grids
        this.queries.tiles.results.forEach(tile => {
            let canvasPos = tile.getComponent(CanvasPosition);
            drawTileGrid(this.ctx, canvasPos.x, canvasPos.y);
        });

        // Draw Pressed Tile
        const pressPos = this.queries.currentPress.results[0]?.getMutableComponent(CanvasPosition);
        if(pressPos) {
            let spritesheet = this.getSpriteSheet(33);
            let src = this.getSpriteSheetPositionNew(0);
            let dest = {x: pressPos.x, y: pressPos.y, width: TileSize.REGULAR * 2, height: TileSize.REGULAR * 2};
            drawImageTile(this.ctx, spritesheet, src, dest);
        }

        // Draw Hovered Tile
        const hoverPos = this.queries.currentHover.results[0]?.getMutableComponent(CanvasPosition);
        if(hoverPos) {
            console.log("in");
            drawHoveringTile(this.ctx, hoverPos.x, hoverPos.y);
        }

        // for(let i=0; i<5; i++) {
        //     for(let j=0; j<5; j++) {
        //         let cube = evenrToCube(i, j);
        //         let pixel = cubeToPixel(cube.x, cube.z, TileSize.REGULAR);
        //         const spritePos = this.getSpriteSheetPositionNew(j%4);

        //         //this.ctx.fillStyle = "red";
        //         //this.ctx.fillRect(0,0,200,200);
        //         this.ctx.drawImage(
        //             this.getSpriteSheet(33),
        //             spritePos.x,
        //             spritePos.y,
        //             spritePos.width,
        //             spritePos.height,
        //             pixel.x,
        //             pixel.y,
        //             TileSize.REGULAR * 2 + 10,
        //             TileSize.REGULAR * 2 + 10
        //         );
        //     }
        // }

        // for(let i=5; i<10; i++) {
        //     for(let j=0; j<5; j++) {
        //         let cube = evenrToCube(i, j);
        //         let pixel = cubeToPixel(cube.x, cube.z, TileSize.REGULAR);
        //         const spritePos = this.getSpriteSheetPositionNew(j%4);

        //         //this.ctx.fillStyle = "red";
        //         //this.ctx.fillRect(0,0,200,200);
        //         this.ctx.drawImage(
        //             this.getSpriteSheet(34),
        //             spritePos.x,
        //             spritePos.y,
        //             spritePos.width,
        //             spritePos.height,
        //             pixel.x,
        //             pixel.y,
        //             TileSize.REGULAR * 2 + 10,
        //             TileSize.REGULAR * 2 + 10
        //         );
        //     }
        // }

        // for(let i=0; i<5; i++) {
        //     for(let j=5; j<10; j++) {
        //         let cube = evenrToCube(i, j);
        //         let pixel = cubeToPixel(cube.x, cube.z, TileSize.REGULAR);
        //         const spritePos = this.getSpriteSheetPositionNew2(j%4);

        //         //this.ctx.fillStyle = "red";
        //         //this.ctx.fillRect(0,0,200,200);
        //         this.ctx.drawImage(
        //             this.getSpriteSheet(35),
        //             spritePos.x,
        //             spritePos.y,
        //             spritePos.width,
        //             spritePos.height,
        //             pixel.x - 14,
        //             pixel.y - 9,
        //             TileSize.REGULAR * 2 + 23,
        //             TileSize.REGULAR * 2 + 23
        //         );
        //     }
        // }
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

        position.width = 450;
        position.height = 450;
        position.x = variation * 500 + 50;
        position.y = 40;

        return position;
    }

    getSpriteSheetPositionNew2(variation) {
        let position = {};

        position.width = 256;
        position.height = 256;
        position.x = variation * 256;
        position.y = 0;

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
    currentPress: {
        components: [CurrentPress, CanvasPosition, Tile],
    },
    currentHover: {
        components: [CurrentHover, CanvasPosition, Tile],
    },
};