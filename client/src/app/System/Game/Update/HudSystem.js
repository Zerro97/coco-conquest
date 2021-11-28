import { System } from "../../../Library/Ecsy";
import { Hud, CurrentHudClick, Turn } from "../../../Component";
import { HudType } from "../../../Type";

export class HudSystem extends System {
  execute(delta, time) {
    this.checkHudSelect();
  }

  checkHudSelect() {
    const hud = this.queries.currentHudClick.results[0];

    if(hud) {
      const type = hud.getComponent(Hud).type;

      switch(type) {
        case HudType.TURN_BUTTON: {
          const turn = this.queries.turn.results[0].getMutableComponent(Turn);
          turn.turnProgress += 1;
          
          break;
        }
      }
    }
  }
}

HudSystem.queries = {
  currentHudClick: {
    components: [Hud, CurrentHudClick]
  },
  turn: {
    components: [Turn]
  }
};
