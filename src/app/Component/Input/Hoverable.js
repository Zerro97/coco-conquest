import { Component, Types } from "../../Library/Ecsy";

export class Hoverable extends Component {}

// Type: RECTANGLE, CIRCLE, HEXAGON
Hoverable.schema = {
  shape: { type: Types.Number },
};