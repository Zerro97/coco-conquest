import { System } from "../../Library/Ecsy";
import {
    
} from "../../Component";
import {  } from "../../Util";
import {  } from "../../Type";

export class MapEditorRenderSystem extends System {
    execute(delta, time) {
        this.drawTiles();
        this.drawEditPanel();
    }

    drawEditPanel() {

    }

    drawTiles() {
        
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
    tiles: {
        components: [Tile],
    },
    tileImages: {
        components: [Image, TileImage],
    },
};