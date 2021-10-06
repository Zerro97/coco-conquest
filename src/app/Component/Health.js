import { Component, Types } from '../Library/Ecsy';

export class Health extends Component {}

Health.schema = {
	value: { type: Types.Number },
};