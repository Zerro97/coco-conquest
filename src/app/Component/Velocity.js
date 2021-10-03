import { Component, Types } from 'ecsy';

export class Velocity extends Component {}

Velocity.schema = {
	x: { type: Types.Number },
	y: { type: Types.Number }
};