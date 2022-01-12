import { EditorSetUpScene, GameEndScene, GameLoadingScene, GameScene, Hud, KonvaObject, HudLayer, GameLayer, MapEditorScene, MenuScene, MultiMenuScene, MultiSetUpScene, MultiStageScene, SceneStatus, SettingScene, SingleLoadScene, SingleMenuScene, SingleSetUpScene, SingleStoryScene, Stage as StageComp, Tile } from "@/Component";
import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";
import { Color, HudType, SceneType } from "@/Const";
import { Component, System, World } from "@/Ecsy";
import Konva from "konva";
import { TransitionHud } from "@/Component/Hud/TransitionHud";
import { UnitEditorScene } from "@/Component/Scene/UnitEditorScene";
import { BuildingEditorScene } from "@/Component/Scene/BuildingEditorScene";
import { RGB } from "konva/lib/filters/RGB";
import { cubeToPixel, evenrToCube } from "@/Util/Math";

export class MapEditorLoaderSystem extends System {
  execute(delta: Number, time: Number) {
    this.createHuds();
    this.stop();
  }

  createHuds() {
    const stage = this.queries.stage.results[0].getComponent(KonvaObject).value;

    const gameLayer = this.queries.gameLayer.results[0].getComponent(KonvaObject).value;
    const hudLayer = this.queries.hudLayer.results[0].getComponent(KonvaObject).value;

    this.createGrid(stage, gameLayer);
    this.createBaseTile(stage, gameLayer);
    this.createEditPanel(stage, hudLayer);
    this.createTestGrid(stage, gameLayer);
  }


  createEditPanel(stage: Stage, hudLayer: Layer) {
    let editPanel = new Konva.Group({
      x: stage.width() - 200,
      y: 100
    })

    let tabName = ["Base Tile", "Objects", "Cliff & River"];
    for (let i = 0; i < tabName.length; i++) {
      let panelTab = new Konva.Rect({
        x: 0,
        y: i * 80,
        width: 20,
        height: 70,
        fill: "rgba(0, 0, 0, 0.5)",
        cornerRadius: [10, 0, 0, 10]
      })

      hudLayer.add(panelTab);
      //this.createKonvaEntity(panelTab, false);
    }
  }

  createGrid(stage: Stage, gameLayer: Layer) {
    // Create hex grid
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 30; j++) {
        let cube = evenrToCube(i, j);
        let pixel = cubeToPixel(cube.x, cube.z, 50);

        let grid = new Konva.RegularPolygon({
          x: pixel.x,
          y: pixel.y,
          sides: 6,
          radius: 50,
          stroke: "rgb(50, 50, 50)",
          strokeWidth: 4,
        })
        gameLayer.add(grid);
        this.createKonvaEntity(grid, false);
      }
    }
  }

  createBaseTile(stage: Stage, gameLayer: Layer) {
    // Create hex grid
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 30; j++) {
        let cube = evenrToCube(i, j);
        let pixel = cubeToPixel(cube.x, cube.z, 50);

        let tile = new Konva.Group({
          x: pixel.x,
          y: pixel.y
        })

        let baseTile = new Konva.RegularPolygon({
          x: 0,
          y: 0,
          sides: 6,
          radius: 50,
          fill: "rgb(108, 169, 198)",
          stroke: "rgb(0,0,0, 0.2)",
          strokeWidth: 2,
          name: "base_tile"
        })

        let hoverTile = new Konva.RegularPolygon({
          x: 0,
          y: 0,
          sides: 6,
          radius: 50,
          opacity: 0,
          fill: "rgb(255, 255, 255)",
          name: "hover_tile"
        })

        let moveTile = new Konva.RegularPolygon({
          x: 0,
          y: 0,
          sides: 6,
          radius: 50,
          opacity: 0,
          fill: "rgb(61, 133, 198)",
          name: "move_tile"
        })

        let attackTile = new Konva.RegularPolygon({
          x: 0,
          y: 0,
          sides: 6,
          radius: 50,
          opacity: 0,
          fill: "rgb(200, 0, 0)",
          name: "attack_tile"
        })

        let leftCliff = new Konva.Line({
          points: [
            0, -50,
            -Math.sqrt(3) * 25, -25,
            -Math.sqrt(3) * 25, -15,
            0, -40
          ],
          fill: 'rgb(0, 0, 0, 0.4)',
          closed: true,
        });

        let rightCliff = new Konva.Line({
          points: [
            0, -50,
            Math.sqrt(3) * 25, -25,
            Math.sqrt(3) * 25, -15,
            0, -40
          ],
          fill: 'rgb(0, 0, 0, 0.25)',
          closed: true,
        });

        tile.add(baseTile);
        tile.add(leftCliff);
        tile.add(rightCliff);
        tile.add(hoverTile);
        tile.add(moveTile);
        tile.add(attackTile);

        gameLayer.add(tile);
        this.createKonvaEntity(tile, true);
      }
    }
  }

  createTestGrid(stage: Stage, gameLayer: Layer) {
    let testTile = new Konva.Rect({
      x: Math.sqrt(3) * 50 * 5,
      y: 75 * 4,
      width: Math.sqrt(3) * 50,
      height: 75,
      stroke: "red",
      strokeWidth: 4,
      name: "test_tile"
    })
    gameLayer.add(testTile);

    // Create hex grid
    // for (let i = 0; i < 30; i++) {
    //   for (let j = 0; j < 30; j++) {

    //   }
    // }
  }

  createKonvaEntity(konvaObj: any, isTile?: boolean) {
    let konvaEntity = this.world.
      createEntity().
      addComponent(Hud).
      addComponent(KonvaObject, {
        value: konvaObj
      })
      .addComponent(MapEditorScene);

    if (isTile) {
      konvaEntity.addComponent(Tile);
    }
  }

  stringToSceneComponent(scene: SceneType) {
    return scene === SceneType.MENU ? MenuScene :
      scene === SceneType.SETTING ? SettingScene :
        scene === SceneType.SINGLE_PLAY_MENU ? SingleMenuScene :
          scene === SceneType.SINGLE_PLAY_SETUP ? SingleSetUpScene :
            scene === SceneType.SINGLE_PLAY_LOAD ? SingleLoadScene :
              scene === SceneType.SINGLE_PLAY_STORY ? SingleStoryScene :
                scene === SceneType.SINGLE_PLAY_TUTORIAL ? SingleMenuScene :
                  scene === SceneType.MULTI_PLAY_MENU ? MultiMenuScene :
                    scene === SceneType.MULTI_PLAY_SETUP ? MultiSetUpScene :
                      scene === SceneType.MULTI_PLAY_STAGE ? MultiStageScene :
                        scene === SceneType.GAME_LOADING ? GameLoadingScene :
                          scene === SceneType.GAME ? GameScene :
                            scene === SceneType.GAME_END ? GameEndScene :
                              scene === SceneType.EDITOR_SETUP ? EditorSetUpScene :
                                scene === SceneType.MAP_EDITOR ? MapEditorScene :
                                  scene === SceneType.UNIT_EDITOR ? UnitEditorScene :
                                    scene === SceneType.BUILDING_EDITOR ? BuildingEditorScene : undefined
  }
}

MapEditorLoaderSystem.queries = {
  sceneStatus: {
    components: [SceneStatus]
  },
  hudLayer: {
    components: [HudLayer, KonvaObject]
  },
  gameLayer: {
    components: [GameLayer, KonvaObject]
  },
  stage: {
    components: [StageComp, KonvaObject]
  }
};