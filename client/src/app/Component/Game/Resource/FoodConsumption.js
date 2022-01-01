import { Component, Types } from "../../../Library/Ecsy";

export class FoodConsumption extends Component {}

FoodConsumption.schema = {
  value: { type: Types.Number, default: 10 },
};
