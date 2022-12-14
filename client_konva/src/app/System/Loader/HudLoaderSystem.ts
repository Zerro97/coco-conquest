import { EditorSetUpScene, GameEndScene, GameLoadingScene, GameScene, Hud, KonvaObject, HudLayer, GameLayer, MapEditorScene, MenuScene, MultiMenuScene, MultiSetUpScene, MultiStageScene, SceneStatus, SettingScene, SingleLoadScene, SingleMenuScene, SingleSetUpScene, SingleStoryScene, Stage as StageComp } from "@/Component";
import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";
import { Color, HudType, SceneType } from "@/Const";
import { Component, System, World } from "@/Ecsy";
import Konva from "konva";
import { TransitionHud } from "@/Component/Hud/TransitionHud";
import { UnitEditorScene } from "@/Component/Scene/UnitEditorScene";
import { BuildingEditorScene } from "@/Component/Scene/BuildingEditorScene";
import { componentRegistered } from "@/Ecsy/Utils";

export class HudLoaderSystem extends System {
  execute(delta: Number, time: Number) {
    this.createHuds();

    const scene = this.queries.sceneStatus.results[0].getMutableComponent(SceneStatus);
    scene.currentScene = SceneType.MAP_EDITOR;
    scene.previousScene = SceneType.MAP_EDITOR;

    this.stop();
  }

  createHuds() {
    const stage = this.queries.stage.results[0].getComponent(KonvaObject).value;
    const layer = this.queries.hudLayer.results[0].getComponent(KonvaObject).value;

    this.createMenuHuds(stage, layer);
    this.createSettingHuds(stage, layer);
    this.createSingleMenuHuds(stage, layer);
    this.createSingleSetUpHuds(stage, layer);
    this.createSingleLoadHuds(stage, layer);
    this.createSingleStoryHuds(stage, layer);
    this.createSingleTutorialHuds(stage, layer);
    this.createMultiMenuHuds(stage, layer);
    this.createMultiSetUpHuds(stage, layer);
    this.createMultiStageHuds(stage, layer);
    this.createGameLoadingHuds(stage, layer);
    this.createGameHuds(stage, layer);
    this.createGameEndHuds(stage, layer);
    this.createMapEditorSetUpHuds(stage, layer);
  }

  createMenuHuds(stage: Stage, layer: Layer) {
    let background = new Konva.Rect({
      x: 0,
      y: 0,
      width: stage.width(),
      height: stage.height(),
      fill: Color.XANADU.hex,
      visible: false
    })

    layer.add(background);
    this.createKonvaEntity(background, [
      SceneType.MENU,
      SceneType.SINGLE_PLAY_MENU,
      SceneType.MULTI_PLAY_MENU,
      SceneType.EDITOR_SETUP
    ], false)

    let leftOpaqueBox = new Konva.Rect({
      x: 0,
      y: 0,
      width: 450,
      height: stage.height(),
      fillLinearGradientStartPoint: { x: 0, y: 0 },
      fillLinearGradientEndPoint: { x: 450, y: 0 },
      fillLinearGradientColorStops: [0, 'rgba(0,0,0,0.5)', 0.7, 'rgba(0,0,0,0.25)', 1, 'rgba(0,0,0,0)'],
      opacity: 0.5
    });
    layer.add(leftOpaqueBox);

    let title = new Konva.Text({
      x: 60,
      y: 100,
      text: "Coco\nConquest",
      fontSize: 50,
      fill: "#eeeeee",
      visible: false,
      id: HudType.MENU_TITLE
    });
    layer.add(title);
    this.createKonvaEntity(title, [SceneType.MENU, SceneType.SINGLE_PLAY_MENU, SceneType.EDITOR_SETUP, SceneType.SETTING], false);

    let menuTexts = ["Single Player", "Multi Player", "Map Editor", "Settings", "Exit"]
    let ids = [HudType.MENU_SINGLE_BUTTON, HudType.MENU_MULTI_BUTTON, HudType.MENU_MAP_EDITOR_BUTTON, HudType.MENU_SETTING_BUTTON, HudType.MENU_EXIT_BUTTON]

    for (let i = 0; i < 5; i++) {
      let menu = new Konva.Group({
        x: 60,
        y: 250,
        visible: false,
        id: ids[i]
      });

      let text = new Konva.Text({
        x: 0,
        y: i * 55,
        text: menuTexts[i],
        fontSize: 26,
        fill: "#ffffff",
        id: ids[i] + "_text"
      });

      let box = new Konva.Rect({
        x: -10,
        y: i * 55 - 8,
        width: 240,
        height: 40,
        fill: "rgba(0,0,0,0.5)",
        cornerRadius: 10,
        visible: false,
        id: ids[i] + "_box"
      });
      menu.on("click", () => {
        // Decide what is next scene to play based on which button is clicked
        let nextScene = i === 0 ? SceneType.SINGLE_PLAY_MENU :
          i === 1 ? SceneType.MULTI_PLAY_MENU :
            i === 2 ? SceneType.EDITOR_SETUP :
              i === 3 ? SceneType.SETTING : undefined;

        // Had to call getMutableComponent within the 
        // event listener for changed query to work in SceneSystem
        const scene = this.queries.sceneStatus.results[0].getMutableComponent(SceneStatus);
        scene.currentScene = SceneType[nextScene];
        scene.previousScene = SceneType.MENU;
      })
      menu.on("pointerover", () => {
        // Set the box visible when mouse hover
        menu.find("#" + ids[i] + "_box")[0].setAttr("visible", true);
      })
      menu.on("pointerleave", () => {
        // Hide the box when mouse leave
        menu.find("#" + ids[i] + "_box")[0].setAttr("visible", false);
      })

      menu.add(box);
      menu.add(text);
      layer.add(menu);

      this.createKonvaEntity(menu, [SceneType.MENU], true);
    }
  }

