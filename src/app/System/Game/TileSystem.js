import { System } from '../../Library/Ecsy';
import { Tile, ActionStatus, MapPosition, CurrentHover, CanvasPosition } from '../../Component';
import {
	cubeToPixel,
	drawBaseTile,
	drawHoveringTile,
	drawImageTile,
	drawSelectedTile,
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
		this.drawTiles();
	}

	drawTiles() {
		this.drawTileImage();
		this.drawHoveringTile();
		this.drawSelectedTile();
	}

	drawTileImage() {
		this.queries.tiles.results.forEach((entity) => {
			let tile = entity.getMutableComponent(Tile);
			let tilePos = entity.getMutableComponent(MapPosition);
			let canvasPos = cubeToPixel(tilePos.x, tilePos.z, tile.size);

			let image = this.getTileImage(tile.terrain, tile.variation);

			drawImageTile(this.ctx, canvasPos.x, canvasPos.y, image);
		});
	}

	drawHoveringTile() {
		const canvasPos = this.queries.currentHover.results.getMutableComponent(CanvasPosition);
		drawHoveringTile(this.ctx, canvasPos.x, canvasPos.y);
	}

	drawSelectedTile() {
		const canvasPos = this.queries.currentSelect.results.getMutableComponent(CanvasPosition);
		drawHoveringTile(this.ctx, canvasPos.x, canvasPos.y);
	}

	getTileImage(terrainType, variation) {
		let image = {};

		const dirtEntities = this.queries.dirtImages.results;
		const grassEntities = this.queries.grassImages.results;
		const marsEntities = this.queries.marsImages.results;
		const sandEntities = this.queries.sandImages.results;
		const stoneEntities = this.queries.stoneImages.results;

		switch (terrainType) {
		case 0:
			dirtEntities.some((entity) => {
				let imageComp = entity.getMutableComponent(Image);
				let variationType = imageComp.name.substr(
					0,
					imageComp.name.indexOf('.')
				);

				if (variationType == variation) {
					image = imageComp.value;
				}
			});
			break;
		case 1:
			grassEntities.some((entity) => {
				let imageComp = entity.getMutableComponent(Image);
				let variationType = imageComp.name.substr(
					0,
					imageComp.name.indexOf('.')
				);

				if (variationType == variation) {
					image = imageComp.value;
				}
			});
			break;
		case 2:
			marsEntities.some((entity) => {
				let imageComp = entity.getMutableComponent(Image);
				let variationType = imageComp.name.substr(
					0,
					imageComp.name.indexOf('.')
				);

				if (variationType == variation) {
					image = imageComp.value;
				}
			});
			break;
		case 3:
			sandEntities.some((entity) => {
				let imageComp = entity.getMutableComponent(Image);
				let variationType = imageComp.name.substr(
					0,
					imageComp.name.indexOf('.')
				);

				if (variationType == variation) {
					image = imageComp.value;
				}
			});
			break;
		case 4:
			stoneEntities.some((entity) => {
				let imageComp = entity.getMutableComponent(Image);
				let variationType = imageComp.name.substr(
					0,
					imageComp.name.indexOf('.')
				);

				if (variationType == variation) {
					image = imageComp.value;
				}
			});
			break;
		}

		return image;
	}
}

// Define a query of entities
TileSystem.queries = {
	currentHover: {
		components: [CurrentHover, CanvasPosition, Tile]
	},
	currentSelect: {
		components: [CurrentHover, CanvasPosition, Tile]
	},
	tiles: {
		components: [Tile]
	}
};