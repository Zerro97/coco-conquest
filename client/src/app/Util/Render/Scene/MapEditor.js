import { roundRect } from "..";

export function drawEditPanel(ctx, pos, size) {
    ctx.fillStyle = "rgba(70, 70, 70, 0.8)";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(40,40,40)";
    roundRect(ctx, pos.x, pos.y, size.width, size.height, {tr: 10, tl: 0, br: 10, bl: 0}, true, false);

    for(let i=1; i<8; i++) {
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y + size.height*i/8);
      ctx.lineTo(pos.x + size.width, pos.y + size.height*i/8);
      ctx.closePath();
      ctx.stroke();
    }

    for(let i=1; i<3; i++) {
      ctx.beginPath();
      ctx.moveTo(pos.x + size.width*i/3, pos.y );
      ctx.lineTo(pos.x + size.width*i/3, pos.y + size.height);
      ctx.closePath();
      ctx.stroke();
    }

    // Draw Side Category Panels
    ctx.fillStyle = "rgba(60, 60, 60, 0.8)";
    for(let i=0; i<8; i++) {
      roundRect(ctx, pos.x - 50, pos.y + size.height*i/8 , 50, size.height/8, {tr: 0, tl: 20, br: 0, bl: 20}, true, true);
    }
}