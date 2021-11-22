export function drawMenuButton(ctx, pos, text) {
    const grad = ctx.createLinearGradient(pos.x, pos.y, pos.x, pos.y + 40);
    grad.addColorStop(0, "rgba(41, 54, 96, 0)");
    grad.addColorStop(0.3, "rgb(26, 39, 81)");
    grad.addColorStop(0.7, "rgb(26, 39, 81)");
    grad.addColorStop(1, "rgba(41, 54, 96, 0)");

    // Menu Box
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
    ctx.fillStyle = grad;
    ctx.fill();

    // Menu Text
    ctx.font = "25px Arial";
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fillText(text, pos.x + 100, pos.y + 27);
}