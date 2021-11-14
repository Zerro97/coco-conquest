import { Component, Types } from "../../Library/Ecsy";

export class ScreenFocusStatus extends Component {}

ScreenFocusStatus.schema = {
	// Center canvas coordinate
  prevCenterX: { type: Types.Number, default: -999},
  prevCenterY: { type: Types.Number, default: -999},

  // Does it need to start focusing
  // Note it becomes true only one frame (when it starts focusing)
  startFocusing: { type: Types.Boolean, default: false}
};