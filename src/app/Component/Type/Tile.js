import { Component, Types } from '../../Library/Ecsy';

export class Tile extends Component {}

Tile.schema = {
	// Tile information
	type: { type: Types.Number, default: 0 },
	variation: { type: Types.Number, default: 0 },
	status: { type: Types.Number },
	size: { type: Types.Number, default: 50},
};