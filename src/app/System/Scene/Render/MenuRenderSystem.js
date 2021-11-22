import { System } from "../../../Library/Ecsy";
import { SceneStatus, CurrentHudHover, MenuHud, CanvasPosition } from "../../../Component";
import { SceneType, MenuHudType } from "../../../Type";
import { drawMenuButton, drawHoverMenuButton } from "../../../Util";

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
            case SceneType.SINGLE_PLAY: {
                this.drawSinglePlay();
                break;
            }
            case SceneType.MULTI_PLAY: {
                this.drawMultiPlay();
                break;
            }
            case SceneType.SETTING: {
                this.drawSetting();
                break;
            }
            case SceneType.SETUP_GAME: {
                this.drawSetUpGame();
                break;
            }
            case SceneType.LOAD_GAME: {
                this.drawLoadGame();
                break;
            }
            case SceneType.JOIN_GAME: {
                this.drawJoinGame();
                break;
            }
            case SceneType.LOADING_GAME: {
                this.drawLoadingGame();
                break;
            }
            case SceneType.GAME: {
                this.drawGame();
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
            
            switch(type) {
                case MenuHudType.MENU_BUTTON: {
                    const pos = hud.getComponent(CanvasPosition);
                    drawMenuButton(this.ctx, pos, "Single Play");

                    break;
                }
            }
        });

        // Hovering Menu
        this.queries.hoveringMenuHud.results.forEach(hud => {
            const type = hud.getComponent(MenuHud).type;

            switch(type) {
                case MenuHudType.MENU_BUTTON: {
                    const pos = hud.getComponent(CanvasPosition);
                    drawHoverMenuButton(this.ctx, pos, "Single Play");

                    break;
                }
            }
        });

            
            //drawHoverMenuButton(this.ctx, {x: this.canvasWidth/2 - 100, y: 350 + i * 50}, texts[i]);
        
    }

    drawSinglePlay() {

    }

    drawMultiPlay() {

    }

    drawSetting() {

    }

    drawSetUpGame() {

    }

    drawLoadGame() {

    }

    drawJoinGame() {

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
        components: [MenuHud]
    },
    hoveringMenuHud: {
        components: [CurrentHudHover, MenuHud]
    }
};