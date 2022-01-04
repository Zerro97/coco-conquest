import { System } from "../../../Library/Ecsy";
import { 
	CurrentHudSelect, 
	CurrentHudClick,
	SceneStatus, 
	MenuHud, 
	Team, 
	SocketEvents, 
	Room,
	HudHoverable,
	HudSelectable,
	MapPosition,
	CanvasPosition,
	Shape,
	Size,
	LobbyScene,
	Scene,
	MapEditorStatus,
	Tile,
	Hoverable,
	Selectable,
	RightSelectable,
	GameObject
} from "../../../Component";
import {
	SceneSystem
} from "../../../System";
import { MenuHudType, SceneType, ObjectShape, TileSize,GameObjectType } from "../../../Type";
import { getRandomString, evenrToCube, cubeToPixel } from "../../../Util";

export class MenuSystem extends System {
	// This method will get called on every frame by default
	execute(delta, time) {
        this.checkMenuHudClick();
    }

	checkMenuHudClick() {
		const clickedMenu = this.queries.clickedMenuHud.results[0];
		const socketAction = this.queries.socketAction.results[0].getMutableComponent(SocketEvents);
		
		if(clickedMenu) {
			const scene = this.queries.sceneStatus.results[0].getMutableComponent(SceneStatus);
			const type = clickedMenu.getComponent(MenuHud).type;

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
				case MenuHudType.MAP_EDITOR_BUTTON: {
					scene.currentScene = SceneType.MAP_EDITOR_SETUP;
					break;
				}
				case MenuHudType.SETTING_BUTTON: {
					scene.currentScene = SceneType.SETTING;
					break;
				}
				case MenuHudType.EXIT_BUTTON: {
					break;
				}

				// Map Editor Set Up Scene
				case MenuHudType.MAP_EDITOR_SETUP_GO_BACK_BUTTON: {
					scene.currentScene = SceneType.MENU;
					break;
				}
				case MenuHudType.MAP_EDITOR_SETUP_BUTTON: {
					scene.currentScene = SceneType.MAP_EDITOR;
					
					// Create map entity
					this.world
						.createEntity()
						.addComponent(MapEditorStatus, {
							name: "New World",
							width: 30,
							height: 30,
							playerCount: 2
						});

					// Create Tiles
					let count = 0;
					for(let i=0; i<30; i++) {
						for(let j=0; j<30; j++) {
							let cube = evenrToCube(i, j);
							let pixel = cubeToPixel(cube.x, cube.z, TileSize.REGULAR);
							count += 1;

							this.world
								.createEntity()
								.addComponent(GameObject, { value: GameObjectType.TILE })
								.addComponent(MapPosition, { x: cube.x, y: cube.y, z: cube.z })
								.addComponent(CanvasPosition, { x: pixel.x, y: pixel.y })
								.addComponent(Hoverable)
								.addComponent(Selectable)
								.addComponent(RightSelectable)
								.addComponent(Shape, { type: ObjectShape.HEXAGON })
								.addComponent(Tile, {
									id: count,
									base: 0,
									type: 30,
									variation: 0,
									weight: 0,
								});
						}
					}

					break;
				}
				case MenuHudType.MAP_EDITOR_GO_BACK_BUTTON: {
					scene.currentScene = SceneType.MENU;
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
					let team = clickedMenu.getMutableComponent(Team);
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
					const roomCount = this.queries.lobbyHud.results.length;

					this.world
						.createEntity()
						.addComponent(MenuHud, {type: MenuHudType.LOBBY_ROOM_ROW})
						.addComponent(HudHoverable)
						.addComponent(HudSelectable)
						.addComponent(CanvasPosition, {x: this.canvasWidth/2 - 400, y: 120 + roomCount * 35})
						.addComponent(Shape, {type: ObjectShape.RECTANGLE})
						.addComponent(Size, {width: 800, height: 30})
						.addComponent(LobbyScene)
						.addComponent(Scene, {value: SceneType.LOBBY})
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

				// Multi Player Stage Scene
				case MenuHudType.MULTI_STAGE_START_BUTTON: {
					scene.currentScene = SceneType.GAME;
					break;
				}
				case MenuHudType.MULTI_STAGE_LEAVE_BUTTON: {
					scene.currentScene = SceneType.LOBBY;
					break;
				}
			}
			
			// Resume scene system to turn on/off corresponding systems
			this.world.getSystem(SceneSystem).play();
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
	clickedMenuHud: {
		components: [CurrentHudClick, MenuHud]
	},
	socketAction: {
		components: [SocketEvents]
	},
	lobbyHud: {
		components: [MenuHud, LobbyScene]
	},
};