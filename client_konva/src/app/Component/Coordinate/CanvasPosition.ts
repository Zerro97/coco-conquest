import { Component, Types } from "@/Ecsy";

export class CanvasPosition extends Component<any> {}

CanvasPosition.schema = {
  x: { type: Types.Boolean, default: false },
  y: { type: Types.Boolean, default: false }
};