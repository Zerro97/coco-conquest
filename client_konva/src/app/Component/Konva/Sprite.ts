import { Component, Types } from "@/Ecsy";

export class Sprite extends Component<any> {}

Sprite.schema = {
	value: { type: Types.Ref }
};