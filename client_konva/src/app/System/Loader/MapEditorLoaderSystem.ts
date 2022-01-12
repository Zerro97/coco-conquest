import { EditorSetUpScene, GameEndScene, GameLoadingScene, GameScene, Hud, KonvaObject, Layer as LayerComp, MapEditorScene, MenuScene, MultiMenuScene, MultiSetUpScene, MultiStageScene, SceneStatus, SettingScene, SingleLoadScene, SingleMenuScene, SingleSetUpScene, SingleStoryScene, Stage as StageComp } from "@/Component";
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
    const layer = this.queries.layer.results[0].getComponent(KonvaObject).value;

    this.createGrid(stage, layer);
    this.createEditPanel(stage, layer);
  }


  createEditPanel(stage: Stage, layer: Layer) {
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

      layer.add(panelTab);
      //this.createKonvaEntity(panelTab, false);
    }
  }

  createGrid(stage: Stage, layer: Layer) {
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
        layer.add(grid);
        this.createKonvaEntity(grid, false);
      }
    }
  }

  createKonvaEntity(konvaObj: any, isTransition?: boolean) {
    let konvaEntity = this.world.
      createEntity().
      addComponent(Hud).
      addComponent(KonvaObject, {
        value: konvaObj
      })
      .addComponent(MapEditorScene);

    if (isTransition) {
      konvaEntity.addComponent(TransitionHud);
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
  layer: {
    components: [LayerComp, KonvaObject]
  },
  stage: {
    components: [StageComp, KonvaObject]
  }
};