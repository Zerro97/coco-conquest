import { Component, Types } from "../../Library/Ecsy";

export class RightSelectable extends Component {}

RightSelectable.schema = {
	shape: { type: Types.Number, default: -1 },
};