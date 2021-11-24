import { Component, Types } from "../../Library/Ecsy";

/**
 * Component attached to game entities to
 * track to which team the entity belongs
 */
export class Team extends Component {}

Team.schema = {
	value: { type: Types.Number },
};