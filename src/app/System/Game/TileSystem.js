import { System } from '../../Library/Ecsy';
import { Tile, ActionStatus, MapPosition } from '../../Component';
import {
	cubeToPixel,
	isInsideHexagon
} from '../../Util';
import {
	TileStatus
} from '../../Type';

/**
 * Keeps track of tile information such as:
 * 1) Unit on tile
 * 2) Building on tile
 * 3) Tile Status (ex. fog of war)
 * 
 * Hex Coordinate: "even-r"
 */
export class TileSystem extends System {
	// This method will get called on every frame by default
	execute(delta, time) {
		// Iterate through all the entities on the query
		this.queries.tiles.results.forEach(entity => {
			let tile = entity.getComponent(Tile);
		});

		

		this.stop();
	}

	checkTiles(mouseX, mouseY, type) {
		const actionStatus = this.queries.actionStatus.results[0].getMutableComponent(ActionStatus);

		this.queries.tiles.results.forEach((entity) => {
			let tile = entity.getMutableComponent(Tile);
			let tilePos = entity.getMutableComponent(MapPosition);
			let canvasPos = cubeToPixel(tilePos.x, tilePos.z, tile.size);

			if (isInsideHexagon(canvasPos.x, canvasPos.y, mouseX, mouseY, tile.size)) {
				if (type === 'hover' && tile.status != TileStatus.SELECTED) {
					tile.status = TileStatus.HOVER;
				} else if (type === 'click') {
					tile.status = TileStatus.SELECTED;
				}
			} else {
				if (type === 'click' && tile.status === TileStatus.SELECTED) {
					tile.status = TileStatus.SEEN;
				}
				tile.status = tile.status != TileStatus.SELECTED ? TileStatus.SEEN : TileStatus.SELECTED;
			}
		});
	}
}

// Define a query of entities
TileSystem.queries = {
	tiles: {
		components: [Tile]
	}
};