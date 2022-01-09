import { Layer } from "@/Component";
import { Component, System } from "@/Ecsy";

export class SceneRenderSystem extends System {
  execute(delta: Number, time: Number) {
    this.drawHuds();
  }

  drawHuds() {
    const layer = this.queries.layer.results[0].getComponent(Layer);
    
    
  }
}

SceneRenderSystem.queries = {
    layer: {
        components: [Layer]
    }
};