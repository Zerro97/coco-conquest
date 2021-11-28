function drawOutline(ctx, pos, size) {
    ctx.beginPath();
    ctx.rect(pos.x, pos.y, size.width, size.height);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
  
    let grad1 = ctx.createLinearGradient(pos.x, pos.y, pos.x + size.width, pos.y);
    grad1.addColorStop(0, "rgb(50, 50, 50)");
    grad1.addColorStop(0.02, "rgba(255, 255, 255, 0)");
    grad1.addColorStop(0.98, "rgba(255, 255, 255, 0)");
    grad1.addColorStop(1, "rgb(50, 50, 50)");
  
    ctx.fillStyle = grad1;
    ctx.beginPath();
    ctx.rect(pos.x, pos.y, size.width, size.height);
    ctx.closePath();
    ctx.fill();
  
    let grad2 = ctx.createLinearGradient(pos.x, pos.y, pos.x, pos.y + size.height);
    grad2.addColorStop(0, "rgb(50, 50, 50)");
    grad2.addColorStop(0.2, "rgba(233, 233, 234, 0)");
    grad2.addColorStop(0.8, "rgba(233, 233, 234, 0)");
    grad2.addColorStop(1, "rgb(50, 50, 50)");
  
    ctx.fillStyle = grad2;
    ctx.beginPath();
    ctx.rect(pos.x, pos.y, size.width, size.height);
    ctx.closePath();
    ctx.fill();
}

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

export function drawHoveringPlayerTeamButton(ctx, pos, size, team) {
    const grad = ctx.createLinearGradient(pos.x, pos.y, pos.x, pos.y + size.height);
    grad.addColorStop(0, "rgb(46, 59, 101)");
    grad.addColorStop(0.5, "rgb(36, 49, 91)");
    grad.addColorStop(1, "rgb(36, 49, 91)");

    ctx.save();
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
    ctx.clip();
    ctx.closePath();

    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = "rgb(0, 0, 10)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw transparent upper half
    ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
    ctx.fillRect(pos.x - 5, pos.y, size.width + 10, size.height/2);
    ctx.restore();

    ctx.font = "25px Arial";
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.fillText(team, pos.x + size.width/2, pos.y + size.height/2 + 10);
}

export function drawHoveringStartButton(ctx, pos, size) {
    drawOutline(ctx, pos, size);

    const grad = ctx.createLinearGradient(pos.x, pos.y, pos.x, pos.y+size.height);
    grad.addColorStop(0, "rgb(41,164,110)");
    grad.addColorStop(0.3, "rgb(24,102,73)");
    grad.addColorStop(0.7, "rgb(24,102,73)");
    grad.addColorStop(1, "rgb(41,164,110)");

    ctx.fillStyle = grad;
    ctx.fillRect(pos.x + 4, pos.y + 4, size.width - 8, size.height - 8);

    ctx.font = "25px Arial";
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.fillText("START", pos.x + size.width/2, pos.y + size.height/2 + 10);
}

export function drawHoveringSetupBackButton(ctx, pos, size) {
    drawOutline(ctx, pos, size);

    const grad = ctx.createLinearGradient(pos.x, pos.y, pos.x, pos.y+size.height);
    grad.addColorStop(0, "rgb(36, 49, 91)");
    grad.addColorStop(0.3, "rgb(56, 69, 111)");
    grad.addColorStop(0.7, "rgb(56, 69, 111)");
    grad.addColorStop(1, "rgb(36, 49, 91)");

    ctx.fillStyle = grad;
    ctx.fillRect(pos.x + 4, pos.y + 4, size.width - 8, size.height - 8);

    ctx.font = "25px Arial";
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.fillText("GO BACK", pos.x + size.width/2, pos.y + size.height/2 + 10);
}

export function drawHoveringButton(ctx, pos, size, text) {
    drawOutline(ctx, pos, size);

    const grad = ctx.createLinearGradient(pos.x, pos.y, pos.x, pos.y+size.height);
    grad.addColorStop(0, "rgb(36, 49, 91)");
    grad.addColorStop(0.3, "rgb(56, 69, 111)");
    grad.addColorStop(0.7, "rgb(56, 69, 111)");
    grad.addColorStop(1, "rgb(36, 49, 91)");

    ctx.fillStyle = grad;
    ctx.fillRect(pos.x + 4, pos.y + 4, size.width - 8, size.height - 8);

    ctx.font = "25px Arial";
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.textAlign = "center";
    ctx.fillText(text, pos.x + size.width/2, pos.y + size.height/2 + 10);
}

export function drawHoveringLobbyRoomRow(ctx, pos, size, room) {
    ctx.beginPath();
    ctx.rect(pos.x, pos.y, size.width, size.height);
    ctx.closePath();

    ctx.fillStyle= "rgb(36, 49, 91)";
    ctx.fill();
    ctx.strokeStyle = "rgb(176, 189, 231)";
    ctx.stroke();

    ctx.font = "18px Arial";
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.textAlign = "left";
    ctx.fillText(room.roomName, pos.x + 10, pos.y + size.height/2 + 7);
    ctx.fillText("Continent", pos.x + 400, pos.y + size.height/2 + 7);
    ctx.fillText("No", pos.x + 600, pos.y + size.height/2 + 7);
    ctx.fillText("1/6", pos.x + 700, pos.y + size.height/2 + 7);
}