import { System } from "../../../Library/Ecsy";
import { SceneStatus } from "../../../Component";
import { SceneType } from "../../../Type";

export class MenuRenderSystem extends System {
	// This method will get called on every frame by default
	execute(delta, time) {
        const scene = this.queries.sceneStatus.results[0].getComponent(SceneStatus);

        this.clearScreen();
    }
}

// Define a query of entities
MenuRenderSystem.queries = {
	sceneStatus: {
		components: [SceneStatus]
	}
};