import { System } from "../../Library/Ecsy";
import {
  Image,
  UnitImage,
  BuildingImage,
  IconImage,
  TileImage,
  BackgroundImage,
  HudHoverable,
  HudSelectable,
  ScreenStatus,
  Region,
  Tile,
  TileMap,
  MapPosition,
  CanvasPosition,
  Shape,
  Radius,
  Hud,
  Size,
  Team,
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
  MenuHud,
  Scene,
  MenuScene,
  SinglePlayScene,
  MultiPlayScene,
  SetUpScene
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
import { MapGenerator, UnitGenerator, BuildingGenerator } from "../../Assemblage";
import { cubeToEvenr, evenrToCube, evenrToPixel } from "../../Util";
import { TileSize, HudType, ObjectShape, UnitType, BuildingType, SceneType, MenuHudType } from "../../Type";

export class LoaderSystem extends System {
  execute(delta, time) {
    // Bring images to ECS system
    this.loadImages();

    // Create all the singleton instances
    this.generateSingletons();

    // Generate menu hud entities
    this.generateMenuHuds();

    // Initial screen position
    this.setInitialPosition();

    // Generate hud entities
    this.generateHuds();

    // Map & Unit Generation
    this.generateInitialMap();
    this.generateInitialBuilding();
    this.generateInitialUnit();

    // Map Preparation
    this.generateTileMap();
    this.assignTileToMap();
    this.assignRegions(10);

    // Stop all game related systems
    this.stopGame();

    //
    this.stop();
  }

  generateInitialUnit() {
    const unitGenerator = new UnitGenerator(this.world);
    
    // Adding Units
    unitGenerator.generateUnit(UnitType.ARCHER , 5, 10, 0);
    unitGenerator.generateUnit(UnitType.WARRIOR , 5, 9, 0);
    unitGenerator.generateUnit(UnitType.SKELETON , 7, 10, 1);
    unitGenerator.generateUnit(UnitType.WEREWOLF , 7, 9, 1);
  }

  generateInitialBuilding() {
    const buildingGenerator = new BuildingGenerator(this.world);
        
    // Adding Buildings
    buildingGenerator.generateBuilding(BuildingType.CASTLE, 6, 9, 0);
  }

  generateInitialMap() {
    const mapGenerator = new MapGenerator(this.world, 15);

    // Create Map
    mapGenerator.generateBiomeRegion();
    mapGenerator.generateMap();
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
      .addComponent(SceneStatus, { currentScene: SceneType.SETUP_GAME });
  }

  generateMenuHuds() {
    // Menu Buttons
    let menuButtonTypes = [
      MenuHudType.SINGLE_PLAY_BUTTON,
      MenuHudType.MULTI_PLAY_BUTTON,
      MenuHudType.SETTING_BUTTON,
      MenuHudType.EXIT_BUTTON
    ];

    for(let i=0; i<4; i++) {
      this.world
        .createEntity()
        .addComponent(MenuHud, {type: menuButtonTypes[i]})
        .addComponent(HudHoverable)
        .addComponent(HudSelectable)
        .addComponent(CanvasPosition, {x: this.canvasWidth/2 - 110, y: 350 + i * 50})
        .addComponent(Shape, {type: ObjectShape.RECTANGLE})
        .addComponent(Size, {width: 220, height: 40})
        .addComponent(MenuScene)
        .addComponent(Scene, {value: SceneType.MENU});
    }

    // Single Play Buttons
    let singlePlayButtonTypes = [
      MenuHudType.SETUP_GAME_BUTTON,
      MenuHudType.LOAD_GAME_BUTTON,
      MenuHudType.SINGLE_GO_BACK_BUTTON,
    ];

    for(let i=0; i<3; i++) {
      this.world
        .createEntity()
        .addComponent(MenuHud, {type: singlePlayButtonTypes[i]})
        .addComponent(HudHoverable)
        .addComponent(HudSelectable)
        .addComponent(CanvasPosition, {x: this.canvasWidth/2 - 110, y: 350 + i * 50})
        .addComponent(Shape, {type: ObjectShape.RECTANGLE})
        .addComponent(Size, {width: 220, height: 40})
        .addComponent(SinglePlayScene)
        .addComponent(Scene, {value: SceneType.SINGLE_PLAY});
    }

    // Multi Play Buttons
    let multiPlayButtonTypes = [
      MenuHudType.SETUP_GAME_BUTTON,
      MenuHudType.LOAD_GAME_BUTTON,
      MenuHudType.JOIN_GAME_BUTTON,
      MenuHudType.MULTI_GO_BACK_BUTTON,
    ];

    for(let i=0; i<4; i++) {
      this.world
        .createEntity()
        .addComponent(MenuHud, {type: multiPlayButtonTypes[i]})
        .addComponent(HudHoverable)
        .addComponent(HudSelectable)
        .addComponent(CanvasPosition, {x: this.canvasWidth/2 - 110, y: 350 + i * 50})
        .addComponent(Shape, {type: ObjectShape.RECTANGLE})
        .addComponent(Size, {width: 220, height: 40})
        .addComponent(MultiPlayScene)
        .addComponent(Scene, {value: SceneType.MULTI_PLAY});
    }

    // Set Up Game
    for(let i=0; i<8; i++) {
      this.world
        .createEntity()
        .addComponent(MenuHud, {type: MenuHudType.PLAYER_BOX})
        .addComponent(HudHoverable)
        .addComponent(HudSelectable)
        .addComponent(CanvasPosition, {x: this.canvasWidth/2 - 500, y: 100 + i * 55})
        .addComponent(Shape, {type: ObjectShape.RECTANGLE})
        .addComponent(Size, {width: 260, height: 50})
        .addComponent(SetUpScene)
        .addComponent(Scene, {value: SceneType.SETUP_GAME});
      
      this.world
        .createEntity()
        .addComponent(MenuHud, {type: MenuHudType.PLAYER_TEAM_BUTTON})
        .addComponent(HudHoverable)
        .addComponent(HudSelectable)
        .addComponent(CanvasPosition, {x: this.canvasWidth/2 - 220, y: 100 + i * 55})
        .addComponent(Shape, {type: ObjectShape.RECTANGLE})
        .addComponent(Size, {width: 50, height: 50})
        .addComponent(SetUpScene)
        .addComponent(Scene, {value: SceneType.SETUP_GAME});
    }

    this.world
      .createEntity()
      .addComponent(MenuHud, {type: MenuHudType.START_BUTTON})
      .addComponent(HudHoverable)
      .addComponent(HudSelectable)
      .addComponent(CanvasPosition, {x: this.canvasWidth/2 + 330, y: 730})
      .addComponent(Shape, {type: ObjectShape.RECTANGLE})
      .addComponent(Size, {width: 220, height: 50})
      .addComponent(SetUpScene)
      .addComponent(Scene, {value: SceneType.SETUP_GAME});

    this.world
      .createEntity()
      .addComponent(MenuHud, {type: MenuHudType.SINGLE_SETUP_GO_BACK_BUTTON})
      .addComponent(HudHoverable)
      .addComponent(HudSelectable)
      .addComponent(CanvasPosition, {x: this.canvasWidth/2 - 550, y: 730})
      .addComponent(Shape, {type: ObjectShape.RECTANGLE})
      .addComponent(Size, {width: 220, height: 50})
      .addComponent(SetUpScene)
      .addComponent(Scene, {value: SceneType.SETUP_GAME});
  }

  generateHuds() {
    // Turn button at bottom right
    this.world
      .createEntity()
      .addComponent(Hud, {type: HudType.TURN_BUTTON})
      .addComponent(HudHoverable)
      .addComponent(HudSelectable)
      .addComponent(CanvasPosition, {x: this.canvasWidth - 90, y: this.canvasHeight - 90})
      .addComponent(Shape, {type: ObjectShape.CIRCLE})
      .addComponent(Radius, {value: 60});

    // Map at bottom left
    this.world
      .createEntity()
      .addComponent(Hud, {type: HudType.MAP})
      .addComponent(HudSelectable)
      .addComponent(CanvasPosition, {x: 0, y: this.canvasHeight - 170})
      .addComponent(Shape, {type: ObjectShape.RECTANGLE})
      .addComponent(Size, {width: 300, height: 170});

    // Production panel at left (shown when clicking city)
    this.world
      .createEntity()
      .addComponent(Hud, {type: HudType.PRODUCTION_PANEL})
      .addComponent(HudSelectable)
      .addComponent(CanvasPosition, {x: 0, y: 50})
      .addComponent(Shape, {type: ObjectShape.RECTANGLE})
      .addComponent(Size, {width: 300, height: this.canvasHeight - 220});

    // Production categories
    this.world
      .createEntity()
      .addComponent(Hud, {type: HudType.PRODUCTION_UNIT})
      .addComponent(CanvasPosition, {x: 5, y: 60})
      .addComponent(Shape, {type: ObjectShape.RECTANGLE})
      .addComponent(Size, {width: 290, height: 30});

    this.world
      .createEntity()
      .addComponent(Hud, {type: HudType.PRODUCTION_BUILDING})
      .addComponent(CanvasPosition, {x: 5, y: 370})
      .addComponent(Shape, {type: ObjectShape.RECTANGLE})
      .addComponent(Size, {width: 290, height: 30});

    // Buttons for units
    for(let i=0; i< 8; i++) {
      this.world
        .createEntity()
        .addComponent(Hud, {type: HudType.PRODUCTION_BUTTON})
        .addComponent(CanvasPosition, {x: 5, y: 100 + i * 32})
        .addComponent(HudHoverable)
        .addComponent(Shape, {type: ObjectShape.RECTANGLE})
        .addComponent(Size, {width: 290, height: 30});
    }

    // Buttons for buildings
    for(let i=0; i< 8; i++) {
      this.world
        .createEntity()
        .addComponent(Hud, {type: HudType.PRODUCTION_BUTTON})
        .addComponent(CanvasPosition, {x: 5, y: 410 + i * 32})
        .addComponent(HudHoverable)
        .addComponent(Shape, {type: ObjectShape.RECTANGLE})
        .addComponent(Size, {width: 290, height: 30});
    }

    const globalStatus = this.queries.globalStatus.results[0].getComponent(GlobalStatus);
    const teamCount = globalStatus.teamCount;

    for(let i=0; i< teamCount; i++) {
      this.world
        .createEntity()
        .addComponent(Hud, {type: HudType.TEAM_ICON})
        .addComponent(CanvasPosition, {x: this.canvasWidth - 40 - i * 50, y: 80})
        .addComponent(Shape, {type: ObjectShape.CIRCLE})
        .addComponent(Radius, {value: 22})
        .addComponent(Team, {value: i});
    }
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

  generateTileMap() {
    const tileMap = this.queries.tileMap.results;

    if (tileMap.length === 0) {
      const map = {};
      console.log(this.queries.tiles);

      this.queries.tiles.results.forEach((tile) => {
        const mapPos = tile.getMutableComponent(MapPosition);
        const x = Math.sign(mapPos.x) == "-0" ? 0 : mapPos.x;
        const y = Math.sign(mapPos.y) == "-0" ? 0 : mapPos.y;
        const z = Math.sign(mapPos.z) == "-0" ? 0 : mapPos.z;

        if (!map[x]) {
          map[x] = {};
        }
        if (!map[x][y]) {
          map[x][y] = {};
        }
        if (!map[x][y][z]) {
          map[x][y][z] = {};
        }
      });

      this.world.createEntity().addComponent(TileMap, { value: map });
    }
  }

  assignTileToMap() {
    const tileMap =
      this.queries.tileMap.results[0].getMutableComponent(TileMap).value;

    this.queries.tiles.results.forEach((tile) => {
      const mapPos = tile.getMutableComponent(MapPosition);
      tileMap[mapPos.x][mapPos.y][mapPos.z] = tile;
    });
  }

  /**
   *
   * @param {*} num
   */
  assignRegions(num) {
    let centers = [];

    // Depending on map size, create different number of biomes
    let avgCount = -1;

    if (this.mapWidth <= 15) {
      avgCount = 3;
    } else if (this.mapWidth <= 20) {
      avgCount = 4;
    } else if (this.mapWidth <= 25) {
      avgCount = 5;
    } else if (this.mapWidth <= 40) {
      avgCount = 6;
    } else if (this.mapWidth <= 50) {
      avgCount = 8;
    }

    const avgWidth = this.mapWidth / avgCount;
    const avgHeight = this.mapHeight / avgCount;

    for (let i = 0; i < avgCount; i++) {
      for (let j = 0; j < avgCount; j++) {
        centers.push({
          x: Math.random() * avgWidth + avgWidth * i,
          y: Math.random() * avgHeight + avgHeight * j,
        });
      }
    }

    this.queries.tiles.results.forEach((tile) => {
      let region = tile.getMutableComponent(Region);
      let mapPos = tile.getComponent(MapPosition);
      let evenRPos = cubeToEvenr(mapPos.x, mapPos.z);

      let minDist = 99999;
      let index = -1;

      for (let k = 0; k < centers.length; k++) {
        const dx = centers[k].x - evenRPos.x;
        const dy = centers[k].y - evenRPos.y;
        const distance = Math.hypot(dx, dy);

        if (distance < minDist) {
          minDist = distance;
          index = k;
        }
      }

      region.region = index;
    });
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
  },
  tiles: {
    components: [Tile, Region],
  },
  tileMap: {
    components: [TileMap],
  },
  globalStatus: {
    components: [GlobalStatus]
  }
};
