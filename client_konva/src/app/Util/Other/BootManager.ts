import * as Component from "@/Component";
import * as System from "@/System";
import { Color, Resolution } from "@/Const";
import { World } from "@/Ecsy";
import Konva from "konva";

export class BootManager {
    world: World;
    
    constructor(world: World) {
        this.world = world;
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
        let resolution = Resolution.DESKTOP2;
        let stage =  new Konva.Stage({
            container: 'game',
            width: resolution.width,
            height: resolution.height,
            draggable: true
        });

        let layer = new Konva.Layer();

        let menu = new Konva.Rect({
            x: 0,
            y: 0,
            width: stage.width(),
            height: stage.height(),
            fill: Color.XANADU.hex
        })

        layer.add(menu);
        stage.add(layer);

        this.world
            .createEntity()
            .addComponent(Component.Stage, {
                value: stage
            });

        this.world
            .createEntity()
            .addComponent(Component.Layer, {
                value: layer
            });

        this.world
            .createEntity()
            .addComponent(Component.Rect, {
                value: menu
            })
            .addComponent(Component.Background);
    }
}