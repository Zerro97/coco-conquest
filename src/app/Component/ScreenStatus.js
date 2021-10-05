import { Component, Types } from '../Library/Ecsy';

export class ScreenStatus extends Component {}

ScreenStatus.schema = {
	scale: { type: Types.Number },
	rotation: { type: Types.Number },
	x: { type: Types.Number },
	y: { type: Types.Number }
};