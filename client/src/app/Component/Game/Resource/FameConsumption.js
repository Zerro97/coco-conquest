import { Component, Types } from "../../../Library/Ecsy";

export class FameConsumption extends Component {}

FameConsumption.schema = {
  value: { type: Types.Number, default: 10 },
};
