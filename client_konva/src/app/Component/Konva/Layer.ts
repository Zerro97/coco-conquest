import { Component, Types } from "@/Ecsy";

export class Layer extends Component<any> {}

Layer.schema = {
	value: { type: Types.Ref },
};