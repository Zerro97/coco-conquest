import { Component, Types } from '../../Library/Ecsy';

export class IconImage extends Component {}

// Stores image object
IconImage.schema = {
	value: { type: Types.Ref },
};