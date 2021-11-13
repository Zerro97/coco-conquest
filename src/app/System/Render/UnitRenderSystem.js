import { System } from "../../Library/Ecsy";
import {
	Block,
	Timer,
	Unit, 
	Health, 
	Damage, 
	Sight, 
	Range, 
	Speed, 
	MapPosition,
	CanvasPosition, 
	ActionStatus, 
	MovePosition, 
	AttackPosition, 
	SelectPosition, 
	UnitImage,
	CurrentFocus,
	CurrentSelect,
    Image
} from "../../Component";
import { TileSize, UnitType } from "../../Type";
import { cubeToPixel } from "../../Util";

export class UnitRenderSystem extends System {
	execute(delta, time) {
		this.drawUnits();
	}

	drawUnits() {
		const spriteSheet = this.getSpriteSheet(0);

		this.queries.units.results.forEach((entity) => {
			const canvasPos = entity.getComponent(CanvasPosition);
			const type = entity.getComponent(Unit).value;
			const spritePos = this.getSpriteSheetPosition(type);

			this.ctx.drawImage(
				spriteSheet,
				spritePos.x,
				spritePos.y,
				spritePos.width,
				spritePos.height,
				canvasPos.x - 35,
				canvasPos.y - 40,
				70,
				70
			);
		});
	}

    getSpriteSheet(type) {
        const spriteSheets = this.queries.unitImages.results;

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

        position.width = 194;
        position.height = 194;
        position.x = (variation % 11) * 194;
        position.y = Math.floor(variation / 11) * 194;

        return position;
    }
}

UnitRenderSystem.queries = {
	units: {
		components: [Unit, MapPosition, CanvasPosition]
	},
	unitImages: {
		components: [Image, UnitImage]
	},
	control: {
		components: [Block, Timer]
	},
	actionStatus: {
		components: [ActionStatus, MovePosition, AttackPosition, SelectPosition]
	},
	focusedUnit: {
		components: [CurrentFocus, Unit, MapPosition]
	},
	selectedUnit: {
		components: [CurrentSelect, Unit, MapPosition]
	},
};