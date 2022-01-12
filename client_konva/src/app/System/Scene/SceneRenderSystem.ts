import { HudLayer, SceneStatus } from "@/Component";
import { Component, System } from "@/Ecsy";

export class SceneRenderSystem extends System {
  execute(delta: Number, time: Number) {
    this.drawHuds();
  }

  drawHuds() {
    //const layer = this.queries.hudLayer.results[0].getComponent(HudLayer);


  }
}

SceneRenderSystem.queries = {
  hudLayer: {
    components: [HudLayer]
  },
  sceneStatus: {
    components: [SceneStatus]
  }
};