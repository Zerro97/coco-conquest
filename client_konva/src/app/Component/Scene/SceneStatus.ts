import { Component, Types } from "@/Ecsy";

export class SceneStatus extends Component<any> {}

SceneStatus.schema = {
  currentScene: { type: Types.Number },
  previousScene: { type: Types.Number }
};