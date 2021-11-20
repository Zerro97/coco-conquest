import { System } from "../../Library/Ecsy";
import {
  CanvasPosition,
  CurrentHover,
  CurrentSelect,
  CurrentRightSelect,
  CurrentHudHover,
  CurrentHudSelect,
  Hoverable,
  MapPosition,
  MouseStatus,
  Radius,
  ScreenStatus,
  ScreenFocusStatus,
  Selectable,
  RightSelectable,
  Size,
  ActionStatus,
  Unit,
  PreviousSelect,
  Shape,
  HudHoverable,
  HudSelectable
} from "../../Component";
import { isInsideCircle, isInsideHexagon, isInsideRectangle } from "../../Util";
import { ObjectShape, TileSize, ActionType } from "../../Type";

/**
 * Store mouse event data to entity
 */
export class MouseHandlerSystem extends System {
  execute(delta, time) {
    this.trackClickBuffer();
    this.checkMouseClick();

    this.checkHudHover();
    this.checkHudSelect();

    this.checkHover();
    this.checkSelect();
    this.checkRightSelect();
  }

  checkMouseClick() {
    const mouseStatus = this.queries.mouseStatus.results[0].getMutableComponent(MouseStatus);
    // Allow only one game frame to have isMouseCLicked to be true
    mouseStatus.isMouseClicked = false;
    mouseStatus.isRightMouseClicked = false;

    // When mouse is up after mouse down within 30 game frame
    // set isMouseClicked to true
    if (mouseStatus.clickBuffer !== -1 && !mouseStatus.isMouseDown) {
      mouseStatus.isMouseClicked = true;
      mouseStatus.clickBuffer = -1;
    }
    if (mouseStatus.rightClickBuffer !== -1 && !mouseStatus.isRightMouseDown) {
      mouseStatus.isRightMouseClicked = true;
      mouseStatus.rightClickBuffer = -1;
    }
  }

  trackClickBuffer() {
    const mouseStatus = this.queries.mouseStatus.results[0].getMutableComponent(MouseStatus);

    if (mouseStatus.isMouseDown) {
      if (mouseStatus.clickBuffer !== -1) {
        mouseStatus.clickBuffer += 1;
      }
      if (mouseStatus.clickBuffer === 30) {
        mouseStatus.clickBuffer = -1;
      }
    }

    if (mouseStatus.isRightMouseDown) {
      if (mouseStatus.rightClickBuffer !== -1) {
        mouseStatus.rightClickBuffer += 1;
      }
      if (mouseStatus.rightClickBuffer === 30) {
        mouseStatus.rightClickBuffer = -1;
      }
    }
  }

  checkHudHover() {
    const mouseStatus = this.queries.mouseStatus.results[0].getMutableComponent(MouseStatus);
    const mouseX = mouseStatus.x;
    const mouseY = mouseStatus.y;

    this.queries.hudHoverableObjects.results.forEach(object => {
      object.removeComponent(CurrentHudHover);

      let canvasPos = object.getComponent(CanvasPosition);
      let objectShape = object.getComponent(Shape).type;

      switch (objectShape) {
        case ObjectShape.RECTANGLE: {
          let size = object.getComponent(Size);
          if (
            isInsideRectangle(
              canvasPos.x,
              canvasPos.y,
              mouseX,
              mouseY,
              size.width,
              size.height
            )
          ) {
            if (!object.hasComponent(CurrentHudHover)) {
              object.addComponent(CurrentHudHover);
            }
          }
          break;
        }
        case ObjectShape.CIRCLE: {
          let radius = object.getMutableComponent(Radius).value;
          if (
            isInsideCircle(
              canvasPos.x,
              canvasPos.y,
              mouseX,
              mouseY,
              radius
            )
          ) {
            
            if (!object.hasComponent(CurrentHudHover)) {
              object.addComponent(CurrentHudHover);
            }
          }
          break;
        }
        case ObjectShape.HEXAGON: {
          if (
            isInsideHexagon(
              canvasPos.x,
              canvasPos.y,
              mouseX,
              mouseY,
              TileSize.REGULAR
            )
          ) {
            if (!object.hasComponent(CurrentHudHover)) {
              object.addComponent(CurrentHudHover);
            }
          }
          break;
        }
      }
    });
  }

  checkHudSelect() {
    const mouseStatus = this.queries.mouseStatus.results[0].getMutableComponent(MouseStatus);
    const mouseX = mouseStatus.x;
    const mouseY = mouseStatus.y;

    this.queries.hudSelectableObjects.results.forEach(object => {
      object.removeComponent(CurrentHudSelect);

      if (mouseStatus.isMouseClicked) {
        let canvasPos = object.getComponent(CanvasPosition);
        let objectShape = object.getComponent(Shape).type;
  
        switch (objectShape) {
          case ObjectShape.RECTANGLE: {
            let size = object.getComponent(Size);
            if (
              isInsideRectangle(
                canvasPos.x,
                canvasPos.y,
                mouseX,
                mouseY,
                size.width,
                size.height
              )
            ) {
              if (!object.hasComponent(CurrentHudSelect)) {
                object.addComponent(CurrentHudSelect);
              }
            }
            break;
          }
          case ObjectShape.CIRCLE: {
            let radius = object.getMutableComponent(Radius).value;
            if (
              isInsideCircle(
                canvasPos.x,
                canvasPos.y,
                mouseX,
                mouseY,
                radius
              )
            ) {
              
              if (!object.hasComponent(CurrentHudSelect)) {
                object.addComponent(CurrentHudSelect);
              }
            }
            break;
          }
          case ObjectShape.HEXAGON: {
            if (
              isInsideHexagon(
                canvasPos.x,
                canvasPos.y,
                mouseX,
                mouseY,
                TileSize.REGULAR
              )
            ) {
              if (!object.hasComponent(CurrentHudSelect)) {
                object.addComponent(CurrentHudSelect);
              }
            }
            break;
          }
        }
      }
    });
  }

