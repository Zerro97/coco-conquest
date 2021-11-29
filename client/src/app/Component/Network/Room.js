import { Component, Types } from "../../Library/Ecsy";

export class Room extends Component {}

Room.schema = {
    roomId: { type: Types.String, default: "000000" },
    roomName: { type: Types.String, default: "Game" },
    roomPass: { type: Types.String, default: "" },
    creatorName: { type: Types.String, default: "" },
    curPlayerCount: { type: Types.Number, default: 1 },
    maxPlayerCount: { type: Types.Number, default: 6 }
};