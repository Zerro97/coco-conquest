import { MapPosition, CanvasPosition, GameObject, Selectable, Team, Shape, Building } from "../Component";
import { evenrToCube, cubeToPixel, StatManager } from "../Util";
import { GameObjectType, ObjectShape, TileSize } from "../Type";

/**
 * Used for registering tile entity to the world
 */
export class BuildingGenerator {
	constructor(world) {
		this.world = world;
	}

	/**
	 * Generate unit using evenr coordinate (converted to cube coordinate)
	 * @param {*} type 
	 * @param {*} x 
	 * @param {*} y 
	 */
	generateBuilding(type = 0, x = 0, y = 0, team = 0) {
		let statManager = new StatManager();
		let stat = statManager.getStat(type);
		let cube = evenrToCube(x, y);
		let pixel = cubeToPixel(cube.x, cube.z, TileSize.REGULAR);

		this.world
			.createEntity()
			.addComponent(Building, {value: type})
			.addComponent(GameObject, {value: GameObjectType.BUILDING})
			.addComponent(MapPosition, {x: cube.x, y: cube.y, z: cube.z})
			.addComponent(CanvasPosition, {x: pixel.x, y: pixel.y})
			.addComponent(Selectable)
            .addComponent(Shape, { type: ObjectShape.HEXAGON })
            .addComponent(Team, {value: team});
	}
}