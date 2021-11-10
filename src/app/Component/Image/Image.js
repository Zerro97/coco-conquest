import { Component, Types } from '../../Library/Ecsy';

export class Image extends Component {}

// Stores image object
Image.schema = {
	// Name of the image file
	name: { type: Types.String },

	// Binary data for image
	value: { type: Types.Ref }
};