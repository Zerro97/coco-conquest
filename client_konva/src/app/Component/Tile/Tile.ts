import { Component, Types } from "@/Ecsy";

export class Tile extends Component<any> { }

Tile.schema = {
  category: { type: Types.String },
  type: { type: Types.String },
};