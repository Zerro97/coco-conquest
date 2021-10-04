import { Component, Types } from '../Library/Ecsy';

export class Position extends Component {}

Position.schema = {
	x: { type: Types.Number },
	y: { type: Types.Number }
};