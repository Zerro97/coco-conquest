import { Types, Component } from "../../Library/Ecsy";

export class GameObject extends Component {}

GameObject.schema = {
	value: { type: Types.Number },
};