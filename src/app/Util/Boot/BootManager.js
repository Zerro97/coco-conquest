import { ImageLoader } from "./ImageLoader";

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
	}

    boot() {
        this.loadImages();
        this.registerComponents();
        this.registerSystems();
        this.generateImages();
    }

    async loadImages() {
        // TODO: Wait until async loading function finishes...
        console.log(await this.imageLoader.loadTileImages());

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
        console.log(this.tileImages);

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
            .registerSystem(System.KeyboardListenerSystem, {
                priority: -10,
            })
            .registerSystem(System.MouseListenerSystem, {
                priority: -10,
                canvasWidth: this.canvasWidth,
                canvasHeight: this.canvasHeight,
            })
            .registerSystem(System.KeyboardHandlerSystem, {
                priority: 0,
            })
            .registerSystem(System.MouseHandlerSystem, {
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
            .registerSystem(System.TileSystem, {
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