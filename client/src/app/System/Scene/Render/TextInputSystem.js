import { System } from "../../Library/Ecsy";
import {
    TextInput
} from "../../Component";
import {  } from "../../Util";
import {  } from "../../Type";

export class TextInputSystem extends System {
  execute(delta, time) {

  }
}

TextInputSystem.queries = {
    textInputs: {
        components: [TextInput]
    }
};