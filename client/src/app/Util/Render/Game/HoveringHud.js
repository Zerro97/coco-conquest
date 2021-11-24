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

export function drawHoveringProductionButton(ctx, pos, size, text) {
  let grad = ctx.createLinearGradient(pos.x, pos.y, pos.x, pos.y + size.height);
  grad.addColorStop(0, "rgb(153, 161, 186)");
  grad.addColorStop(0.3, "rgb(86, 99, 141)");
  grad.addColorStop(0.7, "rgb(86, 99, 141)");
  grad.addColorStop(1, "rgb(153, 161, 186)");

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