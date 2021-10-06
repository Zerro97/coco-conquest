import { Component, Types } from '../Library/Ecsy';

export class MapPosition extends Component {}

MapPosition.schema = {
	x: { type: Types.Number },
	y: { type: Types.Number }
};