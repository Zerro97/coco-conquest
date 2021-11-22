import { Component, Types } from "../../Library/Ecsy";

export class SceneStatus extends Component {}

SceneStatus.schema = {
	currentScene: { type: Types.Number, default: 0 }
};