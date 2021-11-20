import { System } from "../../Library/Ecsy";
import {  } from "../../Component";
import {  } from "../../Type";
import {  } from "../../Util";

export class TurnSystem extends System {
  execute(delta, time) {

  }

  nextTurn() {

  } 
}

TurnSystem.queries = {
  turn: {
    components: [Turn]
  }
};
