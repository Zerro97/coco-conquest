import { Component, Types } from "../../Ecsy";

export class CanvasPosition extends Component<String> {}

CanvasPosition.schema = {
	value: { type: Types.Boolean, default: false}
};