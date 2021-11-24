import * as UnitType from "../Type/Stats";

export class StatManager {
	constructor() {
		this.availableUnits = {};

		// Unit Types: ex. human, monster, livestock
		for(const type in UnitType) {
			const unitLists = UnitType[type];

			for(const key in unitLists) {
				this.availableUnits[unitLists[key].TYPE] = {
					TYPE: unitLists[key].TYPE,
					DAMAGE: unitLists[key].DAMAGE,
					HEALTH: unitLists[key].HEALTH,
					RANGE: unitLists[key].RANGE,
					SPEED: unitLists[key].SPEED,
					SIGHT: unitLists[key].SIGHT
				};
			}
		}
	}

	getStat(type) {
		if(type in this.availableUnits) {
			return this.availableUnits[type];
		}
		
		console.warn("Given unit type does not exist");
	}
}