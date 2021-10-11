import { Component, Types } from '../../Library/Ecsy';

export class MovePosition extends Component {}

MovePosition.schema = {
	x: { type: Types.Number },
	y: { type: Types.Number },
	z: { type: Types.Number },
};