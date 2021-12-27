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
            .registerSystem(System.LoaderSystem, {
                priority: -99,
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
                priority: -98,
                mapWidth: this.mapWidth,
                mapHeight: this.mapHeight,
            })
            .registerSystem(System.HudLoaderSystem, {
                priority: -97,
                canvasWidth: this.canvasWidth,
                canvasHeight: this.canvasHeight,
            })
            .registerSystem(System.SocketListenerSystem, {
              priority: -96,
              socket: this.socket,
              canvasWidth: this.canvasWidth,
              canvasHeight: this.canvasHeight
            })
            .registerSystem(System.SocketEmitSystem, {
                priority: -95,
                socket: this.socket
            })
            .registerSystem(System.KeyboardListenerSystem, {
                priority: -10,
            })
            .registerSystem(System.MouseListenerSystem, {
                priority: -10,
                canvas: this.canvas,
                canvasWidth: this.canvasWidth,
                canvasHeight: this.canvasHeight,
            })
            .registerSystem(System.KeyboardHandlerSystem, {
                priority: -5,
            })
            .registerSystem(System.MouseHandlerSystem, {
                priority: -5,
            })
            .registerSystem(System.SceneSystem, {
                priority: 0,
            })
            .registerSystem(System.GlobalGameSystem, {
                priority: 5
            })
            .registerSystem(System.ScreenSystem, {
                priority: 5,
                ctx: this.ctx,
                canvasWidth: this.canvasWidth,
                canvasHeight: this.canvasHeight,
            })
            .registerSystem(System.MovementSystem, {
                priority: 5,
            })
            .registerSystem(System.ActionSystem, {
                priority: 5,
            })
            .registerSystem(System.UnitSystem, {
                priority: 5,
            })
            .registerSystem(System.HudSystem, {
                priority: 6,
            })
            .registerSystem(System.MenuSystem, {
                priority: 5,
            })
            .registerSystem(System.MenuRenderSystem, {
                priority: 10,
                canvas: this.canvas,
                ctx: this.ctx,
                canvasWidth: this.canvasWidth,
                canvasHeight: this.canvasHeight,
            })
            .registerSystem(System.TileRenderSystem, {
                priority: 10,
                ctx: this.ctx,
                canvasWidth: this.canvasWidth,
                canvasHeight: this.canvasHeight,
            })
            .registerSystem(System.RegionSystem, {
                priority: 11,
                ctx: this.ctx,
                canvasWidth: this.canvasWidth,
                canvasHeight: this.canvasHeight,
            })
            .registerSystem(System.BuildingRenderSystem, {
                priority: 12,
                ctx: this.ctx,
                canvasWidth: this.canvasWidth,
                canvasHeight: this.canvasHeight,
            })
            .registerSystem(System.UnitRenderSystem, {
                priority: 13,
                ctx: this.ctx,
                canvasWidth: this.canvasWidth,
                canvasHeight: this.canvasHeight,
            })
            .registerSystem(System.RenderSystem, {
                priority: 14,
                ctx: this.ctx,
                canvasWidth: this.canvasWidth,
                canvasHeight: this.canvasHeight,
            })
            .registerSystem(System.GameHudSystem, {
                priority: 15,
                ctx: this.ctx,
                canvasWidth: this.canvasWidth,
                canvasHeight: this.canvasHeight,
            })
            .registerSystem(System.HudRenderSystem, {
                priority: 20,
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
}