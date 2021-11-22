import { System } from "../../../Library/Ecsy";
import {
    Block,
    Timer,
    Unit, 
    Health, 
    Damage, 
    Sight, 
    Range, 
    Speed,
    Tile,
    MapPosition,
    CanvasPosition, 
    ActionStatus, 
    MovePosition, 
    AttackPosition, 
    SelectPosition, 
    UnitImage,
    CurrentFocus,
    CurrentSelect,
    Image,
    TileMap,
    WeightMap,
    Building,
    BuildingImage
} from "../../../Component";
import { TileSize, UnitType } from "../../../Type";
import { cubeToPixel, drawMovingTile, tilesInRange, drawBoundary, getTilesInRange, drawAttackingTile } from "../../../Util";

export class BuildingRenderSystem extends System {
	execute(delta, time) {
		this.drawBuildings();
	}

	drawBuildings() {
		const spriteSheet = this.getSpriteSheet(0);

		this.queries.buildings.results.forEach((entity) => {
			const canvasPos = entity.getComponent(CanvasPosition);
			const type = entity.getComponent(Building).value;
			const spritePos = this.getSpriteSheetPosition(type);

			this.ctx.drawImage(
				spriteSheet,
				spritePos.x,
				spritePos.y,
				spritePos.width,
				spritePos.height,
				canvasPos.x - 45,
				canvasPos.y - 30,
				90,
				90
			);
		});
	}

    getSpriteSheet(type) {
        const spriteSheets = this.queries.buildingImages.results;

        for (let i = 0; i < spriteSheets.length; i++) {
            let image = spriteSheets[i].getMutableComponent(Image);
            let imageType = image.name.substr(0, image.name.indexOf("."));
        
            if (imageType == type) {
                return image.value;
            }
        }
    
        console.error("Could not find corresponding sprite sheet from given type");
        return "Error";
    }

    getSpriteSheetPosition(variation) {
        let position = {};

        position.width = 170;
        position.height = 170;
        position.x = (variation % 9) * 210 + 20;
        position.y = Math.floor(variation / 9) * 210 + 20;

        return position;
    }
}

BuildingRenderSystem.queries = {
    buildings: {
        components: [Building, CanvasPosition]
    },
    buildingImages: {
		components: [Image, BuildingImage]
	}
};