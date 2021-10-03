import { Component, Types } from 'ecsy';

export class Shape extends Component {}

Shape.schema = {
	primitive: { type: Types.String, default: 'box' }
};