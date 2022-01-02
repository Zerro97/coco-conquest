function drawOutline(ctx, pos, size) {
  ctx.beginPath();
  ctx.rect(pos.x, pos.y, size.width, size.height);
  ctx.closePath();
  ctx.fillStyle = "white";
  ctx.fill();

  let grad1 = ctx.createLinearGradient(pos.x, pos.y, pos.x + size.width, pos.y);
  grad1.addColorStop(0, "rgb(50, 50, 50)");
  grad1.addColorStop(0.008, "rgba(233, 233, 234, 0)");
  grad1.addColorStop(0.992, "rgba(233, 233, 234, 0)");
  grad1.addColorStop(1, "rgb(50, 50, 50)");

  ctx.fillStyle = grad1;
  ctx.beginPath();
  ctx.rect(pos.x, pos.y, size.width, size.height);
  ctx.closePath();
  ctx.fill();

  let grad2 = ctx.createLinearGradient(pos.x, pos.y, pos.x, pos.y + size.height);
  grad2.addColorStop(0, "rgb(50, 50, 50)");
  grad2.addColorStop(0.008, "rgba(233, 233, 234, 0)");
  grad2.addColorStop(0.992, "rgba(233, 233, 234, 0)");
  grad2.addColorStop(1, "rgb(50, 50, 50)");

  ctx.fillStyle = grad2;
  ctx.beginPath();
  ctx.rect(pos.x, pos.y, size.width, size.height);
  ctx.closePath();
  ctx.fill();
}

export function drawTurnButton(ctx, pos, radius) {
  // Draw outer transparent white circle
  const grad1 = ctx.createLinearGradient(pos.x, pos.y - 90, pos.x, pos.y + 90);
  grad1.addColorStop(0, "white");
  grad1.addColorStop(0.7, "rgba(255, 255, 255, 0)");

  ctx.fillStyle = grad1;
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, 90, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();

  // Draw inner dark blue circle
  const grad2 = ctx.createRadialGradient(pos.x, pos.y, 1, pos.x, pos.y, radius);
  grad2.addColorStop(0, "rgb(41, 54, 96)");
  grad2.addColorStop(.7, "rgb(41, 54, 96)");
  grad2.addColorStop(1, "rgb(28, 33, 50)");

  ctx.fillStyle = grad2;
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();

  // Write text
  ctx.font = "26px Arial";
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.textAlign = "center";
  ctx.fillText("END", pos.x, pos.y - 5);
  ctx.fillText("TURN", pos.x, pos.y + 25);
}

export function drawTurnBox(ctx, pos, text) {
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
  ctx.lineTo(pos.x, pos.y + 50);
  ctx.lineTo(pos.x - 50, pos.y + 65);
  ctx.lineTo(pos.x - 100, pos.y + 50);
  ctx.lineTo(pos.x - 100, pos.y - 10);
  ctx.closePath();

  ctx.fillStyle = "rgb(52, 60, 89)";
  ctx.strokeStyle = "white";
  ctx.lineWidth = 3;
  ctx.fill();
  ctx.stroke();

  ctx.font = "25px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText(text, pos.x - 50, pos.y + 35);

  ctx.font = "15px Arial";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6";
  ctx.textAlign = "center";
  ctx.fillText("Turn", pos.x - 50, pos.y + 50);
}

export function drawScienceButton(ctx, pos, radius) {
  // Draw Circle
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = "rgb(66, 79, 121)";
  ctx.fill();
}

export function drawMap(ctx, pos, size) {
  drawOutline(ctx, pos, size);

  // Draw map
  ctx.fillStyle = "black";
  ctx.fillRect(pos.x + 4, pos.y + 4, size.width - 8, size.height - 8);

  // Draw map pos rectangle
  ctx.fillStyle = "white";
  ctx.lineWidth = 2;
  ctx.strokeStyle = "white";
  ctx.strokeRect(pos.x + 20, pos.y + 20, size.width - 40, size.height - 40);
}

export function drawTopPanel(ctx, pos, size) {
  ctx.fillStyle = "rgb(39, 42, 54)";
  ctx.fillRect(pos.x, pos.y, size.width, size.height);
}

