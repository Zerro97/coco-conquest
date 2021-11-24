import { Component, Types } from "../../Library/Ecsy";

export class GameStatus extends Component {}

GameStatus.schema = {
	play: { type: Types.Boolean, default: true },
	pause: { type: Types.Number, default: false },
	menu: { type: Types.Number, default: false }
};