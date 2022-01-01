import { System } from "../../../Library/Ecsy";
import { 
  Money, 
  MoneyGeneration, 
  Food, 
  FoodGeneration, 
  Science, 
  ScienceGeneration, 
  GlobalStatus,
  ResourceStatus
} from "../../../Component";
import { TurnType } from "../../../Type";

export class ResourceSystem extends System {
	execute(delta, time) {
    this.trackFame();
    this.trackFood();
    this.trackMoney();
    this.trackScience();
	}

  trackMoney() {
    const globalStatus = this.queries.globalStatus.results[0].getComponent(GlobalStatus);
    const resourceStatus = this.queries.resourceStatus.results[0].getMutableComponent(ResourceStatus);
    
    if(globalStatus.turnStatus === TurnType.TURN_STARTED) {
      // TODO: update money generation/consumption from sum of all resource generating stuff
      resourceStatus.moneyGeneration = 10;
      resourceStatus.moneyConsumption = 5;
    }
  }

  trackScience() {
    const globalStatus = this.queries.globalStatus.results[0].getComponent(GlobalStatus);
    const resourceStatus = this.queries.resourceStatus.results[0].getMutableComponent(ResourceStatus);
    
    if(globalStatus.turnStatus === TurnType.TURN_STARTED) {
      // TODO: update money generation/consumption from sum of all resource generating stuff
      resourceStatus.scienceGeneration = 10;
      resourceStatus.scienceConsumption = 5;
    }
  }

  trackFood() {
    const globalStatus = this.queries.globalStatus.results[0].getComponent(GlobalStatus);
    const resourceStatus = this.queries.resourceStatus.results[0].getMutableComponent(ResourceStatus);
    
    if(globalStatus.turnStatus === TurnType.TURN_STARTED) {
      // TODO: update money generation/consumption from sum of all resource generating stuff
      resourceStatus.foodGeneration = 10;
      resourceStatus.foodConsumption = 5;
    }
  }

  trackFame() {
    const globalStatus = this.queries.globalStatus.results[0].getComponent(GlobalStatus);
    const resourceStatus = this.queries.resourceStatus.results[0].getMutableComponent(ResourceStatus);
    
    if(globalStatus.turnStatus === TurnType.TURN_STARTED) {
      // TODO: update money generation/consumption from sum of all resource generating stuff
      resourceStatus.fameGeneration = 10;
      resourceStatus.fameConsumption = 5;
    }
  }
}

// Define a query of entities that have "Velocity" and "Position" components
ResourceSystem.queries = {
	globalStatus: {
    components: [GlobalStatus]
  },
  resourceStatus: {
    components: [ResourceStatus]
  }
};