import { Layer } from "@/Component";
import { Component, System } from "@/Ecsy";

export class SceneRenderSystem extends System {
  execute(delta: Number, time: Number) {
    const layer = this.queries.layer.results[0];
    console.log(layer.value);
  }
}

SceneRenderSystem.queries = {
    layer: {
        components: [Layer]
    }
};