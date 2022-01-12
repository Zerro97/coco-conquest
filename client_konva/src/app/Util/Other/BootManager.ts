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
    hudLayer: Layer;
    gameLayer: Layer;

    constructor(world: World) {
        this.world = world;
        this.stage = new Konva.Stage({
            container: 'game',
            width: Resolution.DESKTOP2.width,
            height: Resolution.DESKTOP2.height
        });
        this.hudLayer = new Konva.Layer();
        this.gameLayer = new Konva.Layer();
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
            }).getSystem(System.MapEditorLoaderSystem).stop();

        // Input Listener
        this.world
            .registerSystem(System.MouseListenerSystem, {
                priority: 10
            }).getSystem(System.MouseListenerSystem).stop();

        // Update
        this.world
            .registerSystem(System.SceneSystem, {
                priority: 20
            })

        // Render
        this.world
            .registerSystem(System.SceneRenderSystem, {
                priority: 30
            })
    }

    /**
     * Create initial entities
     */
    initializeWorld(): void {
        this.stage.add(this.gameLayer);
        this.stage.add(this.hudLayer);

        this.world
            .createEntity()
            .addComponent(Component.KonvaObject, {
                value: this.stage
            })
            .addComponent(Component.Stage);

        this.world
            .createEntity()
            .addComponent(Component.KonvaObject, {
                value: this.gameLayer
            })
            .addComponent(Component.GameLayer);

        this.world
            .createEntity()
            .addComponent(Component.KonvaObject, {
                value: this.hudLayer
            })
            .addComponent(Component.HudLayer);

        this.generateSingletons();
    }

    generateSingletons() {
        this.world
            .createEntity()
            .addComponent(SceneStatus, { currentScene: SceneType.MAP_EDITOR });
    }
}