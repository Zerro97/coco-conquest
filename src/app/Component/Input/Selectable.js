import { Component, Types } from "../../Library/Ecsy";

export class Selectable extends Component {}

Selectable.schema = {
	shape: { type: Types.Number, default: -1 },
};