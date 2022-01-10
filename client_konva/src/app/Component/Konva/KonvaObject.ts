import { Component, Types } from "@/Ecsy";

export class KonvaObject extends Component<any> {}

KonvaObject.schema = {
	value: { type: Types.Ref }
};