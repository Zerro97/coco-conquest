import { Component, Types } from "../../Library/Ecsy";

export class ScreenFocusStatus extends Component {}

ScreenFocusStatus.schema = {
  // Position to center to
  x: { type: Types.Number, default: -999},
  y: { type: Types.Number, default: -999},

  // Current position while moving (relative to the screen viewed (transformed coordinate))
  curX: { type: Types.Number, default: -999},
  curY: { type: Types.Number, default: -999},

  // Does it need to start focusing
  // Note it becomes true only one frame (when it starts focusing)
  startFocusing: { type: Types.Boolean, default: false}
};