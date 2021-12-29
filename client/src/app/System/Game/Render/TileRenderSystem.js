import { System } from "../../../Library/Ecsy";
import {
  Tile,
  MapPosition,
  CurrentHover,
  CurrentSelect,
  CanvasPosition,
  TileImage,
  Image,
  Region,
  SceneStatus
} from "../../../Component";
import {
  cubeToPixel,
  drawHoveringTile,
  drawSelectedTile,
  drawImageTile,
} from "../../../Util";
import { TileSize, SceneType } from "../../../Type";

export class TileRenderSystem extends System {
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
      let region = entity.getMutableComponent(Region);
      let canvasPos = entity.getMutableComponent(CanvasPosition);
      let mapPos = entity.getMutableComponent(MapPosition);

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

      this.ctx.font = "20px Arial";
      this.ctx.fillStyle = "red";
      this.ctx.textAlign = "center";
      //this.ctx.fillText(region.region, canvasPos.x, canvasPos.y);
      this.ctx.fillText(mapPos.x + " " + mapPos.y + " " + mapPos.z, canvasPos.x, canvasPos.y);
    });
  }

  drawHoverTile() {
    const canvasPos = this.queries.currentHover.results[0]?.getMutableComponent(CanvasPosition);

    if (canvasPos) {
      drawHoveringTile(this.ctx, canvasPos.x, canvasPos.y);
    }
  }

  drawSelectedTile() {
    const canvasPos =
      this.queries.currentSelect.results[0]?.getMutableComponent(
        CanvasPosition
      );

    if (canvasPos) {
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

    position.width = 93;
    position.height = 95;
    position.x = (variation % 9) * 105 + 6;
    position.y = Math.floor(variation / 9) * 105 + 5;

    return position;
  }

  updateTiles() {}
}

// Define a query of entities
TileRenderSystem.queries = {
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
  sceneStatus: {
    components: [SceneStatus]
  }
};