  createSettingHuds(stage: Stage, layer: Layer) {
    let menuTexts = ["Audio", "Graphics", "Game", "Back"]
    let ids = [HudType.SETTING_AUDIO_BUTTON, HudType.SETTING_GRAPHICS_BUTTON, HudType.SETTING_GAME_BUTTON, HudType.SETTING_BACK_BUTTON]

    for (let i = 0; i < menuTexts.length; i++) {
      let menu = new Konva.Group({
        x: 60,
        y: 150,
        visible: false,
        id: ids[i]
      });

      let text = new Konva.Text({
        x: 0,
        y: i * 55,
        text: menuTexts[i],
        fontSize: 26,
        fill: "#ffffff",
        id: ids[i] + "_text"
      });

      let box = new Konva.Rect({
        x: -10,
        y: i * 55 - 8,
        width: 240,
        height: 40,
        fill: "rgba(0,0,0,0.5)",
        cornerRadius: 10,
        visible: false,
        id: ids[i] + "_box"
      });
      menu.on("click", () => {
        // If back button is clicked
        if (i === menuTexts.length - 1) {
          const scene = this.queries.sceneStatus.results[0].getMutableComponent(SceneStatus);
          scene.currentScene = SceneType.MENU;
          scene.previousScene = SceneType.SETTING;
        }
      })
      menu.on("pointerover", () => {
        // Set the box visible when mouse hover
        menu.find("#" + ids[i] + "_box")[0].setAttr("visible", true);
      })
      menu.on("pointerleave", () => {
        // Hide the box when mouse leave
        menu.find("#" + ids[i] + "_box")[0].setAttr("visible", false);
      })

      menu.add(box);
      menu.add(text);
      layer.add(menu);

      this.createKonvaEntity(menu, [SceneType.SETTING], true);
    }

    let settingPanel = new Konva.Rect({
      x: 450,
      y: 100,
      width: stage.width() - 750,
      height: stage.height() - 200,
      fill: "rgba(0,0,0,0.5)",
      cornerRadius: 10,
      visible: false,
      id: "setting_panel"
    });

    layer.add(settingPanel);
    this.createKonvaEntity(settingPanel, [SceneType.SETTING], true);
  }

  createSingleMenuHuds(stage: Stage, layer: Layer) {
    let menuTexts = ["Story Mode", "Set Up Game", "Tutorial", "Load Game", "Back"]
    let ids = [HudType.SINGLE_STORY_BUTTON, HudType.SINGLE_SETUP_BUTTON, HudType.SINGLE_TUTORIAL_BUTTON, HudType.SINGLE_LOAD_BUTTON, HudType.SINGLE_BACK_BUTTON]

    for (let i = 0; i < menuTexts.length; i++) {
      let menu = new Konva.Group({
        x: 60,
        y: 250,
        visible: false,
        id: ids[i]
      });

      let text = new Konva.Text({
        x: 0,
        y: i * 55,
        text: menuTexts[i],
        fontSize: 26,
        fill: "#ffffff",
        id: ids[i] + "_text"
      });

      let box = new Konva.Rect({
        x: -10,
        y: i * 55 - 8,
        width: 240,
        height: 40,
        fill: "rgba(0,0,0,0.5)",
        cornerRadius: 10,
        visible: false,
        id: ids[i] + "_box"
      });
      menu.on("click", () => {
        // Decide what is next scene to play based on which button is clicked
        let nextScene = i === 0 ? SceneType.SINGLE_PLAY_STORY :
          i === 1 ? SceneType.SINGLE_PLAY_SETUP :
            i === 2 ? SceneType.SINGLE_PLAY_TUTORIAL :
              i === 3 ? SceneType.SINGLE_PLAY_LOAD :
                i === 4 ? SceneType.MENU : undefined;

        // Had to call getMutableComponent within the event listener for changed query to work
        const scene = this.queries.sceneStatus.results[0].getMutableComponent(SceneStatus);
        scene.currentScene = SceneType[nextScene];
        scene.previousScene = SceneType.SINGLE_PLAY_MENU;
      })
      menu.on("pointerover", () => {
        // Set the box visible when mouse hover
        menu.find("#" + ids[i] + "_box")[0].setAttr("visible", true);
      })
      menu.on("pointerleave", () => {
        // Hide the box when mouse leave
        menu.find("#" + ids[i] + "_box")[0].setAttr("visible", false);
      })

      menu.add(box);
      menu.add(text);
      layer.add(menu);

      this.createKonvaEntity(menu, [SceneType.SINGLE_PLAY_MENU], true);
    }
  }

