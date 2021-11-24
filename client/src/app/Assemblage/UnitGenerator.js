import { Unit, Health, Damage, Sight, Range, Speed, MapPosition, CanvasPosition, GameObject, Selectable, Team, Shape } from "../Component";
import { evenrToCube, cubeToPixel, StatManager } from "../Util";
import { GameObjectType, ObjectShape, TileSize } from "../Type";

/**
 * Used for registering tile entity to the world
 */
export class UnitGenerator {
	constructor(world) {
		this.world = world;
	}

	/**
	 * Generate unit using evenr coordinate (converted to cube coordinate)
	 * @param {*} type 
	 * @param {*} x 
	 * @param {*} y 
	 */
	generateUnit(type = 0, x = 0, y = 0, team = 0) {
		let statManager = new StatManager();
		let stat = statManager.getStat(type);
		let cube = evenrToCube(x, y);
		let pixel = cubeToPixel(cube.x, cube.z, TileSize.REGULAR);

		this.world
			.createEntity()
			.addComponent(Unit, {value: type})
			.addComponent(GameObject, {value: GameObjectType.UNIT})
			.addComponent(MapPosition, {x: cube.x, y: cube.y, z: cube.z})
			.addComponent(CanvasPosition, {x: pixel.x, y: pixel.y})
			.addComponent(Selectable)
			.addComponent(Shape, { type: ObjectShape.HEXAGON })
			.addComponent(Health, {value: stat.HEALTH})
			.addComponent(Damage, {value: stat.DAMAGE})
			.addComponent(Sight, {value: stat.SIGHT})
			.addComponent(Range, {value: stat.RANGE})
			.addComponent(Speed, {value: stat.SPEED})
			.addComponent(Team, {value: team});
	}
}