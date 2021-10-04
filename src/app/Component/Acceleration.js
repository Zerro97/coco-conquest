import { Component, Types } from 'ecsy';

export class Acceleration extends Component {}

Acceleration.schema = {
	x: { type: Types.Number },
	y: { type: Types.Number }
};