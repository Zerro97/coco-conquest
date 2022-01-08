import * as Component from "Component";
import { World } from "Ecsy";
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
        Object.keys(Component).forEach((comp) => {
            //this.world.registerComponent(Component[comp]);
        });
    }

    registerSystems(): void {

    }

    initializeWorld(): void {
        var stage = new Konva.Stage({
            container: 'game',
            width: 500,
            height: 500
        });
        
        // then create layer
        var layer = new Konva.Layer();
        
        // create our shape
        var circle = new Konva.Circle({
            x: stage.width() / 2,
            y: stage.height() / 2,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4
        });
        
        // add the shape to the layer
        layer.add(circle);
        
        // add the layer to the stage
        stage.add(layer);
        
        // draw the image
        layer.draw();
    }
}