function drawOutline(ctx, pos, size, offset = {x: 0, y: 0}) {
  ctx.beginPath();
  ctx.rect(pos.x - offset.x, pos.y - offset.y, size.width + offset.x * 2, size.height + offset.y * 2);
  ctx.closePath();
  ctx.fillStyle = "white";
  ctx.fill();

  let grad1 = ctx.createLinearGradient(pos.x - offset.x, pos.y - offset.y, pos.x + size.width + offset.x, pos.y - offset.y);
  grad1.addColorStop(0, "rgb(50, 50, 50)");
  grad1.addColorStop(0.008, "rgba(233, 233, 234, 0)");
  grad1.addColorStop(0.992, "rgba(233, 233, 234, 0)");
  grad1.addColorStop(1, "rgb(50, 50, 50)");

  ctx.fillStyle = grad1;
  ctx.beginPath();
  ctx.rect(pos.x - offset.x, pos.y - offset.y, size.width + offset.x * 2, size.height + offset.y * 2);
  ctx.closePath();
  ctx.fill();

  let grad2 = ctx.createLinearGradient(pos.x - offset.x, pos.y - offset.y, pos.x - offset.x, pos.y + size.height + offset.y);
  grad2.addColorStop(0, "rgb(50, 50, 50)");
  grad2.addColorStop(0.008, "rgba(233, 233, 234, 0)");
  grad2.addColorStop(0.992, "rgba(233, 233, 234, 0)");
  grad2.addColorStop(1, "rgb(50, 50, 50)");

  ctx.fillStyle = grad2;
  ctx.beginPath();
  ctx.rect(pos.x - offset.x, pos.y - offset.y, size.width + offset.x * 2, size.height + offset.y * 2);
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

export function drawProductionPanel(ctx, pos, size) {
  drawOutline(ctx, pos, size);

  ctx.fillStyle = "rgb(39, 42, 54)";
  ctx.beginPath();
  ctx.rect(pos.x + 4, pos.y + 4, size.width - 8, size.height - 8);
  ctx.closePath();
  ctx.fill();
}

export function drawProductionButton(ctx, pos, size) {

}