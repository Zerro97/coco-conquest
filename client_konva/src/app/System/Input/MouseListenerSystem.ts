import { HudLayer, KonvaObject, SceneStatus, Stage as StageComp, Tile } from "@/Component";
import { Component, System } from "@/Ecsy";
import { isInsideHexagon } from "@/Util/Math";
import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";

export class MouseListenerSystem extends System {
  execute(delta: Number, time: Number) {
    const stage = this.queries.stage.results[0].getComponent(KonvaObject).value;
    this.listenAtMapEditor(stage);

    this.stop();
  }


  /**
   * Checking for tile hovering:
   * OPTION 1: loop through all the tiles and see if mouse position is within that tile
   * OPTION 2: Given mouse position, draw the hovering tile on correct, calculated position
   * 
   * @param stage 
   */
  listenAtMapEditor(stage: Stage) {
    const tiles = this.queries.tiles.results;

    stage.on("pointermove", () => {
      let mousePos = stage.getPointerPosition();

      tiles.forEach(tile => {
        let tileObj = tile.getComponent(KonvaObject).value;
        let pos = tileObj.getAbsolutePosition();

        if (isInsideHexagon(pos.x, pos.y, mousePos.x, mousePos.y, 50)) {
          tileObj.find(".hover_tile")[0].setAttr("opacity", 0.5);
        }
      })
    })

  }

  toggleHoverTile() {

  }
}

MouseListenerSystem.queries = {
  stage: {
    components: [KonvaObject, StageComp]
  },
  sceneStatus: {
    components: [SceneStatus]
  },
  tiles: {
    components: [Tile, KonvaObject]
  }
};