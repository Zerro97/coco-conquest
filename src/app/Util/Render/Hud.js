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
  // Draw outer rectangle
  ctx.fillStyle = "rgb(41, 54, 96)";
  ctx.fillRect(pos.x - 10, pos.y - 10, size.width + 20, size.height + 20);

  let grad1 = ctx.createLinearGradient(pos.x - 10, pos.y - 10, pos.x + size.width + 20, pos.y - 10);
  grad1.addColorStop(0, "rgb(28, 33, 50)");
  grad1.addColorStop(0.05, "rgba(28, 33, 50, 0)");
  grad1.addColorStop(0.95, "rgba(28, 33, 50, 0)");
  grad1.addColorStop(1.0, "rgb(28, 33, 50)");

  ctx.fillStyle = grad1;
  ctx.fillRect(pos.x - 10, pos.y - 10, size.width + 20, size.height + 20);

  let grad2 = ctx.createLinearGradient(pos.x - 10, pos.y - 10, pos.x - 10, pos.y + size.height + 20);
  grad2.addColorStop(0, "rgb(28, 33, 50)");
  grad2.addColorStop(0.05, "rgba(28, 33, 50, 0)");
  grad2.addColorStop(0.95, "rgba(28, 33, 50, 0)");
  grad2.addColorStop(1.0, "rgb(28, 33, 50)");

  ctx.fillStyle = grad2;
  ctx.fillRect(pos.x - 10, pos.y - 10, size.width + 20, size.height + 20);

  // Draw map
  ctx.fillStyle = "black";
  ctx.fillRect(pos.x, pos.y, size.width, size.height);

  //240, 150

  // Draw map pos rectangle
  ctx.fillStyle = "white";
  ctx.lineWidth = 2;
  ctx.strokeStyle = "white";
  ctx.strokeRect(pos.x + 20, pos.y + 20, size.width - 40, size.height - 40);
}

export function drawProductionPanel(ctx, pos, size) {
  ctx.fillStyle = "rgb(39, 42, 54)";
  ctx.strokeStyle = "rgb(233, 233, 234)";
  ctx.beginPath();
  ctx.rect(pos.x , pos.y, size.width, size.height);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

export function drawProductionButton(ctx, pos, size) {

}