export function drawHoverMenuButton(ctx, pos, size, text) {
    // Menu Box
    ctx.filter = "blur(3px)";
    ctx.beginPath();

    ctx.moveTo(pos.x + 15, pos.y);
    ctx.lineTo(pos.x + size.width - 15, pos.y);
    ctx.bezierCurveTo(
        pos.x + size.width + 10, pos.y, 
        pos.x + size.width + 10, pos.y + size.height, 
        pos.x + size.width - 15, pos.y + size.height
    );
    ctx.lineTo(pos.x + size.width - 30, pos.y + size.height);
    ctx.lineTo(pos.x + 15, pos.y + size.height);
    ctx.bezierCurveTo(
        pos.x - 10, pos.y + size.height, 
        pos.x - 10, pos.y,
        pos.x + 15, pos.y 
    );

    ctx.closePath();
    ctx.fillStyle = "rgb(11, 24, 66)";
    ctx.fill();
    ctx.filter = "none";

    // Menu Text
    ctx.font = "25px Arial";
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.fillText(text, pos.x + size.width/2, pos.y + size.height/2 + 7);
}