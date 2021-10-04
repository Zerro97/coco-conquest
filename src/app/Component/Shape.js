import { Component, Types } from '../Library/Ecsy';

export class Shape extends Component {}

Shape.schema = {
	primitive: { type: Types.String, default: 'box' }
};