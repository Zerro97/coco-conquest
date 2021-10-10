import { Component, Types } from '../../Library/Ecsy';

export class BuildingImage extends Component {}

// Stores image object
BuildingImage.schema = {
	value: { type: Types.Ref },
};