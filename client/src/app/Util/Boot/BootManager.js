import { ImageLoader } from "./ImageLoader";
import { io } from "socket.io-client";

import * as Component from "../../Component";
import * as System from "../../System";

export class BootManager {
	constructor(world, canvas, worldSize) {
		this.world = world;

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;

        this.mapWidth = worldSize;
        this.mapHeight = worldSize;

        this.imageLoader = new ImageLoader(world);
        this.tileImages = null;
        this.unitImages = null;
        this.buildingImages = null;
        this.iconImages = null;
        this.backgroundImages = null;

        // Network
        this.socket = io("http://localhost:3000");
	}

    async boot() {
        this.displayLoading();

        await this.loadImages();
        this.registerComponents();
        this.registerSystems();
        this.generateImages();

        // Initial Systems to Play
        this.setInitialSystems();
    }

    displayLoading() {
        this.ctx.font = "50px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Loading...", this.canvasWidth / 2, this.canvasHeight / 2);
    }

    async loadImages() {
        // TODO: Wait until async loading function finishes...
        this.tileImages = await this.imageLoader.loadTileImages();
        this.unitImages = await this.imageLoader.loadUnitImages();
        this.buildingImages = await this.imageLoader.loadBuildingImages();
        this.iconImages = await this.imageLoader.loadIconImages();
        this.backgroundImages = await this.imageLoader.loadBackgroundImages();
    }

    registerComponents() {
        Object.keys(Component).forEach((comp) => {
            this.world.registerComponent(Component[comp]);
        });
    }

    registerSystems() {
        this.world
            // Loaders
            .registerSystem(System.LoaderSystem, {
                priority: 0,
                tileImages: this.tileImages,
                iconImages: this.iconImages,
                unitImages: this.unitImages,
                buildingImages: this.buildingImages,
                backgroundImages: this.backgroundImages,
                mapWidth: this.mapWidth,
                mapHeight: this.mapHeight,
                canvasWidth: this.canvasWidth,
                canvasHeight: this.canvasHeight,
            })
            .registerSystem(System.GameLoaderSystem, {
                priority: 1,
                mapWidth: this.mapWidth,
                mapHeight: this.mapHeight,
            })
            .registerSystem(System.HudLoaderSystem, {
                priority: 2,
                canvasWidth: this.canvasWidth,
                canvasHeight: this.canvasHeight,
            })
            // Network
            .registerSystem(System.SocketListenerSystem, {
                priority: 10,
                socket: this.socket,
                canvasWidth: this.canvasWidth,
                canvasHeight: this.canvasHeight
            })
            .registerSystem(System.SocketEmitSystem, {
                priority: 11,
                socket: this.socket
            })
            // Input
            .registerSystem(System.KeyboardListenerSystem, {
                priority: 20,
            })
            .registerSystem(System.MouseListenerSystem, {
                priority: 21,
                canvas: this.canvas,
                canvasWidth: this.canvasWidth,
                canvasHeight: this.canvasHeight,
            })
            .registerSystem(System.KeyboardHandlerSystem, {
                priority: 22,
            })
            .registerSystem(System.MouseHandlerSystem, {
                priority: 23,
            })
            // Game Updates
            .registerSystem(System.SceneSystem, {
                priority: 30,
            })
            .registerSystem(System.GlobalGameSystem, {
                priority: 31
            })
            .registerSystem(System.ResourceSystem, {
                priority: 32
            })
            .registerSystem(System.ScreenSystem, {
                priority: 33,
                ctx: this.ctx,
                canvasWidth: this.canvasWidth,
                canvasHeight: this.canvasHeight,
            })
            .registerSystem(System.MovementSystem, {
                priority: 34,
            })
            .registerSystem(System.ActionSystem, {
                priority: 35,
            })
            .registerSystem(System.UnitSystem, {
                priority: 36,
            })
            .registerSystem(System.HudSystem, {
                priority: 37,
            })
            .registerSystem(System.MenuSystem, {
                priority: 38,
            })
            // Game Renders
            .registerSystem(System.MenuRenderSystem, {
                priority: 50,
                canvas: this.canvas,
                ctx: this.ctx,
                canvasWidth: this.canvasWidth,
                canvasHeight: this.canvasHeight,
            })
            .registerSystem(System.TileRenderSystem, {
                priority: 52,
                ctx: this.ctx,
                canvasWidth: this.canvasWidth,
                canvasHeight: this.canvasHeight,
            })
            .registerSystem(System.RegionSystem, {
                priority: 53,
                ctx: this.ctx,
                canvasWidth: this.canvasWidth,
                canvasHeight: this.canvasHeight,
            })
            .registerSystem(System.BuildingRenderSystem, {
                priority: 54,
                ctx: this.ctx,
                canvasWidth: this.canvasWidth,
                canvasHeight: this.canvasHeight,
            })
            .registerSystem(System.UnitRenderSystem, {
                priority: 55,
                ctx: this.ctx,
                canvasWidth: this.canvasWidth,
                canvasHeight: this.canvasHeight,
            })
            .registerSystem(System.RenderSystem, {
                priority: 56,
                ctx: this.ctx,
                canvasWidth: this.canvasWidth,
                canvasHeight: this.canvasHeight,
            })
            .registerSystem(System.GameHudSystem, {
                priority: 57,
                ctx: this.ctx,
                canvasWidth: this.canvasWidth,
                canvasHeight: this.canvasHeight,
            })
            .registerSystem(System.HudRenderSystem, {
                priority: 58,
                ctx: this.ctx,
                canvasWidth: this.canvasWidth,
                canvasHeight: this.canvasHeight,
            })
            // Map Editor Render
            .registerSystem(System.MapEditorScreenSystem, {
                priority: 70,
                ctx: this.ctx,
                canvasWidth: this.canvasWidth,
                canvasHeight: this.canvasHeight,
            })
            .registerSystem(System.MapEditorRenderSystem, {
                priority: 71,
                ctx: this.ctx,
                canvasWidth: this.canvasWidth,
                canvasHeight: this.canvasHeight,
            });
    }

    generateImages() {
        this.imageLoader.generateTileImage();
        this.imageLoader.generateIconImage();
        this.imageLoader.generateUnitImage();
        this.imageLoader.generateBuildingImage();
        this.imageLoader.generateBackgroundImage();
    }

    // Only play the needed systems for the menu
    setInitialSystems() {
        // Stop all systems
        Object.keys(System).forEach((system) => {
            this.world.getSystem(System[system]).stop();
        });

        // Systems related to menu
        this.world.getSystem(System.MenuRenderSystem).play();

        // Core Systems
        this.world.getSystem(System.MenuSystem).play();
        this.world.getSystem(System.GameLoaderSystem).play();
        this.world.getSystem(System.HudLoaderSystem).play();
        this.world.getSystem(System.LoaderSystem).play();
        this.world.getSystem(System.KeyboardHandlerSystem).play();
        this.world.getSystem(System.KeyboardListenerSystem).play();
        this.world.getSystem(System.MouseHandlerSystem).play();
        this.world.getSystem(System.MouseListenerSystem).play();
        this.world.getSystem(System.SocketEmitSystem).play();
        this.world.getSystem(System.SocketListenerSystem).play();
    }
}