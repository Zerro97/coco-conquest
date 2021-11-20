import { Component, Types } from "../../../Library/Ecsy";

export class HudHoverable extends Component {}

HudHoverable.schema = {
	shape: { type: Types.Number, default: -1 },
};