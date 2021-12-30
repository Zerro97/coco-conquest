import { System } from "../../../Library/Ecsy";
import { 
  Money, 
  MoneyGeneration, 
  Food, 
  FoodGeneration, 
  Science, 
  ScienceGeneration, 
  GlobalStatus 
} from "../../../Component";
import { TurnType } from "../../../Type";

export class ResourceSystem extends System {
	execute(delta, time) {
    this.generateMoney();
    this.generateFood();
    this.generateScience();
	}

  generateMoney() {
    const globalStatus = this.queries.globalStatus.results[0].getComponent(GlobalStatus);
    const currentMoney = this.queries.moneyStatus.results[0].getMutableComponent(Money);
    const moneyGenerationRate = this.queries.moneyStatus.results[0].getMutableComponent(MoneyGeneration);
    
    if(globalStatus.turnStatus === TurnType.TURN_STARTED) {
      console.log(currentMoney.value);
      currentMoney.value += moneyGenerationRate.value;
    }
  }

  generateScience() {
    const globalStatus = this.queries.globalStatus.results[0].getComponent(GlobalStatus);
    const currentScience = this.queries.scienceStatus.results[0].getMutableComponent(Science);
    const scienceGenerationRate = this.queries.scienceStatus.results[0].getMutableComponent(ScienceGeneration);
    
    if(globalStatus.turnStatus === TurnType.TURN_STARTED) {
      currentScience.value += scienceGenerationRate.value;
    }
  }

  generateFood() {
    const globalStatus = this.queries.globalStatus.results[0].getComponent(GlobalStatus);
    const currentFood = this.queries.foodStatus.results[0].getMutableComponent(Food);
    const foodGenerationRate = this.queries.foodStatus.results[0].getMutableComponent(FoodGeneration);
    
    if(globalStatus.turnStatus === TurnType.TURN_STARTED) {
      currentFood.value += foodGenerationRate.value;
    }
  }
}

// Define a query of entities that have "Velocity" and "Position" components
ResourceSystem.queries = {
	globalStatus: {
    components: [GlobalStatus]
  },
  moneyStatus: {
    components: [Money, MoneyGeneration]
  },
  foodStatus: {
    components: [Food, FoodGeneration]
  },
  scienceStatus: {
    components: [Science, ScienceGeneration]
  },
};