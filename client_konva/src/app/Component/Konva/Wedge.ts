import { Component, Types } from "../../Ecsy";

export class Wedge extends Component<any> {}

Wedge.schema = {
	value: { type: Types.Ref }
};