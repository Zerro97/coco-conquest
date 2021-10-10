import { Component, Types } from '../../Library/Ecsy';

export class ActionStatus extends Component {}

/**
 * Contains current status of user's action
 * (like checking if user has selected unit, is commanding unit for attack)
 * 
 * Select happens before attack and movement.
 * After user selects unit, he can either command attack or movement
 */
ActionStatus.schema = {
	// What kind of object is selected
	// -1: Not selected, 0: Tile, 1: Unit, 2: Building
	selectType: { type: Types.Number, default: -1 },
	// Map position of selected object
	selectX: { type: Types.Number},
	selectY: { type: Types.Number},

	// Is it a simple attack or a skill
	// -1: Not attacking, 0: Simple, 1: Skill
	attackType: { type: Types.Number, default: -1 },
	// -1: Not moving, 0: Moving
	movementType: { type: Types.Boolean, default: -1 }
};