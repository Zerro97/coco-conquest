import { Component, Types } from "../../Library/Ecsy";

export class Player extends Component {}

Player.schema = {
	value: { type: Types.Number },
};