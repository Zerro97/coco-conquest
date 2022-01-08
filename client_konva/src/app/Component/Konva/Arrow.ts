import { Component, Types } from "../../Ecsy";

export class Arrow extends Component<any> {}

Arrow.schema = {
	value: { type: Types.Ref }
};