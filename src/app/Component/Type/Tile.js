import { Component, Types } from "../../Library/Ecsy";

export class Tile extends Component {}

Tile.schema = {
	// 	0: PLAIN, 1: MOUNTAIN, 2: OCEAN, 3: MOOR, 4: City
	base: { type: Types.Number, default: 0 },

	// 32 types specified in TileType file
	type: { type: Types.Number, default: 0 },

	// Different image sets for a single type
	variation: { type: Types.Number, default: 0 }
};