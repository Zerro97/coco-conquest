import { Component, Types } from "../../Library/Ecsy";

export class ResourceStatus extends Component {}

/**
 * Tracks the total resource upkeep of player
 * Calculated by summing up all the resource generation and consumptions
 * 
 * Components that are used together:
 * Money: For tracking the current total amount of money player own
 */
ResourceStatus.schema = {
	// Generation
	foodGeneration: { type: Types.Number, default: 0 },
	moneyGeneration: { type: Types.Number, default: 0 },
	scienceGeneration: { type: Types.Number, default: 0 },
	fameGeneration: { type: Types.Number, default: 0 },

	// Consumption
	foodConsumption: { type: Types.Number, default: 0 },
	moneyConsumption: { type: Types.Number, default: 0 },
	scienceConsumption: { type: Types.Number, default: 0 },
	fameConsumption: { type: Types.Number, default: 0 },

	// Current
	money: { type: Types.Number, default: 0 },
};