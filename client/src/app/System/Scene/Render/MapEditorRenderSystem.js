import { System } from "../../../Library/Ecsy";
import {
    Tile,
    TileImage,
    Image,
    SceneStatus,
    MapEditorStatus,
    CanvasPosition
} from "../../../Component";
import { drawEditPanel, drawTileGrid } from "../../../Util";
import { SceneType } from "../../../Type";

export class MapEditorRenderSystem extends System {
    execute(delta, time) {
        const scene = this.queries.sceneStatus.results[0].getComponent(SceneStatus);

        if(scene.currentScene === SceneType.MAP_EDITOR) {
            this.drawTiles();
            this.drawEditPanel();
        }
    }

    drawEditPanel() {
        drawEditPanel(this.ctx, {x: this.canvasWidth-350, y: 30}, {width: 320, height: this.canvasHeight-60});
    }

    drawTiles() {
        const mapEditorStatus = this.queries.mapEditorStatus.results[0].getComponent(MapEditorStatus);
        const width = mapEditorStatus.width;
        const height = mapEditorStatus.height;
        const name = mapEditorStatus.name;
        const playerCount = mapEditorStatus.playerCount;

        this.queries.tiles.results.forEach(tile => {
            let canvasPos = tile.getComponent(CanvasPosition);
            drawTileGrid(this.ctx, canvasPos.x, canvasPos.y);
        });
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
};