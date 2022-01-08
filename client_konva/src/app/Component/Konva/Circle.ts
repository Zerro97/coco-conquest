import { Component, Types } from "@/Ecsy";

export class Circle extends Component<any> {}

Circle.schema = {
	value: { type: Types.Ref }
};