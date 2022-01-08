import * as Component from "@/Component";
import * as System from "@/System";
import { World } from "@/Ecsy";
import Konva from "konva";
import { Layer, Stage } from "@/Component";

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
    }

    /**
     * Create initial entities
     */
    initializeWorld(): void {
        let stage =  new Konva.Stage({
            container: 'game',
            width: 500,
            height: 500
        });

        let layer = new Konva.Layer();

        let menu = new Konva.Circle({
            x: stage.width() / 2,
            y: stage.height() / 2,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4
        })

        layer.add(menu);
        stage.add(layer);

        this.world
            .createEntity()
            .addComponent(Stage, {
                value: stage
            });

        this.world
            .createEntity()
            .addComponent(Layer, {
                value: layer
            });

        this.world
            .createEntity()
            .addComponent(Layer, {
                value: menu
            });
    }
}