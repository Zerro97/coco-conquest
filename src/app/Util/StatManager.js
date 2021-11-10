import * as Stat from "../Type/Stats";

export class StatManager {
	constructor() {
		this.availableUnits = {};

		for(const key in Stat) {
			this.availableUnits[Stat[key].TYPE] = {
				TYPE: Stat[key].TYPE,
				DAMAGE: Stat[key].DAMAGE,
				HEALTH: Stat[key].HEALTH,
				RANGE: Stat[key].RANGE,
				SPEED: Stat[key].SPEED,
				SIGHT: Stat[key].SIGHT
			};
		}
	}

	getStat(type) {
		if(type in this.availableUnits) {
			return this.availableUnits[type];
		}
		
		console.warn("Given unit type does not exist");
	}
}