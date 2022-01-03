import { roundRect } from "..";

export function drawEditPanel(ctx, pos, size) {
    ctx.fillStyle = "rgba(20, 20, 20, 0.8)";
    roundRect(ctx, pos.x, pos.y, size.width, size.height, 10, true, false);
    
}