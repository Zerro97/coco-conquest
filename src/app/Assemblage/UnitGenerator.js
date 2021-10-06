import { Unit, Image, Health, Damage, Sight, Range, Speed, MapPosition } from '../Component';

/**
 * Used for registering tile entity to the world
 * Uses map (2d array) as input to register tiles
 */
export class UnitGenerator {
	constructor(world) {
		this.world = world;
	}

	generateUnit(type = 0) {
		this.world
			.createEntity()
			.addComponent(Unit, {value: type})
			.addComponent(Image)
			.addComponent(MapPosition)
			.addComponent(Health)
			.addComponent(Damage)
			.addComponent(Sight)
			.addComponent(Range)
			.addComponent(Speed);
	}
}