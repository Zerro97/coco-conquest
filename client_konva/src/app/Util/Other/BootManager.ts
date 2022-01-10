import * as Component from "@/Component";
import * as System from "@/System";
import { Color, Resolution, SceneType } from "@/Const";
import { World } from "@/Ecsy";
import Konva from "konva";
import { SceneStatus } from "@/Component";
import { HudLoader } from "./HudLoader";
import { Stage } from "konva/lib/Stage";
import { Layer } from "konva/lib/Layer";

export class BootManager {
    world: World;
    stage: Stage;
    layer: Layer;
    hudLoader: HudLoader

    constructor(world: World) {
        this.world = world;
        this.stage = new Konva.Stage({
            container: 'game',
            width: Resolution.DESKTOP2.width,
            height: Resolution.DESKTOP2.height,
            draggable: true
        });
        this.layer = new Konva.Layer();

        this.hudLoader = new HudLoader(this.world, this.stage, this.layer);
    }

    boot(): void {
        this.registerComponents();
        this.registerSystems();
        this.initializeWorld();
    }

    registerComponents(): void {
        (Object.keys(Component) as Array<keyof typeof Component>).forEach((comp => {
            this.world.registerComponent(Component[comp]);
        }));
    }

    registerSystems(): void {
        this.world
            .registerSystem(System.SceneSystem, {
                priority: 0
            })
        this.world
            .registerSystem(System.SceneRenderSystem, {
                priority: 0
            })
    }

    /**
     * Create initial entities
     */
    initializeWorld(): void {
        let menu = new Konva.Rect({
            x: 0,
            y: 0,
            width: this.stage.width(),
            height: this.stage.height(),
            fill: Color.XANADU.hex
        })

        this.layer.add(menu);
        this.stage.add(this.layer);

        this.world
            .createEntity()
            .addComponent(Component.Stage, {
                value: this.stage
            });

        this.world
            .createEntity()
            .addComponent(Component.Layer, {
                value: this.layer
            });

        this.world
            .createEntity()
            .addComponent(Component.Rect, {
                value: menu
            })
            .addComponent(Component.Background);


        this.generateSingletons();
    }

    generateSingletons() {
        this.world
            .createEntity()
            .addComponent(SceneStatus, { currentScene: SceneType.MENU });
    }
}