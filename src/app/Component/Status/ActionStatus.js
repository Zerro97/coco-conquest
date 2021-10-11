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
	// 0: NOT SELECTED
	// 1: SELECTED
	// 2: ATTACK
	// 3: MOVE
	action: { type: Types.Number, default: 0},

	// 0: Tile, 1: Unit, 2: Building
	selectType: { type: Types.Number, default: 0 },
	// 0: Simple, 1: Skill
	attackType: { type: Types.Number, default: 0 },
	// 0: Moving, 1: Sailing, 2: Flying, 3: Burrowing?
	movementType: { type: Types.Boolean, default: 0 },

	// Map position of selected object
	selectX: { type: Types.Number},
	selectY: { type: Types.Number}
};