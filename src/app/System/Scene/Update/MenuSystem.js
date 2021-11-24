import { System } from "../../../Library/Ecsy";
import { CurrentHudSelect, SceneStatus, MenuHud } from "../../../Component";
import { MenuHudType, SceneType } from "../../../Type";

export class MenuSystem extends System {
	// This method will get called on every frame by default
	execute(delta, time) {
        this.checkSceneTransition();
    }

	checkSceneTransition() {
		const selectedMenu = this.queries.selectedMenuHud.results[0];
		
		if(selectedMenu) {
			const scene = this.queries.sceneStatus.results[0].getMutableComponent(SceneStatus);
			const type = selectedMenu.getComponent(MenuHud).type;

			switch(type) {
				// Main Menu
				case MenuHudType.SINGLE_PLAY_BUTTON: {
					scene.currentScene = SceneType.SINGLE_PLAY;
					break;
				}
				case MenuHudType.MULTI_PLAY_BUTTON: {
					scene.currentScene = SceneType.MULTI_PLAY;
					break;
				}
				case MenuHudType.SETTING_BUTTON: {
					scene.currentScene = SceneType.SETTING;
					break;
				}
				case MenuHudType.EXIT_BUTTON: {
					break;
				}
				// Single/Multi Play Scene
				case MenuHudType.SETUP_GAME_BUTTON: {
					scene.currentScene = SceneType.SETUP_GAME;
					break;
				}
				case MenuHudType.LOAD_GAME_BUTTON: {
					//scene.currentScene = SceneType.GAME;
					break;
				}
				case MenuHudType.JOIN_GAME_BUTTON: {
					//scene.currentScene = SceneType.GAME;
					break;
				}
				case MenuHudType.SINGLE_GO_BACK_BUTTON: {
					scene.currentScene = SceneType.MENU;
					break;
				}
				case MenuHudType.MULTI_GO_BACK_BUTTON: {
					scene.currentScene = SceneType.MENU;
					break;
				}
				// 
			}
		}
	}
}

// Define a query of entities
MenuSystem.queries = {
	sceneStatus: {
		components: [SceneStatus]
	},
	selectedMenuHud: {
        components: [CurrentHudSelect, MenuHud]
    }
};