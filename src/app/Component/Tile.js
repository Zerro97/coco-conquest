import { Component, Types } from '../Library/Ecsy';

export class Tile extends Component {}

Tile.schema = {
	// Tile information
	type: { type: Types.String, default: 'plain' },
	variation: { type: Types.Number, default: 0 },
	status: { type: Types.String },

	// Tile coordinate (not canvas coordinate)
	x: { type: Types.Number },
	y: { type: Types.Number },

	// Store entity standing on the tile
	unit: { type: Types.Number },
	building: { type: Types.Number }
};