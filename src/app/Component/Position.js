import { Component, Types } from 'ecsy';

export class Position extends Component {}

Position.schema = {
	x: { type: Types.Number },
	y: { type: Types.Number }
};