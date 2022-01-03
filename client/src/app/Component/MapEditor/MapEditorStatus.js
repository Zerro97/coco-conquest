import { Component, Types } from "../../Library/Ecsy";

export class MapEditorStatus extends Component {}

/**
 * While science is geared towards unlocking new units & buildings
 * Fame unlocks kingdom wide perks
 */
 MapEditorStatus.schema = {
    name: { type: Types.String },
    width: { type: Types.Number, default: 0 },
    height: { type: Types.Number, default: 0 },
    playerCount: { type: Types.Number, default: 0 }
};
