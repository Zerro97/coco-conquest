export const SocketEvent = {
    // Room
    CREATE_ROOM: "room:create",
    JOIN_ROOM: "room:join",

    // Global Game
    START_GAME: "game:create",
    TURN_END: "game:turn_end",

    // Individual Game
    UNIT_CREATED: "unit:create",
    UNIT_DAMAGED: "unit:damage",
    UNIT_MOVED: "unit:move",

    BUILDING_CREATED: "building:create",
    BUILDING_DAMAGED: "building:damage",

    MAP_CREATED: "tile:create",
};