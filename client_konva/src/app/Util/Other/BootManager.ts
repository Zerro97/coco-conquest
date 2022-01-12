import * as Component from "@/Component";
import * as System from "@/System";
import { Color, Resolution, SceneType } from "@/Const";
import { World } from "@/Ecsy";
import Konva from "konva";
import { SceneStatus } from "@/Component";
import { Stage } from "konva/lib/Stage";
import { Layer } from "konva/lib/Layer";

export class BootManager {
    world: World;
    stage: Stage;
    layer: Layer;

    constructor(world: World) {
        this.world = world;
        this.stage = new Konva.Stage({
            container: 'game',
            width: Resolution.DESKTOP2.width,
            height: Resolution.DESKTOP2.height,
            draggable: true
        });
        this.layer = new Konva.Layer();
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
        // Loader
        this.world
            .registerSystem(System.HudLoaderSystem, {
                priority: 0
            })
        this.world
            .registerSystem(System.MapEditorLoaderSystem, {
                priority: 1
            }).getSystem(System.MapEditorLoaderSystem).stop(); // Prevent loading map editor entities on game start
        // Update
        this.world
            .registerSystem(System.SceneSystem, {
                priority: 2
            })
        // Render
        this.world
            .registerSystem(System.SceneRenderSystem, {
                priority: 3
            })
    }

    /**
     * Create initial entities
     */
    initializeWorld(): void {
        this.stage.add(this.layer);

        this.world
            .createEntity()
            .addComponent(Component.KonvaObject, {
                value: this.stage
            })
            .addComponent(Component.Stage);

        this.world
            .createEntity()
            .addComponent(Component.KonvaObject, {
                value: this.layer
            })
            .addComponent(Component.Layer);

        this.generateSingletons();
    }

    generateSingletons() {
        this.world
            .createEntity()
            .addComponent(SceneStatus, { currentScene: SceneType.MENU });
    }
}