  createSingleSetUpHuds(stage: Stage, layer: Layer) {

  }

  createSingleLoadHuds(stage: Stage, layer: Layer) {

  }

  createSingleStoryHuds(stage: Stage, layer: Layer) {

  }

  createSingleTutorialHuds(stage: Stage, layer: Layer) {

  }

  createMultiMenuHuds(stage: Stage, layer: Layer) {

  }

  createMultiSetUpHuds(stage: Stage, layer: Layer) {

  }

  createMultiStageHuds(stage: Stage, layer: Layer) {

  }

  createGameLoadingHuds(stage: Stage, layer: Layer) {

  }

  createGameHuds(stage: Stage, layer: Layer) {

  }

  createGameEndHuds(stage: Stage, layer: Layer) {

  }

  createMapEditorSetUpHuds(stage: Stage, layer: Layer) {
    let menuTexts = ["Map Editor", "Unit Editor", "Building Editor", "Back"]
    let ids = [HudType.EDITOR_MAP_TAB, HudType.EDITOR_UNIT_TAB, HudType.EDITOR_BUILDING_TAB, HudType.EDITOR_BACK_BUTTON]

    for (let i = 0; i < menuTexts.length; i++) {
      let menu = new Konva.Group({
        x: 60,
        y: 250,
        visible: false,
        id: ids[i]
      });

      let text = new Konva.Text({
        x: 0,
        y: i * 55,
        text: menuTexts[i],
        fontSize: 26,
        fill: "#ffffff",
        id: ids[i] + "_text"
      });

      let box = new Konva.Rect({
        x: -10,
        y: i * 55 - 8,
        width: 240,
        height: 40,
        fill: "rgba(0,0,0,0.5)",
        cornerRadius: 10,
        visible: false,
        id: ids[i] + "_box"
      });
      menu.on("click", () => {
        // Decide what is next scene to play based on which button is clicked
        let nextScene = i === 0 ? SceneType.MAP_EDITOR :
          i === 1 ? SceneType.UNIT_EDITOR :
            i === 2 ? SceneType.BUILDING_EDITOR :
              i === 3 ? SceneType.MENU : undefined;

        // Had to call getMutableComponent within the event listener for changed query to work
        const scene = this.queries.sceneStatus.results[0].getMutableComponent(SceneStatus);
        scene.currentScene = SceneType[nextScene];
        scene.previousScene = SceneType.EDITOR_SETUP;
      })
      menu.on("pointerover", () => {
        // Set the box visible when mouse hover
        menu.find("#" + ids[i] + "_box")[0].setAttr("visible", true);
      })
      menu.on("pointerleave", () => {
        // Hide the box when mouse leave
        menu.find("#" + ids[i] + "_box")[0].setAttr("visible", false);
      })

      menu.add(box);
      menu.add(text);
      layer.add(menu);

      this.createKonvaEntity(menu, [SceneType.EDITOR_SETUP], true);
    }

    let setupPanel = new Konva.Rect({
      x: 400,
      y: 100,
      width: stage.width() - 700,
      height: stage.height() - 200,
      fill: "rgba(0,0,0,0.5)",
      cornerRadius: 10,
      visible: false,
      id: "map_editor_setup_panel"
    })
    layer.add(setupPanel);
    this.createKonvaEntity(setupPanel, [SceneType.EDITOR_SETUP], true);

    let startButton = new Konva.Group({
      x: stage.width() - 200,
      y: stage.height() - 150,
      visible: false
    });

    let startBox = new Konva.Rect({
      x: 0,
      y: 0,
      width: 150,
      height: 50,
      fill: "rgba(0,0,0,0.5)",
      cornerRadius: 10,
      id: "map_editor_start_button"
    });

    let startButtonText = new Konva.Text({
      align: "center",
      verticalAlign: "middle",
      text: "Start",
      width: 150,
      height: 50,
      fontSize: 26,
      fill: "white",
      id: "map_editor_start_text"
    })

    startButton.add(startBox);
    startButton.add(startButtonText);

    startButton.on("click", () => {
      // Had to call getMutableComponent within the event listener for changed query to work
      const scene = this.queries.sceneStatus.results[0].getMutableComponent(SceneStatus);
      scene.currentScene = SceneType.MAP_EDITOR;
      scene.previousScene = SceneType.EDITOR_SETUP;
    })

    layer.add(startButton);

    this.createKonvaEntity(startButton, [SceneType.EDITOR_SETUP], true);
  }

  createKonvaEntity(konvaObj: any, scenes: SceneType[], isTransition?: boolean) {
    let konvaEntity = this.world.
      createEntity().
      addComponent(Hud).
      addComponent(KonvaObject, {
        value: konvaObj
      });

    scenes.forEach(scene => [
      konvaEntity.addComponent(this.stringToSceneComponent(scene))
    ])

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

HudLoaderSystem.queries = {
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