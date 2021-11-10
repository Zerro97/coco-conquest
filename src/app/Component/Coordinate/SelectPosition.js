import { Component, Types } from "../../Library/Ecsy";

export class SelectPosition extends Component {}

SelectPosition.schema = {
	x: { type: Types.Number },
	y: { type: Types.Number },
	z: { type: Types.Number },
};