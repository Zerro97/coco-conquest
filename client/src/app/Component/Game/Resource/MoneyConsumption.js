import { Component, Types } from "../../../Library/Ecsy";

export class MoneyConsumption extends Component {}

MoneyConsumption.schema = {
  value: { type: Types.Number, default: 10 },
};
