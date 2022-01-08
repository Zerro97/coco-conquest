import { Component, Types } from "../../Ecsy";

export class Path extends Component<any> {}

Path.schema = {
	value: { type: Types.Ref }
};