import { System } from "../../../Library/Ecsy";
import { 
    SceneStatus,
    CurrentHudHover,
    MenuHud, 
    CanvasPosition, 
    Size, 
    Team,

    MenuScene, 
    SettingScene, 
    SinglePlayScene, 
    SingleSetUpScene, 
    LoadScene, 
    MultiStageScene, 
    MultiSetUpScene, 
    LobbyScene, 
    LoadingScene, 
    EndScene, 
} from "../../../Component";
import { SceneType, MenuHudType } from "../../../Type";
import { 
    drawMenuButton, 
    drawHoverMenuButton, 
    drawPlayerBox, 
    drawStartButton, 
    drawSetupPanels,
    drawHoveringStartButton,
    drawSetupBackButton,
    drawHoveringSetupBackButton,
    drawPlayerTeamButton,
    drawHoveringPlayerTeamButton
} from "../../../Util";

export class MenuRenderSystem extends System {
	// This method will get called on every frame by default
	execute(delta, time) {
        const scene = this.queries.sceneStatus.results[0].getComponent(SceneStatus);

        this.clearScreen();

        switch(scene.currentScene) {
            case SceneType.MENU: {
                this.drawMenu();
                break;
            }
            case SceneType.SETTING: {
                this.drawSetting();
                break;
            }
            // Single Player
            case SceneType.SINGLE_PLAY: {
                this.drawSinglePlay();
                break;
            }
            case SceneType.SINGLE_SETUP_GAME: {
                this.drawSingleSetUpGame();
                break;
            }
            case SceneType.LOAD_GAME: {
                this.drawLoadGame();
                break;
            }
            // Multi Player
            case SceneType.LOBBY: {
                this.drawLobby();
                break;
            }
            case SceneType.MULTI_SETUP_GAME: {
                this.drawMultiSetUpGame();
                break;
            }
            case SceneType.MULTI_STAGE_GAME: {
                this.drawMultiStageGame();
                break;
            }
            // Actual Game
            case SceneType.LOADING_GAME: {
                this.drawLoadingGame();
                break;
            }
            case SceneType.GAME: {
                //this.drawGame();
                break;
            }
            case SceneType.END_GAME: {
                this.drawEndGame();
                break;
            }
        }
	}

