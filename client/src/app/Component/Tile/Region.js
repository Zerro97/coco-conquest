import { Component, Types } from "../../Library/Ecsy";

export class Region extends Component {}

/**
 * Store to which region the tile belongs to
 */
 Region.schema = {
	// Region id that the tile belong to.
	region: { type: Types.Number },
	// Store id of player owning this region. -1 if no one owns it
	player: { type: Types.Number }
};