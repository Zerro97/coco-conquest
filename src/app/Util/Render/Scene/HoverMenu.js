export function drawHoverMenuButton(ctx, pos, text) {
    // Menu Box
    ctx.filter = "blur(3px)";
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.lineTo(pos.x + 200, pos.y);
    ctx.bezierCurveTo(
        pos.x + 230, pos.y, 
        pos.x + 230, pos.y + 40, 
        pos.x + 200, pos.y + 40
    );
    ctx.lineTo(pos.x + 200, pos.y + 40);
    ctx.lineTo(pos.x, pos.y + 40);
    ctx.bezierCurveTo(
        pos.x - 30, pos.y + 40, 
        pos.x - 30, pos.y,
        pos.x, pos.y 
    );
    ctx.lineTo(pos.x, pos.y);

    ctx.closePath();
    ctx.fillStyle = "rgb(11, 24, 66)";
    ctx.fill();
    ctx.filter = "none";

    // Menu Text
    ctx.font = "25px Arial";
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fillText(text, pos.x + 100, pos.y + 27);
}