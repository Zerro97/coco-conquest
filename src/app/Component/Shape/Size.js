import { Component, Types } from '../../Library/Ecsy';

export class Size extends Component {}

Size.schema = {
	width: { type: Types.Number },
	height: { type: Types.Number }
};