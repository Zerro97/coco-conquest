import { Component, Types } from "../../Ecsy";

export class Stage extends Component<any> {}

Stage.schema = {
	value: { type: Types.Ref }
};