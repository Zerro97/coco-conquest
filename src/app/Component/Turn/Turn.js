import { Component, Types } from "../../Library/Ecsy";

export class Turn extends Component {}

Turn.schema = {
	// Current turn
	currentTurn: { type: Types.Number },

  // Max turn until game over
  maxTurn: { type: Types.Number } 
};