import { Component, Types } from "@/Ecsy";

export class Image extends Component<any> {}

Image.schema = {
	value: { type: Types.Ref }
};