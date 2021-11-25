export const SocketEvent = {
    // Room
    CREATING_ROOM: "room:create",
    ROOM_CREATED: "room:onCreate",
    JOINING_ROOM: "room:join",
    ROOM_JOINED: "room:onJoin",

    // Global Game
    CREATING_GAME: "game:create",
    GAME_CREATED: "game:onCreate",
    ENDING_TURN: "game:turnEnd",
    TURN_ENDED: "game:onTurnEnd",

    // Individual Game
    CREATING_UNIT: "unit:create",
    UNIT_CREATED: "unit:onCreate",
    DAMAGING_UNIT: "unit:damage",
    UNIT_DAMAGED: "unit:onDamage",
    MOVING_UNIT: "unit:move",
    UNIT_MOVED: "unit:onMove",

    CREATING_BUILDING: "building:create",
    BUILDING_CREATED: "building:onCreate",
    DAMAGING_BUILDING: "building:damage",
    BUILDING_DAMAGED: "building:onDamage",

    CREATING_MAP: "tile:create",
    MAP_CREATED: "tile:onCreate"
};