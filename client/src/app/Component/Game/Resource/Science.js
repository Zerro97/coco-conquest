import { Component, Types } from "../../../Library/Ecsy";

export class Science extends Component {}

Science.schema = {
  value: { type: Types.Number, default: 0 },
};
