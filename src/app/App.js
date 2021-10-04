import { World } from './Library/Ecsy';
import * as Component from './Component';
import * as System from './System';

const NUM_ELEMENTS = 50;
const SPEED_MULTIPLIER = 0.3;
const SHAPE_SIZE = 50;
const SHAPE_HALF_SIZE = SHAPE_SIZE / 2;

// Get canvas from DOM
var canvas = document.querySelector('#main');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create world and register the components and systems on it
var world = new World();
world
	.registerComponent(Component.Acceleration)
	.registerComponent(Component.Velocity)
	.registerComponent(Component.Position)
	.registerComponent(Component.Renderable)
	.registerComponent(Component.Shape)
	.registerComponent(Component.Tile)
	.registerComponent(Component.Hud)
	.registerComponent(Component.Unit)
	.registerComponent(Component.Building)
	.registerSystem(System.KeyboardListenerSystem)
	.registerSystem(System.MouseListenerSystem)
	.registerSystem(System.MovementSystem)
	.registerSystem(System.RenderSystem, {canvas: canvas})
	.registerSystem(System.TileSystem);

// Some helper functions when creating the components
function getRandomVelocity() {
	return {
		x: SPEED_MULTIPLIER * (2 * Math.random() - 1), 
		y: SPEED_MULTIPLIER * (2 * Math.random() - 1)
	};
}

function getRandomPosition() {
	return { 
		x: Math.random() * canvas.width, 
		y: Math.random() * canvas.height
	};
}

function getRandomShape() {
	return {
		primitive: Math.random() >= 0.5 ? 'circle' : 'box'
	};
}

for (let i = 0; i < NUM_ELEMENTS; i++) {
	world
		.createEntity()
		.addComponent(Component.Velocity, getRandomVelocity())
		.addComponent(Component.Shape, getRandomShape())
		.addComponent(Component.Position, getRandomPosition())
		.addComponent(Component.Renderable);        
}

export { world };