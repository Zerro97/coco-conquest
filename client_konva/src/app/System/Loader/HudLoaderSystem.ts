import { Hud, KonvaObject, Layer as LayerComp, Rect, Stage as StageComp } from "@/Component";
import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";
import { Color, HudType } from "@/Const";
import { Component, System, World } from "@/Ecsy";
import Konva from "konva";

export class HudLoaderSystem extends System {
  execute(delta: Number, time: Number) {
    this.createHuds();
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
      opacity: 0.5,
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

    let menuTexts = ["Single Player", "Multi Player", "Map Editor", "Settings", "Exit"]
    let ids = [HudType.MENU_SINGLE_BUTTON, HudType.MENU_MULTI_BUTTON, HudType.MENU_MAP_EDITOR_BUTTON, HudType.MENU_SETTING_BUTTON, HudType.MENU_EXIT_BUTTON]

    for(let i=0; i<5; i++) {
      let menu = new Konva.Group({
        x: 60,
        y: 320
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
        fill: "rgba(0,0,0,0.5",
        cornerRadius: 10,
        visible: false,
        id: ids[i] + "_box"
      });
      text.on("click", () => {
        
      })
      text.on("pointerover", () => {
        menu.find("#" + ids[i] + "_box")[0].setAttr("visible", true);
      })
      text.on("pointerleave", () => {
        menu.find("#" + ids[i] + "_box")[0].setAttr("visible", false);
      })

      menu.add(box);
      menu.add(text);
      layer.add(menu);
    }
  }

  createSettingHuds(stage: Stage, layer: Layer) {

  }

  createSingleMenuHuds(stage: Stage, layer: Layer) {

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
  layer: {
    components: [LayerComp, KonvaObject]
  },
  stage: {
    components: [StageComp, KonvaObject]
  }
};