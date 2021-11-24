import { Component, Types } from "../../Library/Ecsy";

export class Turn extends Component {}

Turn.schema = {
  // Track which team's turn it is
  turnProgress: { type: Types.Number, default: 0 },

	// Current turn
	currentTurn: { type: Types.Number, default: 0 },

  // Max turn until game over
  maxTurn: { type: Types.Number, default: 300 } 
};