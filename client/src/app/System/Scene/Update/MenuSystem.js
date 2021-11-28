import { System } from "../../../Library/Ecsy";
import { CurrentHudSelect, SceneStatus, MenuHud, Team, SocketEvents, Room } from "../../../Component";
import { MenuHudType, SceneType } from "../../../Type";
import { getRandomString } from "../../../Util";

export class MenuSystem extends System {
	// This method will get called on every frame by default
	execute(delta, time) {
        this.checkMenuHudAction();
    }

	checkMenuHudAction() {
		const selectedMenu = this.queries.selectedMenuHud.results[0];
		const socketAction = this.queries.socketAction.results[0].getMutableComponent(SocketEvents);
		
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
					scene.currentScene = SceneType.LOBBY;
					break;
				}
				case MenuHudType.SETTING_BUTTON: {
					scene.currentScene = SceneType.SETTING;
					break;
				}
				case MenuHudType.EXIT_BUTTON: {
					break;
				}

				// Single Player Scene
				case MenuHudType.SINGLE_SETUP_GAME_BUTTON: {
					scene.currentScene = SceneType.SINGLE_SETUP_GAME;
					break;
				}
				case MenuHudType.LOAD_GAME_BUTTON: {
					//scene.currentScene = SceneType.GAME;
					break;
				}
				case MenuHudType.SINGLE_GO_BACK_BUTTON: {
					scene.currentScene = SceneType.MENU;
					break;
				}

				// Single Player Set Up Scene
				case MenuHudType.PLAYER_TEAM_BUTTON: {
					let team = selectedMenu.getMutableComponent(Team);
					team.value = (team.value + 1) % 4;

					break;
				}
				case MenuHudType.START_BUTTON: {
					scene.currentScene = SceneType.GAME;
					break;
				}
				case MenuHudType.SINGLE_SETUP_GO_BACK_BUTTON: {
					scene.currentScene = SceneType.SINGLE_PLAY;
					break;
				}

				// Lobby Scene
				case MenuHudType.LOBBY_ROOM_ROW: {
					break;
				}
				case MenuHudType.LOBBY_SETUP_GAME_BUTTON: {
					scene.currentScene = SceneType.MULTI_SETUP_GAME;
					break;
				}
				case MenuHudType.LOBBY_JOIN_GAME_BUTTON: {
					socketAction.joiningRoom = true;
					break;
				}
				case MenuHudType.LOBBY_GO_BACK_BUTTON: {
					scene.currentScene = SceneType.MENU;
					break;
				}

				// Multi Player Set Up Scene
				case MenuHudType.MULTI_SETUP_GO_BACK_BUTTON: {
					scene.currentScene = SceneType.LOBBY;
					break;
				}

        case MenuHudType.MULTI_CONFIRM_GAME_BUTTON: {
          this.world
            .createEntity()
            .addComponent(Room, {
              roomId: getRandomString(6),
              roomName: document.getElementById(MenuHudType.MULTI_NAME_INPUT).value,
              roomPass: "",
              creatorName: "",
              curPlayerCount: 1,
              maxPlayerCount: 6,
            });
          socketAction.creatingRoom = true;
					scene.currentScene = SceneType.MULTI_STAGE_GAME;
					break;
				}
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
    },
	socketAction: {
		components: [SocketEvents]
	}
};