export function drawProductionPanel(ctx, pos, size) {
  drawOutline(ctx, pos, size);

  ctx.fillStyle = "rgb(52, 60, 89)";
  ctx.beginPath();
  ctx.rect(pos.x + 4, pos.y + 4, size.width - 8, size.height - 8);
  ctx.closePath();
  ctx.fill();
}

export function drawProductionCategory(ctx, pos, size, text) {
  // Outer box
  ctx.fillStyle = "rgb(221,174,79)";
  ctx.strokeStyle = "rgb(22, 30, 59)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pos.x + 6, pos.y - 3);
  ctx.lineTo(pos.x + size.width - 6, pos.y - 3);
  ctx.lineTo(pos.x + size.width - 3, pos.y);
  ctx.lineTo(pos.x + size.width - 3, pos.y + size.height);
  ctx.lineTo(pos.x + size.width - 6, pos.y + size.height + 3);
  ctx.lineTo(pos.x + 6, pos.y + size.height + 3);
  ctx.lineTo(pos.x + 3, pos.y + size.height);
  ctx.lineTo(pos.x + 3, pos.y);
  ctx.lineTo(pos.x + 6, pos.y - 3);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Inner box
  let grad = ctx.createLinearGradient(pos.x, pos.y, pos.x, pos.y + size.height);
  grad.addColorStop(0, "rgb(249,250,252)");
  grad.addColorStop(0.3, "rgb(210,219,235)");
  grad.addColorStop(0.7, "rgb(210,219,235)");
  grad.addColorStop(1, "rgb(249,250,252)");

  ctx.save();
  ctx.fillStyle = grad;
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgb(29, 32, 44)";
  ctx.beginPath();
  ctx.moveTo(pos.x + 20, pos.y);
  ctx.lineTo(pos.x + size.width - 20, pos.y);
  ctx.bezierCurveTo(
    pos.x + size.width - 5, pos.y + size.height - 10, 
    pos.x + size.width - 5, pos.y + 10, 
    pos.x + size.width - 20, pos.y + size.height
  );
  ctx.lineTo(pos.x + 20, pos.y + size.height);
  ctx.bezierCurveTo(
    pos.x + 5, pos.y + 10, 
    pos.x + 5, pos.y + size.height - 10, 
    pos.x + 20, pos.y
  );
  ctx.clip();
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Transparent upper half
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.fillRect(pos.x + 3, pos.y - 3, size.width - 6, size.height/2 + 3);
  ctx.restore();

  // Text
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText(text, pos.x + size.width/2, pos.y + 22);
}

export function drawProductionButton(ctx, pos, size, text) {
  let grad = ctx.createLinearGradient(pos.x, pos.y, pos.x, pos.y + size.height);
  grad.addColorStop(0, "rgb(86, 99, 141)");
  grad.addColorStop(0.3, "rgb(66, 79, 121)");
  grad.addColorStop(0.7, "rgb(66, 79, 121)");
  grad.addColorStop(1, "rgb(86, 99, 141)");

  ctx.save();
  ctx.fillStyle = grad;
  ctx.strokeStyle = "rgb(22, 30, 59)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pos.x + 6, pos.y);
  ctx.lineTo(pos.x + size.width - 6, pos.y);
  ctx.lineTo(pos.x + size.width - 3, pos.y + 3);
  ctx.lineTo(pos.x + size.width - 3, pos.y + size.height - 3);
  ctx.lineTo(pos.x + size.width - 6, pos.y + size.height);
  ctx.lineTo(pos.x + 6, pos.y + size.height);
  ctx.lineTo(pos.x + 3, pos.y + size.height - 3);
  ctx.lineTo(pos.x + 3, pos.y + 3);
  ctx.lineTo(pos.x + 6, pos.y);
  ctx.clip();
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Transparent upper half
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  ctx.fillRect(pos.x + 3, pos.y, size.width - 6, size.height/2);
  ctx.restore();

  // Text
  ctx.font = "16px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "left";
  ctx.fillText(text, pos.x + 15, pos.y + 20);
  ctx.fillText("1", pos.x + size.width - 25, pos.y + 20);
}

export function drawTeamIcon(ctx, pos, radius, team) {
  // Draw opaque black above circle
  const grad1 = ctx.createLinearGradient(pos.x, pos.y - 50, pos.x, pos.y);
  grad1.addColorStop(1, "black");
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