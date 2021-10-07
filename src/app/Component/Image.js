import { Component, Types } from '../Library/Ecsy';

export class Image extends Component {}

// Stores image object
Image.schema = {
	value: { type: Types.Ref },
};