import "regenerator-runtime/runtime";
import { World } from "./Ecsy";
import Konva from "konva";

////////////////////////////////////////////
//
//              COCO CONQUEST
//
////////////////////////////////////////////

// Initialize the world
let world = new World({ entityPoolSize: 10000 });

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

export { world };