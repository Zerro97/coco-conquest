import { Component, Types } from "../../../Library/Ecsy";

export class Fame extends Component {}

/**
 * While science is geared towards unlocking new units & buildings
 * Fame unlocks kingdom wide perks
 */
Fame.schema = {
  value: { type: Types.Number, default: 0 },
};
