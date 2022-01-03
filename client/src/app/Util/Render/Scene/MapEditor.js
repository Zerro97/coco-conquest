import { roundRect } from "..";

export function drawEditPanel(ctx, pos, size) {
    ctx.fillStyle = "rgba(20, 20, 20, 0.5)";
    roundRect(ctx, pos.x, pos.y, size.width, size.height, 10, true, false);
    
}