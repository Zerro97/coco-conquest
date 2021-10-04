import { System } from '../Library/Ecsy';
import { Tile, Position } from '../Component';

/**
 * Keeps track of tile information such as:
 * 1) Unit on tile
 * 2) Building on tile
 * 3) Tile Status (ex. fog of war)
 */
export class TileSystem extends System {
	init() {
		console.log(this);
	}

	// This method will get called on every frame by default
	execute(delta, time) {
		// Iterate through all the entities on the query
		this.queries.tiles.results.forEach(entity => {

		});
	}

	unitAdded(unit, tile) {

	}

	unitRemoved(unit, tile) {

	}

	buildingAdded(building, tile) {

	}

	buildingRemoved(building, tile) {

	}

	statusChanged(status, tile) {

	}
}

// Define a query of entities
TileSystem.queries = {
	tiles: {
		components: [Tile, Position]
	}
};