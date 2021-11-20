export function drawHoveringTurnButton(ctx, pos, radius) {
  // Draw outer transparent white circle
  const grad1 = ctx.createLinearGradient(pos.x, pos.y - 90, pos.x, pos.y + 90);
  grad1.addColorStop(0.3, "rgba(255, 255, 255, 0)");
  grad1.addColorStop(1, "white");

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
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("END", pos.x, pos.y - 5);
  ctx.fillText("TURN", pos.x, pos.y + 25);
}