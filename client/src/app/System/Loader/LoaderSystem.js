import { System } from "../../Library/Ecsy";
import {
  Image,
  UnitImage,
  BuildingImage,
  IconImage,
  TileImage,
  BackgroundImage,
  ScreenStatus,
  Region,
  Tile,
  TileMap,
  GlobalStatus,
  ScreenFocusStatus,
  ActionStatus,
  MovePosition,
  AttackPosition,
  SelectPosition,
  MouseStatus,
  KeyboardStatus,
  Block,
  Timer,
  WeightMap,
  PreviousSelect,
  GameStatus,
  Turn,
  SceneStatus,
  SocketEvents,
  Food,
  FoodGeneration,
  Science,
  ScienceGeneration,
  Money,
  MoneyGeneration,
  ResourceStatus
} from "../../Component";
import { 
  RegionSystem,
  RenderSystem,
  ScreenSystem,
  TileRenderSystem,
  UnitRenderSystem,
  BuildingRenderSystem,
  GameHudSystem,
  HudRenderSystem,
  ActionSystem,
  GlobalGameSystem,
  HudSystem,
  MovementSystem,
  UnitSystem
} from "../../System";
import { evenrToPixel } from "../../Util";
import { TileSize, SceneType } from "../../Type";

export class LoaderSystem extends System {
  execute(delta, time) {
    // Bring images to ECS system
    this.loadImages();

    // Create all the singleton instances
    this.generateSingletons();

    // Initial screen position
    this.setInitialPosition();

    // Stop all game related systems
    this.stopGame();

    // Stop loader from executing after finish loading
    this.stop();
  }
  
  generateSingletons() {
    // Singleton entities
    this.world
      .createEntity()
      .addComponent(ScreenStatus);
    this.world
      .createEntity()
      .addComponent(ScreenFocusStatus);
    this.world
      .createEntity()
      .addComponent(ActionStatus)
      .addComponent(MovePosition)
      .addComponent(AttackPosition)
      .addComponent(SelectPosition);
    this.world
      .createEntity()
      .addComponent(MouseStatus);
    this.world
      .createEntity()
      .addComponent(KeyboardStatus);
    this.world
      .createEntity()
      .addComponent(Block)
      .addComponent(Timer);
    this.world
      .createEntity()
      .addComponent(WeightMap, { value: {} });
    this.world
      .createEntity()
      .addComponent(PreviousSelect);
    this.world
      .createEntity()
      .addComponent(GlobalStatus, { teamCount: 4, myTeamId: 0 })
      .addComponent(GameStatus);
    this.world
      .createEntity()
      .addComponent(Turn, { currentTurn: 0, maxTurn: 300 });
    this.world
      .createEntity()
      .addComponent(SceneStatus, { currentScene: SceneType.MENU });
    this.world
      .createEntity()
      .addComponent(SocketEvents);
    
    // Resource
    this.world
      .createEntity()
      .addComponent(ResourceStatus);
  }

  loadImages() {
    let counter = {
      icon: 0,
      tile: 0,
      unit: 0,
      building: 0,
      background: 0,
    };

    let iconKeys = Object.keys(this.iconImages);
    let tileKeys = Object.keys(this.tileImages);
    let unitKeys = Object.keys(this.unitImages);
    let buildingKeys = Object.keys(this.buildingImages);
    let backgroundKeys = Object.keys(this.backgroundImages);

    this.queries.images.results.forEach((entity) => {
      var image = entity.getMutableComponent(Image);

      if (entity.hasComponent(UnitImage)) {
        image.name = unitKeys[counter.unit];
        image.value = this.unitImages[unitKeys[counter.unit]];
        counter.unit += 1;
      } else if (entity.hasComponent(BuildingImage)) {
        image.name = buildingKeys[counter.building];
        image.value = this.buildingImages[buildingKeys[counter.building]];
        counter.building += 1;
      } else if (entity.hasComponent(TileImage)) {
        image.name = tileKeys[counter.tile];
        image.value = this.tileImages[tileKeys[counter.tile]];
        counter.tile += 1;
      } else if (entity.hasComponent(IconImage)) {
        image.name = iconKeys[counter.icon];
        image.value = this.iconImages[iconKeys[counter.icon]];
        counter.icon += 1;
      } else if (entity.hasComponent(BackgroundImage)) {
        image.name = backgroundKeys[counter.background];
        image.value = this.backgroundImages[backgroundKeys[counter.background]];
        counter.background += 1;
      }
    });
  }

  setInitialPosition() {
    let screenStatus = this.queries.screenStatus.results[0].getMutableComponent(ScreenStatus);
    let canvasPos = evenrToPixel(
      this.mapWidth / 2,
      this.mapHeight / 2,
      TileSize.REGULAR
    );

    screenStatus.x = canvasPos.x - this.canvasWidth / 2;
    screenStatus.y = canvasPos.y - this.canvasHeight / 2;
  }

  stopGame() {
      // Render
      this.world.getSystem(RegionSystem).stop();
      this.world.getSystem(RenderSystem).stop();
      this.world.getSystem(ScreenSystem).stop();
      this.world.getSystem(TileRenderSystem).stop();
      this.world.getSystem(UnitRenderSystem).stop();
      this.world.getSystem(BuildingRenderSystem).stop();
      this.world.getSystem(GameHudSystem).stop();
      this.world.getSystem(HudRenderSystem).stop();
  
      // Update
      this.world.getSystem(ActionSystem).stop();
      this.world.getSystem(GlobalGameSystem).stop();
      this.world.getSystem(HudSystem).stop();
      this.world.getSystem(MovementSystem).stop();
      this.world.getSystem(UnitSystem).stop();
  }
}

LoaderSystem.queries = {
  images: {
    components: [Image],
  },
  screenStatus: {
    components: [ScreenStatus],
  }
};
