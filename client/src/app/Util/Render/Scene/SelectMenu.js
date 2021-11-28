export function drawSelectedLobbyRoomRow(ctx, pos, size, room) {
    ctx.beginPath();
    ctx.rect(pos.x, pos.y, size.width, size.height);
    ctx.closePath();

    ctx.fillStyle= "rgb(36, 49, 91)";
    ctx.fill();
    ctx.strokeStyle = "rgb(196, 209, 251)";
    ctx.stroke();

    ctx.font = "18px Arial";
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.textAlign = "left";
    ctx.fillText(room.roomName, pos.x + 10, pos.y + size.height/2 + 7);
    ctx.fillText("Continent", pos.x + 400, pos.y + size.height/2 + 7);
    ctx.fillText("No", pos.x + 600, pos.y + size.height/2 + 7);
    ctx.fillText("1/6", pos.x + 700, pos.y + size.height/2 + 7);
}