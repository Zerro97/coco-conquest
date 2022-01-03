/**
 * 1) Single play --> Setup Game / Load Game
 * 2) Multi play --> Setup Game / Load Game / Join Game
 * 3) Setting
 * 4) Exit
 */
export const SceneType = {
	MENU: 0,
    SETTING: 1,

    // Single Player
    SINGLE_PLAY: 2,
    SINGLE_SETUP_GAME: 3,
    LOAD_GAME: 4,

    // Multi Player
    LOBBY: 5,
    MULTI_SETUP_GAME: 6,
    MULTI_STAGE_GAME: 7,

    // Actual Game
    LOADING_GAME: 8,
    GAME: 9,
    END_GAME: 10,

    // Others
    MAP_EDITOR_SETUP: 11,
    MAP_EDITOR: 12
};