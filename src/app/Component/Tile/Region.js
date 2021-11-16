import { Component, Types } from "../../Library/Ecsy";

export class Region extends Component {}

/**
 * Contains list of tile map positions
 */
 Region.schema = {
	value: { type: Types.Array },
};