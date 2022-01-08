import { Component, Types } from "../../Ecsy";

export class Text extends Component<any> {}

Text.schema = {
	value: { type: Types.Ref }
};