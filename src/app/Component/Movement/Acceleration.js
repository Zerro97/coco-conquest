import { Component, Types } from '../../Library/Ecsy';

export class Acceleration extends Component {}

Acceleration.schema = {
	x: { type: Types.Number },
	y: { type: Types.Number }
};