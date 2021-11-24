import { Component, Types } from "../../Library/Ecsy";

export class Scene extends Component {}

Scene.schema = {
	value: { type: Types.Number, default: -1 }
};