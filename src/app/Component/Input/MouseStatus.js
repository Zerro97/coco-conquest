import { Component, Types } from "../../Library/Ecsy";

export class MouseStatus extends Component {}

MouseStatus.schema = {
	// Position (Not transformed)
	x: { type: Types.Number, default: 0 },
	y: { type: Types.Number, default: 0 },

	// Position (Transformed using screenStatus to fit map coordinate)
	mapX: { type: Types.Number, default: 0 },
	mapY: { type: Types.Number, default: 0 },

	// Second pointer position (ex. using finger)
	secX: { type: Types.Number, default: 0 },
	secY: { type: Types.Number, default: 0 }, 

	// Wheel
	wheelX: { type: Types.Number, default: 0 },
	wheelY: { type: Types.Number, default: 0 },
	wheelZ: { type: Types.Number, default: 0 },

	// Status
	isMouseDown: { type: Types.Boolean, default: false },
	isMouseUp: { type: Types.Boolean, default: true },
	isRightMouseDown: { type: Types.Boolean, default: false },
	isRightMouseUp: { type: Types.Boolean, default: true },

	// Turns true once when mouse up and then becomes false (becoming false is handled in other system)
	isMouseClicked: { type: Types.Boolean, default: true },
	isRightMouseClicked: { type: Types.Boolean, default: true },
};