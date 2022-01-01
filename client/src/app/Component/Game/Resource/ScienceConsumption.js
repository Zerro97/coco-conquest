import { Component, Types } from "../../../Library/Ecsy";

export class ScienceConsumption extends Component {}

ScienceConsumption.schema = {
  value: { type: Types.Number, default: 10 },
};
