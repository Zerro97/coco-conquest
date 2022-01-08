import { Component, Types } from "@/Ecsy";

export class Label extends Component<any> {}

Label.schema = {
	value: { type: Types.Ref }
};