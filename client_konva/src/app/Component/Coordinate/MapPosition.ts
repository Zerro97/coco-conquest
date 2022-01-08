import { Component, Types } from "../../Ecsy";

export class MapPosition extends Component<any> {}

MapPosition.schema = {
  x: { type: Types.Boolean, default: false },
  y: { type: Types.Boolean, default: false }
};