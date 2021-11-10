import { Component, Types } from "../../Library/Ecsy";

export class Block extends Component {}

Block.schema = {
	value: { type: Types.Boolean, default: false}
};