export function drawMenuButton(ctx, pos, size, text) {
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
    ctx.fillStyle = "rgb(26, 39, 81)";
    ctx.fill();
    ctx.filter = "none";

    // Menu Text
    ctx.font = "25px Arial";
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fillText(text, pos.x + size.width/2, pos.y + size.height/2 + 7);
}

export function drawPlayerBox(ctx, pos, size) {
    const grad = ctx.createLinearGradient(pos.x, pos.y, pos.x, pos.y + size.height);
    grad.addColorStop(0, "rgb(36, 49, 91)");
    grad.addColorStop(0.5, "rgb(26, 39, 81)");
    grad.addColorStop(1, "rgb(26, 39, 81)");

    ctx.beginPath();

    ctx.moveTo(pos.x, pos.y);
    ctx.lineTo(pos.x + size.width, pos.y);
    ctx.lineTo(pos.x + size.width + 5, pos.y + 5);
    ctx.lineTo(pos.x + size.width + 5, pos.y + size.height - 5);
    ctx.lineTo(pos.x + size.width, pos.y + size.height);
    ctx.lineTo(pos.x, pos.y + size.height);
    ctx.lineTo(pos.x - 5, pos.y + size.height - 5);
    ctx.lineTo(pos.x - 5, pos.y + 5);
    ctx.lineTo(pos.x, pos.y);

    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = "rgb(0, 0, 10)";
    ctx.stroke();
}

export function drawStartButton(ctx, pos) {
    ctx.fillStyle = "red";
    ctx.fillRect(pos.x, pos.y, 100, 40);
}