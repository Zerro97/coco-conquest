import { Component, Types } from "../../../Library/Ecsy";

export class Production extends Component {}

Production.schema = {
  // How many turns required to produce unit/building
  maxTurn: { type: Types.Number, default: 5 },
  // What is current turn until the production completes
  curTurn: { type: Types.Number, default: 0 },
  // Where is unit/building being produced
  site: { type: Types.Number, default: 0 },
  // Is it a unit or building
  category: { type: Types.Number, default: 0 },
  // What is specific type of unit/building
  type: { type: Types.Number, default: 0 },
};