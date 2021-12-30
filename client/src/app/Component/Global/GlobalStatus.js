import { Component, Types } from "../../Library/Ecsy";

/**
 * Keep track of global information like how many teams are there
 * Note game's status like if it's currently in menu are handled
 * in GameStatus component
 */
export class GlobalStatus extends Component {}

GlobalStatus.schema = {
	// How many teams are there
	teamCount: { type: Types.Number },

	// Which team you belong to
	myTeamId: { type: Types.Number },

  // Tells whether its beggining/during/ending of my turn
  // TURN_STARTED: 0,
  // IS_MY_TURN: 1,
  // TURN_ENDED: 2,
  // IS_NOT_MY_TURN: 3
  turnStatus: { type: Types.Number, default: 3 }

};