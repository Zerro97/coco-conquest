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
	.registerComponent(Component.ScreenStatus)
	.registerSystem(System.KeyboardListenerSystem)
	.registerSystem(System.MouseListenerSystem)
	.registerSystem(System.MovementSystem)
	.registerSystem(System.RenderSystem, {canvas: canvas})
	.registerSystem(System.TileSystem);

// Singleton components
world
	.createEntity()
	.addComponent(Component.ScreenStatus);


// Adding Entity
for (let i = 0; i < 20; i++) {
	for(let j = 0; j< 20; j++) {
		world
			.createEntity()
			.addComponent(Component.Tile, {
				type: 'plain',
				variation: 0,
				status: 'seen',
				x: i,
				y: j,
				size: 50,
				unit: null,
				building: null
			})
			.addComponent(Component.Renderable);
	}
}

export { world };