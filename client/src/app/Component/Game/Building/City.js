import { Component, Types } from "../../../Library/Ecsy";

export class City extends Component {}

/**
 * Components that are used together:
 * 
 * MapPosition: for tracking city's location on map
 * Player: for tracking to which player city belong to
 * FoodGeneration: how much food does the city produce
 * FoodConsumption: how much food does the city use
 * MoneyGeneration: how much money does the city produce
 * MoneyConsumption: how much money does the city use
 * ScienceGeneration: how much science does the city produce
 * ScienceConsumption: how much science does the city use
 */
City.schema = {
    // Unique id for each city player own
    id: { type: Types.Number, default: 0 },
    // What is the name of city?
    name: { type: Types.Number, default: 0 },

    // Buildings & Units
    infrastructures: { type: Types.Array },
    districts: { type: Types.Array },
    units: { type: Types.Array },
};