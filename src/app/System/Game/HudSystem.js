import { System } from "../../Library/Ecsy";
import { Hud, CurrentHudSelect, Turn } from "../../Component";
import { HudType } from "../../Type";

export class HudSystem extends System {
  execute(delta, time) {
    this.checkHudSelect();
  }

  checkHudSelect() {
    const hud = this.queries.currentHudSelect.results[0];

    if(hud) {
      const type = hud.getComponent(Hud).type;

      switch(type) {
        case HudType.TURN_BUTTON: {
          const turn = this.queries.turn.results[0].getMutableComponent(Turn);
          turn.currentTurn += 1;
          
          break;
        }
      }
    }
  }
}

HudSystem.queries = {
  currentHudSelect: {
    components: [Hud, CurrentHudSelect]
  },
  turn: {
    components: [Turn]
  }
};