    clearScreen() {
        this.ctx.fillStyle = "rgb(41, 54, 96)";
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    drawMenu() {
        // Title
        this.ctx.font = "60px Arial";
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        this.ctx.textAlign = "center";
        this.ctx.fillText("GAME TITLE", this.canvasWidth/2, 250);

        // Menu
        this.queries.menuHud.results.forEach(hud => {
            const type = hud.getComponent(MenuHud).type;
            const pos = hud.getComponent(CanvasPosition);
            const size = hud.getComponent(Size);
            
            switch(type) {
                case MenuHudType.SINGLE_PLAY_BUTTON: {
                    drawMenuButton(this.ctx, pos, size, "Single Play");
                    break;
                }
                case MenuHudType.MULTI_PLAY_BUTTON: {
                    drawMenuButton(this.ctx, pos, size, "Multi Play");
                    break;
                }
                case MenuHudType.SETTING_BUTTON: {
                    drawMenuButton(this.ctx, pos, size, "Settings");
                    break;
                }
                case MenuHudType.EXIT_BUTTON: {
                    drawMenuButton(this.ctx, pos, size, "Exit");
                    break;
                }
            }
        });

        // Hovering Menu
        this.queries.hoveringMenuHud.results.forEach(hud => {
            const type = hud.getComponent(MenuHud).type;
            const pos = hud.getComponent(CanvasPosition);
            const size = hud.getComponent(Size);

            switch(type) {
                case MenuHudType.SINGLE_PLAY_BUTTON: {
                    drawHoverMenuButton(this.ctx, pos, size, "Single Play");
                    break;
                }
                case MenuHudType.MULTI_PLAY_BUTTON: {
                    drawHoverMenuButton(this.ctx, pos, size, "Multi Play");
                    break;
                }
                case MenuHudType.SETTING_BUTTON: {
                    drawHoverMenuButton(this.ctx, pos, size, "Settings");
                    break;
                }
                case MenuHudType.EXIT_BUTTON: {
                    drawHoverMenuButton(this.ctx, pos, size, "Exit");
                    break;
                }
            }
        });  
    }

    drawSetting() {

    }

    drawSinglePlay() {
        // Title
        this.ctx.font = "60px Arial";
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        this.ctx.textAlign = "center";
        this.ctx.fillText("GAME TITLE", this.canvasWidth/2, 250);

        // Menu
        this.queries.singlePlayHud.results.forEach(hud => {
            const type = hud.getComponent(MenuHud).type;
            const pos = hud.getComponent(CanvasPosition);
            const size = hud.getComponent(Size);
            
            switch(type) {
                case MenuHudType.SINGLE_SETUP_GAME_BUTTON: {
                    drawMenuButton(this.ctx, pos, size, "Set Up Game");
                    break;
                }
                case MenuHudType.LOAD_GAME_BUTTON: {
                    drawMenuButton(this.ctx, pos, size, "Load Game");
                    break;
                }
                case MenuHudType.SINGLE_GO_BACK_BUTTON: {
                    drawMenuButton(this.ctx, pos, size, "Go Back");
                    break;
                }
            }
        });

        // Hovering Menu
        this.queries.hoveringSinglePlayHud.results.forEach(hud => {
            const type = hud.getComponent(MenuHud).type;
            const pos = hud.getComponent(CanvasPosition);
            const size = hud.getComponent(Size);

            switch(type) {
                case MenuHudType.SINGLE_SETUP_GAME_BUTTON: {
                    drawHoverMenuButton(this.ctx, pos, size, "Set Up Game");
                    break;
                }
                case MenuHudType.LOAD_GAME_BUTTON: {
                    drawHoverMenuButton(this.ctx, pos, size, "Load Game");
                    break;
                }
                case MenuHudType.SINGLE_GO_BACK_BUTTON: {
                    drawHoverMenuButton(this.ctx, pos, size, "Go Back");
                    break;
                }
            }
        });
    }

    drawSingleSetUpGame() {
        drawSetupPanels(this.ctx, { width: this.canvasWidth, height: this.canvasHeight });

        this.queries.singleSetUpHud.results.forEach(hud => {
            const type = hud.getComponent(MenuHud).type;
            const pos = hud.getComponent(CanvasPosition);
            const size = hud.getComponent(Size);
            
            switch(type) {
                case MenuHudType.PLAYER_BOX: {
                    drawPlayerBox(this.ctx, pos, size);
                    break;
                }
                case MenuHudType.PLAYER_TEAM_BUTTON: {
                    const team = hud.getComponent(Team).value;
                    drawPlayerTeamButton(this.ctx, pos, size, team + 1);

                    break;
                }
                case MenuHudType.START_BUTTON: {
                    drawStartButton(this.ctx, pos, size);
                    break;
                }
                case MenuHudType.SINGLE_SETUP_GO_BACK_BUTTON: {
                    drawSetupBackButton(this.ctx, pos, size);
                    break;
                }
            }
        });

        // Hovering Menu
        this.queries.hoveringSingleSetUpHud.results.forEach(hud => {
            const type = hud.getComponent(MenuHud).type;
            const pos = hud.getComponent(CanvasPosition);
            const size = hud.getComponent(Size);
            
            switch(type) {
                case MenuHudType.PLAYER_BOX: {
                    drawPlayerBox(this.ctx, pos, size);
                    break;
                }
                case MenuHudType.PLAYER_TEAM_BUTTON: {
                    const team = hud.getComponent(Team).value;
                    drawHoveringPlayerTeamButton(this.ctx, pos, size, team + 1);

                    break;
                }
                case MenuHudType.START_BUTTON: {
                    drawHoveringStartButton(this.ctx, pos, size);
                    break;
                }
                case MenuHudType.SINGLE_SETUP_GO_BACK_BUTTON: {
                    drawHoveringSetupBackButton(this.ctx, pos, size);
                    break;
                }
            }
        });
    }

    drawLoadGame() {

    }

    drawLobby() {
        // Menu
        this.queries.lobbyHud.results.forEach(hud => {
            const type = hud.getComponent(MenuHud).type;
            const pos = hud.getComponent(CanvasPosition);
            const size = hud.getComponent(Size);
            
            switch(type) {
                case MenuHudType.LOBBY_SETUP_GAME_BUTTON: {
                    break;
                }
                case MenuHudType.LOBBY_JOIN_GAME_BUTTON: {
                    break;
                }
                case MenuHudType.LOBBY_GO_BACK_BUTTON: {
                    break;
                }
                case MenuHudType.LOBBY_ROOM: {
                    break;
                }
            }
        });

        // Hovering Menu
        this.queries.hoveringLobbyHud.results.forEach(hud => {
            const type = hud.getComponent(MenuHud).type;
            const pos = hud.getComponent(CanvasPosition);
            const size = hud.getComponent(Size);

            switch(type) {
                case MenuHudType.LOBBY_SETUP_GAME_BUTTON: {
                    break;
                }
                case MenuHudType.LOBBY_JOIN_GAME_BUTTON: {
                    break;
                }
                case MenuHudType.LOBBY_GO_BACK_BUTTON: {
                    break;
                }
                case MenuHudType.LOBBY_ROOM: {
                    break;
                }
            }
        });
    }

    drawMultiSetUpGame() {
        this.queries.multiSetUpHud.results.forEach(hud => {
            const type = hud.getComponent(MenuHud).type;
            const pos = hud.getComponent(CanvasPosition);
            const size = hud.getComponent(Size);
            
            switch(type) {
                case MenuHudType.MULTI_SETUP_GAME_BUTTON: {
                    break;
                }
                case MenuHudType.MULTI_SETUP_GO_BACK_BUTTON: {
                    break;
                }
            }
        });

        // Hovering Menu
        this.queries.hoveringMultiSetUpHud.results.forEach(hud => {
            const type = hud.getComponent(MenuHud).type;
            const pos = hud.getComponent(CanvasPosition);
            const size = hud.getComponent(Size);
            
            switch(type) {
                case MenuHudType.MULTI_SETUP_GAME_BUTTON: {
                    break;
                }
                case MenuHudType.MULTI_SETUP_GO_BACK_BUTTON: {
                    break;
                }
            }
        });
    }

    drawMultiStageGame() {

    }

    drawLoadingGame() {

    }

    drawEndGame() {

    }
}

// Define a query of entities
MenuRenderSystem.queries = {
	sceneStatus: {
		components: [SceneStatus]
	},

    menuHud: {
        components: [MenuHud, MenuScene]
    },
    hoveringMenuHud: {
        components: [CurrentHudHover, MenuHud, MenuScene]
    },
    settingHud: {
        components: [MenuHud, SettingScene]
    },
    hoveringSettingHud: {
        components: [CurrentHudHover, MenuHud, SettingScene]
    },

    singlePlayHud: {
        components: [MenuHud, SinglePlayScene]
    },
    hoveringSinglePlayHud: {
        components: [CurrentHudHover, MenuHud, SinglePlayScene]
    },
    singleSetUpHud: {
        components: [MenuHud, SingleSetUpScene]
    },
    hoveringSingleSetUpHud: {
        components: [CurrentHudHover, MenuHud, SingleSetUpScene]
    },
    loadHud: {
        components: [MenuHud, LoadScene]
    },
    hoveringLoadHud: {
        components: [CurrentHudHover, MenuHud, LoadScene]
    },

    lobbyHud: {
        components: [MenuHud, LobbyScene]
    },
    hoveringLobbyHud: {
        components: [CurrentHudHover, MenuHud, LobbyScene]
    },
    multiSetUpHud: {
        components: [MenuHud, MultiSetUpScene]
    },
    hoveringMultiSetUpHud: {
        components: [CurrentHudHover, MenuHud, MultiSetUpScene]
    },
    multiStageHud: {
        components: [MenuHud, MultiStageScene]
    },
    hoveringMultiStageHud: {
        components: [CurrentHudHover, MenuHud, MultiStageScene]
    },

    loadingHud: {
        components: [MenuHud, LoadingScene]
    },
    hoveringLoadingHud: {
        components: [CurrentHudHover, MenuHud, LoadingScene]
    },
    endHud: {
        components: [MenuHud, EndScene]
    },
    hoveringEndHud: {
        components: [CurrentHudHover, MenuHud, EndScene]
    }
};