import { Component, Types } from '../../Library/Ecsy';

export class KeyboardStatus extends Component {}

KeyboardStatus.schema = {
	// List of keys, true if pressing key, false if not
    // ex. value['a'] = true
	value: { type: Types.JSON },
};