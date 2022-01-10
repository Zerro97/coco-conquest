import { Hud, Rect } from "@/Component";
import { Color } from "@/Const";
import { Component, World } from "@/Ecsy";
import Konva from "konva";
import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";

export class HudLoader {
  world: World;
  stage: Stage;
  layer: Layer;

  constructor(world: World, stage: Stage, layer: Layer) {
    this.world = world;
    this.stage = stage;
    this.layer = layer;
  }

  createHuds() {
    this.createMenuHuds();
    this.createSettingHuds();
    this.createSingleMenuHuds();
    this.createSingleSetUpHuds();
    this.createSingleLoadHuds();
    this.createSingleStoryHuds();
    this.createSingleTutorialHuds();
    this.createMultiMenuHuds();
    this.createMultiSetUpHuds();
    this.createMultiStageHuds();
    this.createGameLoadingHuds();
    this.createGameHuds();
    this.createGameEndHuds();
    this.createMapEditorSetUpHuds();
    this.createMapEditorHuds();
  }

  createMenuHuds() {
    let title = new Konva.Text({
      x: 0,
      y: 0,
      text: "Coco Conquest",
      fontSize: 30,
      fill: "#222222"
    });

    let singleMenu = new Konva.Text({
      x: 0,
      y: 0,
      text: "Single Player",
      fontSize: 30,
      fill: "#222222"
    });

    let multiMenu = new Konva.Text({
      x: 0,
      y: 0,
      text: "Multi Player",
      fontSize: 30,
      fill: "#222222"
    });

    let settings = new Konva.Text({
      x: 0,
      y: 0,
      text: "Settings",
      fontSize: 30,
      fill: "#222222"
    });

    let exit = new Konva.Text({
      x: 0,
      y: 0,
      text: "Exit",
      fontSize: 30,
      fill: "#222222"
    });

    this.layer.add(title);
    this.layer.add(singleMenu);
    this.layer.add(multiMenu);
    this.layer.add(settings);
    this.layer.add(exit);
  }

  createSettingHuds() {

  }

  createSingleMenuHuds() {

  }

  createSingleSetUpHuds() {

  }

  createSingleLoadHuds() {

  }

  createSingleStoryHuds() {

  }

  createSingleTutorialHuds() {

  }

  createMultiMenuHuds() {

  }

  createMultiSetUpHuds() {

  }

  createMultiStageHuds() {

  }

  createGameLoadingHuds() {

  }

  createGameHuds() {

  }

  createGameEndHuds() {

  }

  createMapEditorSetUpHuds() {

  }

  createMapEditorHuds() {

  }

  // createKonvaEntity(konvaComp: Component<any>) {
  //   this.world
  //     .createEntity()
  //     .addComponent(Hud)
  //     .addComponent(konvaComp)
  // }
}