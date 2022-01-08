import { Component, Types } from "../../Ecsy";

export class Line extends Component<any> {}

Line.schema = {
	value: { type: Types.Ref }
};