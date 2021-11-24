import { Component, Types } from "../../../Library/Ecsy";

export class HudSelectable extends Component {}

HudSelectable.schema = {
	shape: { type: Types.Number, default: -1 },
};