import { Component, Types } from "../../../Library/Ecsy";

export class MoneyGeneration extends Component {}

MoneyGeneration.schema = {
  value: { type: Types.Number, default: 10 },
};
