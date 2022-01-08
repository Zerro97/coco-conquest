import { Component, Types } from "../../Ecsy";

export class Ring extends Component<any> {}

Ring.schema = {
	value: { type: Types.Ref }
};