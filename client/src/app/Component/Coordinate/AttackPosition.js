import { Component, Types } from "../../Library/Ecsy";

export class AttackPosition extends Component {}

AttackPosition.schema = {
	x: { type: Types.Number },
	y: { type: Types.Number },
	z: { type: Types.Number },
};