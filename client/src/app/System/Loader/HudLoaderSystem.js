import { System } from "../../Library/Ecsy";
import {
  HudHoverable,
  HudSelectable,
  CanvasPosition,
  Shape,
  Radius,
  Hud,
  Size,
  Team,
  GlobalStatus,
  MenuHud,
  Scene,
  MenuScene,
  SinglePlayScene,
  SingleSetUpScene,
  MultiSetUpScene,
  LobbyScene,
  TextInput,
  HudClickable,
  MultiStageScene,
  SettingScene,
  MapEditorSetUpScene,
  MapEditorScene
} from "../../Component";
import { HudType, ObjectShape, SceneType, MenuHudType } from "../../Type";
import { CurrentGameHudToggle } from "../../Component/Hud/CurrentGameHudToggle";

export class HudLoaderSystem extends System {
  execute(delta, time) {
    // Generate game hud entities
    this.generateGameHuds();

    // Generate input & insert into dom
    this.generateInputHuds();

    // Stop loader from executing after finish loading
    this.stop();
  }

  generateGameHuds() {
    // Turn button at bottom right
    this.world
      .createEntity()
      .addComponent(Hud, {type: HudType.TURN_BUTTON})
      .addComponent(HudHoverable)
      .addComponent(HudClickable)
      .addComponent(CanvasPosition, {x: this.canvasWidth - 90, y: this.canvasHeight - 90})
      .addComponent(Shape, {type: ObjectShape.CIRCLE})
      .addComponent(Radius, {value: 60});

    // Map at bottom left (NOT USED)
    this.world
      .createEntity()
      .addComponent(Hud, {type: HudType.MAP})
      .addComponent(HudClickable)
      .addComponent(CanvasPosition, {x: 0, y: this.canvasHeight - 170})
      .addComponent(Shape, {type: ObjectShape.RECTANGLE})
      .addComponent(Size, {width: 300, height: 170});

    // Production panel at left (shown when clicking city)
    this.world
      .createEntity()
      .addComponent(Hud, {type: HudType.PRODUCTION_PANEL})
      .addComponent(HudClickable)
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

    // Toggleable Hud Status (show which hud is being toggled currently)
    this.world
      .createEntity()
      .addComponent(CurrentGameHudToggle, {
        0: false,
      });

    // Team Icons on top right
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

    // Science, Perk Icons on top left
    this.world
      .createEntity()
      .addComponent(Hud, {type: HudType.SCIENCE_BUTTON})
      .addComponent(CanvasPosition, {x: 30, y: 55})
      .addComponent(HudHoverable)
      .addComponent(Shape, {type: ObjectShape.CIRCLE})
      .addComponent(Radius, {value: 20});

    this.world
      .createEntity()
      .addComponent(Hud, {type: HudType.PERK_BUTTON})
      .addComponent(CanvasPosition, {x: 80, y: 55})
      .addComponent(HudHoverable)
      .addComponent(Shape, {type: ObjectShape.CIRCLE})
      .addComponent(Radius, {value: 20});
  }

  generateInputHuds() {
    let basicTextInput = {
      id: MenuHudType.MULTI_NAME_INPUT,
      x: "0px",
      y: "0px",
      width: "240px",
      height: "",
      padding: "8px",
      borderWidth: "2px",
      borderColor: "white",
      borderRadius: "4px",
      color: "white",
      fontSize: "16px",
      fontFamily: "arial",
      fontStyle: "normal",
      backgroundColor: "rgb(36, 49, 91)"
    };

    this.world
      .createEntity()
      .addComponent(TextInput)
      .addComponent(MenuHud, {type: MenuHudType.MULTI_NAME_INPUT})
      .addComponent(Scene, {value: SceneType.MULTI_SETUP_GAME})
      .addComponent(CanvasPosition, {x: basicTextInput.x, y: basicTextInput.y})
      .addComponent(Shape, {type: ObjectShape.RECTANGLE})
      .addComponent(Size, {width: basicTextInput.width, height: basicTextInput.height});

    let setupTextInput = {...basicTextInput};
    setupTextInput.x = (this.canvasWidth/2 - 40) + "px";
    setupTextInput.y = "160px";

    this.generateDomTextInput(setupTextInput);
  }

  generateDomTextInput(prop) {
    let input = document.createElement("input");
    input.id = prop.id;
    input.type = "text";
    input.style.position = "absolute";
    input.style.left = prop.x;
    input.style.top = prop.y;
    input.style.width = prop.width;
    input.style.height = prop.height;
    input.style.padding = prop.padding;
    input.style.borderWidth = prop.borderWidth;
    input.style.borderColor = prop.borderColor;
    input.style.borderRadius = prop.borderRadius;
    input.style.color = prop.color;
    input.style.fontSize = prop.fontSize;
    input.style.fontFamily = prop.fontFamily;
    input.style.fontStyle = prop.fontStyle;
    input.style.backgroundColor = prop.backgroundColor;
    input.style.display = "none";

    this.queries.textInputs.results.forEach(inputEntity => {
      const type = inputEntity.getComponent(MenuHud).type;

      if(type === prop.id) {
        input.component = inputEntity;
      }
    });
    input.addEventListener("change", this.updateTextInput);

    document.getElementById("input-layer").appendChild(input);
  }

  updateTextInput(e) {
    let text = e.target.component.getMutableComponent(TextInput);
    text.value = e.target.value;
  }
}

HudLoaderSystem.queries = {
  globalStatus: {
    components: [GlobalStatus]
  },
  textInputs: {
    components: [TextInput]
  }
};
