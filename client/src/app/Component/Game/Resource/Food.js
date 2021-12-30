import { Component, Types } from "../../../Library/Ecsy";

export class Food extends Component {}

Food.schema = {
  value: { type: Types.Number, default: 0 },
};
