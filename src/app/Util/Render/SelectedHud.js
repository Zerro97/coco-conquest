export function drawSelectedTeamIcon(ctx, pos, radius, team) {
    // Draw opaque black above circle
    const grad1 = ctx.createLinearGradient(pos.x, pos.y - 50, pos.x, pos.y);
    grad1.addColorStop(1, "white");
    grad1.addColorStop(0, "rgba(0, 0, 0, 0");
    ctx.beginPath();
    ctx.rect(pos.x - radius, pos.y - 50, radius * 2, 50);
    ctx.closePath();
    ctx.fillStyle = grad1;
    ctx.fill();
  
    // Draw Outline
    const grad2 = ctx.createRadialGradient(pos.x, pos.y, radius, pos.x, pos.y, radius-3);
    grad2.addColorStop(0, "rgb(50, 50, 50)");
    grad2.addColorStop(1, "white");
  
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = grad2;
    ctx.fill();
  
    // Draw Circle
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius- 3, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = "rgb(66, 79, 121)";
    ctx.fill();
  
    // Draw Team Number
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(team, pos.x, pos.y + 5);
  }