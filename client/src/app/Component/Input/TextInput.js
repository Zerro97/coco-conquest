import { Component, Types } from "../../Library/Ecsy";

export class TextInput extends Component {}

TextInput.schema = {
    value: { type: Types.String },
};