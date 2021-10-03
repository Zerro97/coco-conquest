import { Component, Types } from 'ecsy';

export class CanvasContext extends Component {}

CanvasContext.schema = {
	ctx: { type: Types.Ref },
	width: { type: Types.Number },
	height: { type: Types.Number },
};