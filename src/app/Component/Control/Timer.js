import { Component, Types } from '../../Library/Ecsy';

export class Timer extends Component {}

Timer.schema = {
	maxTime: { type: Types.Number, default: 0},
	curTime: { type: Types.Number, default: 0}
};