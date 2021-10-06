import unitImage from '../Assets/Images/Units/0.png';

import { System } from '../Library/Ecsy';
import { Unit, Image, Health, Damage, Sight, Range, Speed, MapPosition } from '../Component';
import { UnitType } from '../Type';

export class UnitSystem extends System {
	execute(delta, time) {
		this.queries.unit.results.forEach(entity => {
			this.initializeUnit(entity);
		});

		this.stop();
	}

	initializeUnit(entity) {
		const type = entity.getMutableComponent(Unit);
		
		switch(type.value) {
		case UnitType.scout:
			this.assignStats(entity, 5, 1, 2, 1, 3);
			break;
		case UnitType.warrior:
			this.assignStats(entity, 8, 2, 2, 1, 2);
			break;
		case UnitType.brute:
			this.assignStats(entity, 10, 3, 2, 1, 1);
			break;
		}
	}

	assignStats(entity, healthValue, damageValue, sightValue, rangeValue, speedValue) {
		const type = entity.getMutableComponent(Unit);
		const image = entity.getMutableComponent(Image);
		let imageObject = new Image(50, 50);
		imageObject.src = unitImage;

		let start = Date.now();
		let now = start;
		while (now - start < 1000) {
			now = Date.now();
		}
		console.log(imageObject);

		const health = entity.getMutableComponent(Health);
		const damage = entity.getMutableComponent(Damage);
		const sight = entity.getMutableComponent(Sight);
		const range = entity.getMutableComponent(Range);
		const speed = entity.getMutableComponent(Speed);
		const mapPos = entity.getMutableComponent(MapPosition);

		image.value = imageObject;
		health.value = healthValue;
		damage.value = damageValue;
		sight.value = sightValue;
		range.value = rangeValue;
		speed.value = speedValue;
		mapPos.x = 5;
		mapPos.y = 5;
	}
}

UnitSystem.queries = {
	unit: {
		components: [Unit, Image, MapPosition, Health, Damage, Sight, Range, Speed]
	}
};