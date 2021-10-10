import { Component, Types } from '../Library/Ecsy';

export class ScreenStatus extends Component {}

ScreenStatus.schema = {
	// Translation
	x: { type: Types.Number, default: 0 },
	y: { type: Types.Number, default: 0 },
	// Scale
	scaleX: { type: Types.Number, default: 1 },
	scaleY: { type: Types.Number, default: 1 },
	// Rotation in radian
	rotation: { type: Types.Number, default: 0 },
};