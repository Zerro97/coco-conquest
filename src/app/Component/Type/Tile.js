import { Component, Types } from '../../Library/Ecsy';

export class Tile extends Component {}

Tile.schema = {
	// 	0: PLAIN, 1: MOUNTAIN, 2: SEA
	type: { type: Types.Number, default: 0 },
	// 0: Dirt, 1: Grass, 2: Mars, 3: Sand, 4: Stone
	terrain: { type: Types.Number, default: 0 },
	// Different image sets
	variation: { type: Types.Number, default: 0 },
	// 0: SEEN, 1: SELECTED, 2: HOVER, 3: FOG
	status: { type: Types.Number },
	size: { type: Types.Number, default: 50},
};