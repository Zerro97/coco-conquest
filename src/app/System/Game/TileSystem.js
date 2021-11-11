import { System } from "../../Library/Ecsy";
import {
  Tile,
  MapPosition,
  CurrentHover,
  CurrentSelect,
  CanvasPosition,
  TileImage,
  Image,
} from "../../Component";
import {
  cubeToPixel,
  drawHoveringTile,
  drawSelectedTile,
  drawImageTile,
} from "../../Util";
import { TileSize } from "../../Type";

export class TileSystem extends System {
  // This method will get called on every frame by default
  execute(delta, time) {
    this.drawTiles();
    this.updateTiles();
  }

  drawTiles() {
    this.drawTileImage();
    this.drawHoverTile();
    this.drawSelectedTile();
  }

  drawTileImage() {
    this.queries.tiles.results.forEach((entity) => {
      let tile = entity.getMutableComponent(Tile);
      let tilePos = entity.getMutableComponent(MapPosition);
      let canvasPos = cubeToPixel(tilePos.x, tilePos.z, TileSize.REGULAR);

      const spriteSheet = this.getSpriteSheet(tile.type);
      const spritePos = this.getSpriteSheetPosition(tile.variation);

      this.ctx.drawImage(
        spriteSheet,
        spritePos.x,
        spritePos.y,
        spritePos.width,
        spritePos.height,
        canvasPos.x - TileSize.REGULAR,
        canvasPos.y - TileSize.REGULAR,
        TileSize.REGULAR * 2,
        TileSize.REGULAR * 2
      );
    });
  }

  drawHoverTile() {
    const canvasPos = this.queries.currentHover.results[0]?.getMutableComponent(CanvasPosition);

    if(canvasPos) {
      drawHoveringTile(this.ctx, canvasPos.x, canvasPos.y);
    }
  }

  drawSelectedTile() {
    const canvasPos = this.queries.currentSelect.results[0]?.getMutableComponent(CanvasPosition);

    if(canvasPos) {
      drawSelectedTile(this.ctx, canvasPos.x, canvasPos.y);
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

    position.width = 186;
    position.height = 190;
    position.x = (variation % 9) * 210 + 12;
    position.y = Math.floor(variation / 9) * 210 + 10;

    return position;
  }

  updateTiles() {}
}

// Define a query of entities
TileSystem.queries = {
  currentHover: {
    components: [CurrentHover, CanvasPosition, Tile],
  },
  currentSelect: {
    components: [CurrentSelect, CanvasPosition, Tile],
  },
  tiles: {
    components: [Tile],
  },
  tileImages: {
    components: [Image, TileImage],
  },
};
