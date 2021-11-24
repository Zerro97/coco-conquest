import { Component, Types } from "../../Library/Ecsy";

export class Damage extends Component {}

Damage.schema = {
	value: { type: Types.Number },
};