import { Component, Types } from "../../Library/Ecsy";

export class SocketEvents extends Component {}

SocketEvents.schema = {
    creatingRoom: { type: Types.Boolean, default: false },
    joiningRoom: { type: Types.Boolean, default: false },

    // Global Game
    startingGame: { type: Types.Boolean, default: false },
    endingTurn: { type: Types.Boolean, default: false },

    // Individual Game
    creatingUnit: { type: Types.Boolean, default: false },
    damagingUnit: { type: Types.Boolean, default: false },
    movingUnit: { type: Types.Boolean, default: false },

    creatingBuilding: { type: Types.Boolean, default: false },
    damagingBuilding: { type: Types.Boolean, default: false },

    creatingMap: { type: Types.Boolean, default: false }
};