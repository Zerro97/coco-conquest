import { Component, Types } from "@/Ecsy";

export class Rect extends Component<any> {}

Rect.schema = {
	value: { type: Types.Ref }
};