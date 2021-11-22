import { System } from "../../../Library/Ecsy";
import { Turn, GlobalStatus } from "../../../Component";
import {  } from "../../../Type";
import {  } from "../../../Util";

export class GlobalGameSystem extends System {
  execute(delta, time) {
    this.updateTurn();
  }

  /**
   * 1) Track which team's turn it is
   * 2) Increase current turn if all the player's finished moving
   */
  updateTurn() {
    const globalStatus = this.queries.globalStatus.results[0].getComponent(GlobalStatus);
    const turnStatus = this.queries.turn.results[0].getMutableComponent(Turn);
    
    if(turnStatus.turnProgress >= globalStatus.teamCount) {
        turnStatus.currentTurn += 1;
        turnStatus.turnProgress = 0;
    }
  }
}

GlobalGameSystem.queries = {
  turn: {
    components: [Turn],
  },
  globalStatus: {
    components: [GlobalStatus]
  }
};
