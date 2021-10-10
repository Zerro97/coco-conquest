import { Component, Types } from '../../Library/Ecsy';

export class UnitImage extends Component {}

// Stores image object
UnitImage.schema = {
	value: { type: Types.Ref },
};