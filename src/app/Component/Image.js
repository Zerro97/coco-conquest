import { Component, Types } from '../Library/Ecsy';

export class Image extends Component {}

// Stores the file path of the image asset
Image.schema = {
	value: { type: Types.Ref },
};