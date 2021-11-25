import { Component, Types } from "../../Library/Ecsy";

export class Room extends Component {}

Room.schema = {
    roomId: { type: Types.Number, default: false },
    roomName: { type: Types.String, default: false },
    roomPass: { type: Types.String, default: false },
    creatorName: { type: Types.String, default: false },
    curPlayerCount: { type: Types.Number, default: false },
    maxPlayerCount: { type: Types.Number, default: false },
};