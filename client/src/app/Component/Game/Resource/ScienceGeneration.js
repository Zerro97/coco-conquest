import { Component, Types } from "../../../Library/Ecsy";

export class ScienceGeneration extends Component {}

ScienceGeneration.schema = {
  value: { type: Types.Number, default: 10 },
};