  checkHover() {
    const mouseStatus = this.queries.mouseStatus.results[0].getMutableComponent(MouseStatus);
    const mouseTransX = mouseStatus.mapX;
    const mouseTransY = mouseStatus.mapY;

    // Loop through all the hoverable objects
    this.queries.hoverableObjects.results.forEach((object) => {
      object.removeComponent(CurrentHover);

      let objectPosition = object.getMutableComponent(CanvasPosition);
      let objectShape = object.getMutableComponent(Shape).type;

      switch (objectShape) {
        case ObjectShape.HEXAGON: {
          if (
            isInsideHexagon(
              objectPosition.x,
              objectPosition.y,
              mouseTransX,
              mouseTransY,
              TileSize.REGULAR
            )
          ) {
            if (!object.hasComponent(CurrentHover)) {
              object.addComponent(CurrentHover);
            }
          }
          break;
        }
      }
    });
  }

  checkSelect() {
    const mouseStatus = this.queries.mouseStatus.results[0].getMutableComponent(MouseStatus);
    const actionStatus = this.queries.actionStatus.results[0].getMutableComponent(ActionStatus);
    const focusStatus = this.queries.screenFocusStatus.results[0].getMutableComponent(ScreenFocusStatus);

    if (mouseStatus.isMouseClicked) {
      let isSelected = false;

      const mouseTransX = mouseStatus.mapX;
      const mouseTransY = mouseStatus.mapY;

      // Loop through all the selectable objects
      this.queries.selectableObjects.results.forEach((object) => {
        if (object.hasComponent(PreviousSelect)) {
          object.removeComponent(PreviousSelect);
        }

        if (object.hasComponent(CurrentSelect)) {
          object.addComponent(PreviousSelect);
          object.removeComponent(CurrentSelect);
        }

        let objectPosition = object.getMutableComponent(CanvasPosition);
        let objectShape = object.getMutableComponent(Shape).type;

        switch (objectShape) {
          case ObjectShape.HEXAGON: {
            if (
              isInsideHexagon(
                objectPosition.x,
                objectPosition.y,
                mouseTransX,
                mouseTransY,
                TileSize.REGULAR
              )
            ) {
              if (!object.hasComponent(CurrentSelect)) {
                object.addComponent(CurrentSelect);
                isSelected = true;
                focusStatus.startFocusing = true;
              }
            }
            break;
          }
        }
      });

      if (isSelected) {
        actionStatus.action = ActionType.SELECTED;
      } else {
        actionStatus.action = ActionType.NOT_SELECTED;
      }
    }
  }

  checkRightSelect() {
    const mouseStatus =
      this.queries.mouseStatus.results[0].getMutableComponent(MouseStatus);
    const actionStatus =
      this.queries.actionStatus.results[0].getMutableComponent(ActionStatus);
    const focusStatus =
      this.queries.screenFocusStatus.results[0].getMutableComponent(
        ScreenFocusStatus
      );

    // Remove current right select to allow only one frame to contain
    // current right select
    this.queries.rightSelectableObjects.results.forEach((object) => {
      object.removeComponent(CurrentRightSelect);
    });

    if (mouseStatus.isRightMouseClicked) {
      let isSelected = false;

      const mouseTransX = mouseStatus.mapX;
      const mouseTransY = mouseStatus.mapY;

      // Loop through all the selectable objects
      this.queries.rightSelectableObjects.results.forEach((object) => {
        let objectPosition = object.getMutableComponent(CanvasPosition);
        let objectShape = object.getMutableComponent(Shape).type;

        switch (objectShape) {
          case ObjectShape.HEXAGON: {
            if (
              isInsideHexagon(
                objectPosition.x,
                objectPosition.y,
                mouseTransX,
                mouseTransY,
                TileSize.REGULAR
              )
            ) {
              if (!object.hasComponent(CurrentRightSelect)) {
                object.addComponent(CurrentRightSelect);
                isSelected = true;
              }
            }
            break;
          }
        }
      });
    }
  }
}

// Define a query of entities
MouseHandlerSystem.queries = {
  mouseStatus: {
    components: [MouseStatus],
  },
  actionStatus: {
    components: [ActionStatus],
  },
  screenStatus: {
    components: [ScreenStatus],
  },
  screenFocusStatus: {
    components: [ScreenFocusStatus],
  },
  selectecdUnit: {
    components: [CurrentSelect, Unit],
  },

  hoverableObjects: {
    components: [Hoverable, CanvasPosition],
  },
  selectableObjects: {
    components: [Selectable, CanvasPosition, Shape],
  },
  rightSelectableObjects: {
    components: [RightSelectable, CanvasPosition, Shape],
  },
  hudHoverableObjects: {
    components: [HudHoverable, CanvasPosition]
  },
  hudSelectableObjects: {
    components: [HudSelectable, CanvasPosition]
  }
};
