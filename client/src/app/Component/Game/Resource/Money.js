import { Component, Types } from "../../../Library/Ecsy";

export class Money extends Component {}

Money.schema = {
  value: { type: Types.Number, default: 0 },
};
