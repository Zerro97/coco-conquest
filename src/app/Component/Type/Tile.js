import { Component, Types } from '../../Library/Ecsy';

export class Tile extends Component {}

Tile.schema = {
	// 	0: PLAIN, 1: MOUNTAIN, 2: OCEAN, 3: MOOR, 4: City
	base: { type: Types.Number, default: 0 },

	// 0: Conifer Dense Spot
	// 1: Conifer Dense No Spot
	// 2: Conifer Sparse Spot
	// 3: Conifer Sparse No Spot

	// 4: Deciduous	Dense Spot
	// 5: Deciduous Dense No Spot
	// 6: Deciduous Sparse Spot
	// 7: Deciduous Sparse No Spot

	// 8: Grassland Dense Spot
	// 9: Grassland Dense No Spot
	// 10: Grassland Sparse Spot
	// 11: Grassland Sparse No Spot

	// 12: Hills Dense Spot
	// 13: Hills Dense No Spot
	// 14: Hills Sparse Spot
	// 15: Hills Sparse No Spot

	// 16: Valley Dense Spot
	// 17: Valley Dense No Spot
	// 18: Valley Sparse Spot
	// 19: Valley Sparse No Spot
	type: { type: Types.Number, default: 0 },

	// Different image sets
	variation: { type: Types.Number, default: 0 },

	// 0: SEEN, 1: SELECTED, 2: HOVER, 3: FOG
	status: { type: Types.Number },
	size: { type: Types.Number, default: 50},
};