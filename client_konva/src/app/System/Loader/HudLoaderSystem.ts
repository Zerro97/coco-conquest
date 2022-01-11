import { Hud, KonvaObject, Layer as LayerComp, MenuScene, Rect, SceneStatus, SettingScene, SingleMenuScene, Stage as StageComp } from "@/Component";
import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";
import { Color, HudType, SceneType } from "@/Const";
import { Component, System, World } from "@/Ecsy";
import Konva from "konva";

export class HudLoaderSystem extends System {
  execute(delta: Number, time: Number) {
    this.createHuds();

    const scene = this.queries.sceneStatus.results[0].getMutableComponent(SceneStatus);
    scene.currentScene = SceneType.MENU;
    scene.previousScene = SceneType.MENU;

    this.stop();
  }

  createHuds() {

    const stage = this.queries.stage.results[0].getComponent(KonvaObject).value;
    const layer = this.queries.layer.results[0].getComponent(KonvaObject).value;

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
    this.createMapEditorHuds(stage, layer);
  }

  createMenuHuds(stage: Stage, layer: Layer) {
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
      y: 150,
      text: "Coco\nConquest",
      fontSize: 50,
      fill: "#eeeeee"
    });
    layer.add(title);
    this.world
      .createEntity()
      .addComponent(KonvaObject, {
        value: title
      })
      .addComponent(Hud)
      .addComponent(MenuScene)
      .addComponent(SingleMenuScene)
      .addComponent(SettingScene);

    let menuTexts = ["Single Player", "Multi Player", "Map Editor", "Settings", "Exit"]
    let ids = [HudType.MENU_SINGLE_BUTTON, HudType.MENU_MULTI_BUTTON, HudType.MENU_MAP_EDITOR_BUTTON, HudType.MENU_SETTING_BUTTON, HudType.MENU_EXIT_BUTTON]

    for (let i = 0; i < 5; i++) {
      let menu = new Konva.Group({
        x: 60,
        y: 320,
        visible: false
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
            i === 2 ? SceneType.MAP_EDITOR :
              i === 3 ? SceneType.SETTING : SceneType.GAME_END;

        // Had to call getMutableComponent within the event listener for changed query to work
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

      this.world
        .createEntity()
        .addComponent(KonvaObject, {
          value: menu
        })
        .addComponent(Hud)
        .addComponent(MenuScene)
    }
  }

  createSettingHuds(stage: Stage, layer: Layer) {
    let menuTexts = ["Audio", "Graphics", "Game", "Back"]
    let ids = [HudType.SETTING_AUDIO_BUTTON, HudType.SETTING_GRAPHICS_BUTTON, HudType.SETTING_GAME_BUTTON, HudType.SETTING_BACK_BUTTON]

    for (let i = 0; i < menuTexts.length; i++) {
      let menu = new Konva.Group({
        x: 60,
        y: 320,
        visible: false
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

      this.world
        .createEntity()
        .addComponent(KonvaObject, {
          value: menu
        })
        .addComponent(Hud)
        .addComponent(SettingScene)
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

    this.world
      .createEntity()
      .addComponent(KonvaObject, {
        value: settingPanel
      })
      .addComponent(Hud)
      .addComponent(SettingScene)
  }

  createSingleMenuHuds(stage: Stage, layer: Layer) {
    let menuTexts = ["Story Mode", "Set Up Game", "Tutorial", "Load Game", "Back"]
    let ids = [HudType.SINGLE_STORY_BUTTON, HudType.SINGLE_SETUP_BUTTON, HudType.SINGLE_TUTORIAL_BUTTON, HudType.SINGLE_LOAD_BUTTON, HudType.SINGLE_BACK_BUTTON]

    for (let i = 0; i < menuTexts.length; i++) {
      let menu = new Konva.Group({
        x: 60,
        y: 320,
        visible: false
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

      this.world
        .createEntity()
        .addComponent(KonvaObject, {
          value: menu
        })
        .addComponent(Hud)
        .addComponent(SingleMenuScene)
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

  }

  createMapEditorHuds(stage: Stage, layer: Layer) {

  }

  // createKonvaEntity(konvaComp: Component<any>) {
  //   this.world
  //     .createEntity()
  //     .addComponent(Hud)
  //     .addComponent(konvaComp)
  // }
}

HudLoaderSystem.queries = {
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