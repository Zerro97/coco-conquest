import { Component, Types } from '../../Library/Ecsy';

export class CanvasPosition extends Component {}

CanvasPosition.schema = {
	x: { type: Types.Number },
	y: { type: Types.Number }
};