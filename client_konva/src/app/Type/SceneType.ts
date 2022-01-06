export enum Scene {
    MENU,
    SETTING,

    // Single Player
    SINGLE_PLAY_MENU,
    SINGLE_PLAY_SETUP,
    SINGLE_PLAY_LOAD,

    // Multi Player
    MULTI_PLAY_MENU,
    MULTI_PLAY_SETUP,
    MULTI_PLAY_STAGE,

    // Actual Game
    GAME_LOADING,
    GAME,
    GAME_END,

    // Others
    MAP_EDITOR_SETUP,
    MAP_EDITOR
}