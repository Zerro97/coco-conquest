/**
 * 1) Single play --> Setup Game / Load Game
 * 2) Multi play --> Setup Game / Load Game / Join Game
 * 3) Setting
 * 4) Exit
 */
export const SceneType = {
	MENU: 0,

    SINGLE_PLAY: 1,
    MULTI_PLAY: 2,
    SETTING: 3,

    SETUP_GAME: 4,
    LOAD_GAME: 5,
    JOIN_GAME: 6,

    LOADING_GAME: 7,
    GAME: 8,
    END_GAME: 9
};