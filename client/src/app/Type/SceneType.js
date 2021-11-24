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

    SINGLE_SETUP_GAME: 4,
    MULTI_SETUP_GAME: 5,
    LOAD_GAME: 6,
    JOIN_GAME: 7,

    LOADING_GAME: 8,
    GAME: 9,
    END_GAME: 10
};