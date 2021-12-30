import { Component, Types } from "../../../Library/Ecsy";

export class FoodGeneration extends Component {}

FoodGeneration.schema = {
  value: { type: Types.Number, default: 10 },
};
