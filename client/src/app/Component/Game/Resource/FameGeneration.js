import { Component, Types } from "../../../Library/Ecsy";

export class FameGeneration extends Component {}

FameGeneration.schema = {
  value: { type: Types.Number, default: 10 },
};
