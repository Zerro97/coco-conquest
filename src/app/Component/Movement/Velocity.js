import { Component, Types } from '../../Library/Ecsy';

export class Velocity extends Component {}

Velocity.schema = {
	x: { type: Types.Number },
	y: { type: Types.Number }
};