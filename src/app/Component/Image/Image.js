import { Component, Types } from '../../Library/Ecsy';

export class Image extends Component {}

// Stores image object
Image.schema = {
	name: { type: Types.String },
	value: { type: Types.Ref }
};