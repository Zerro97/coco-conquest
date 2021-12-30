import { System } from "../../../Library/Ecsy";
import { Turn, GlobalStatus } from "../../../Component";
import { TurnType } from "../../../Type";
import {  } from "../../../Util";

export class GlobalGameSystem extends System {
  execute(delta, time) {
    this.updateTurn();
  }

  /**
   * 1) Track which team's turn it is & notify if it's beginning of player's turn
   * 2) Increase current turn if all the player's finished moving
   */
  updateTurn() {
    const globalStatus = this.queries.globalStatus.results[0].getMutableComponent(GlobalStatus);
    const turnStatus = this.queries.turn.results[0].getMutableComponent(Turn);

    // Update the turn status (whether its' players turn or not)
    if(turnStatus.turnProgress === globalStatus.myTeamId) {
      if(globalStatus.turnStatus === TurnType.TURN_STARTED) {
        globalStatus.turnStatus = TurnType.IS_MY_TURN;
      }
      if(globalStatus.turnStatus === TurnType.IS_NOT_MY_TURN) {
        globalStatus.turnStatus = TurnType.TURN_STARTED;
      }
    } else {
      if(globalStatus.turnStatus === TurnType.TURN_ENDED) {
        globalStatus.turnStatus = TurnType.IS_NOT_MY_TURN;
      }
      if(globalStatus.turnStatus === TurnType.IS_MY_TURN) {
        globalStatus.turnStatus = TurnType.TURN_ENDED;
      }
    }

    // Update the current turn count
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
