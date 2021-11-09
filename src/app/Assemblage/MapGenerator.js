import { Tile, Unit, Health, Damage, Sight, Range, Speed, MapPosition, Object, Hoverable, Selectable, CanvasPosition } from '../Component';
import { evenr_to_cube, StatManager } from '../Util';
import { ObjectType, Shape } from '../Type';

export class MapGenerator {
	constructor(world) {
		this.world = world;
		this.tileMap = [];
		this.unitMap = [];
		this.buildingMap = [];
	}

	/**
     * Generate a 2d array of map
     * 
     * @param {*} x number of columns
     * @param {*} y number of rows
     * @param {*} type type of map
     */
	generateMap(x, y, type) {
        
	}

	/**
	 * 
	 * @param {Array} map 2d array
	 */
	registerTileMap(map) {
		if(Array.isArray(map) && Array.isArray(map[0])) {
			this.tileMap = map;
		} else {
			console.error('Map has to be 2d array');
		}
	}

	registerUnitMap(map) {
		if(Array.isArray(map) && Array.isArray(map[0])) {
			this.unitMap = map;
		} else {
			console.error('Map has to be 2d array');
		}
	}

	registerBuildingMap(map) {
		if(Array.isArray(map) && Array.isArray(map[0])) {
			this.buildingMap = map;
		} else {
			console.error('Map has to be 2d array');
		}
	}

	/**
     * Generate all the tiles 
     */
	generateTiles() {
		for(let row=0; row<this.tileMap.length; row++) {
			for(let col=0; col<this.tileMap[0].length; col++) {
				let cube = evenr_to_cube(row, col);

				this.world
					.createEntity()
					.addComponent(Object, {value: ObjectType.TILE})
					.addComponent(MapPosition, {x: cube.x, y: cube.y, z: cube.z})
					// TODO: consider setting correct position when initialized instead of -1
					.addComponent(CanvasPosition, {x: -1, y: -1}) 
					.addComponent(Hoverable, {type: Shape.HEXAGON})
					.addComponent(Selectable, {type: Shape.HEXAGON})
					.addComponent(Tile, {
						type: this.tileMap[row][col][0],
						terrain: this.tileMap[row][col][1],
						variation: this.tileMap[row][col][2],
						status: 'seen',
						size: 50
					});
			}
		}
	}

	/**
	 * Generate all the units
	 */
	generateUnits() {
		let statManager = new StatManager();

		for(let row=0; row<this.unitMap.length; row++) {
			for(let col=0; col<this.unitMap[0].length; col++) {
				if(this.unitMap[row][col] !== -1) {
					let cube = evenr_to_cube(row, col);
					let stat = statManager.getStat(this.unitMap[row][col]);

					this.world
						.createEntity()
						.addComponent(Unit, {value: this.unitMap[row][col]})
						.addComponent(Object, {value: ObjectType.UNIT})
						.addComponent(MapPosition, {x: cube.x, y: cube.y, z: cube.z})
						.addComponent(Health, {value: stat.HEALTH})
						.addComponent(Damage, {value: stat.DAMAGE})
						.addComponent(Sight, {value: stat.SIGHT})
						.addComponent(Range, {value: stat.RANGE})
						.addComponent(Speed, {value: stat.SPEED});
				}
			}
		}
	}

	generateBuildings() {
		for(let row=0; row<this.unitMap.length; row++) {
			for(let col=0; col<this.unitMap[0].length; col++) {
				if(this.unitMap[row][col] !== -1) {
					console.log('in');
				}
			}
		}
	}
}