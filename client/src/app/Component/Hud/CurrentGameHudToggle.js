import { Component, Types } from "../../Library/Ecsy";

export class CurrentGameHudToggle extends Component {}

/**
 * Contains list of toggleable game huds and
 * indicate which game huds is currently showing on screen
 */
CurrentGameHudToggle.schema = {
	value: { type: Types.JSON },
};