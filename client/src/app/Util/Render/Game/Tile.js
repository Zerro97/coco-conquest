import { TileSize } from "../../../Type";

/**
 * Given the center of hexagon (in canvas coordinate),
 * draw the hexagon based on that center
 *
 * @param {*} ctx
 * @param {*} x
 * @param {*} y
 * @param {*} r
 */
function drawHexagonLine(ctx, x, y, r) {
	const angle = (2 * Math.PI) / 6; // 60 degree

	for (var i = 0; i < 6; i++) {
		ctx.lineTo(x + r * Math.sin(angle * i), y + r * Math.cos(angle * i));
	}
}

function drawHexagon(ctx, x, y, outColor, inColor) {
	ctx.save();
	
	ctx.beginPath();
	
	drawHexagonLine(ctx, x, y, TileSize.REGULAR);
	ctx.clip();
	ctx.closePath();
	
	ctx.strokeStyle = outColor;
	ctx.fillStyle = inColor;
	ctx.fill();
	ctx.stroke();
	ctx.restore();
}

export function drawTileGrid(ctx, x, y) {
	ctx.lineWidth = 5;
	drawHexagon(ctx, x, y, "rgb(30, 30, 30)", "rgb(10, 10, 10)");
}

export function drawBaseTile(ctx, x, y) {
	ctx.lineWidth = 10;
	drawHexagon(ctx, x, y, "rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.01)");
}

export function drawHoveringTile(ctx, x, y) {
	ctx.lineWidth = 10;
	drawHexagon(ctx, x, y, "rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.2)");
}

export function drawSelectedTile(ctx, x, y) {
	ctx.lineWidth = 10;
	drawHexagon(ctx, x, y, "rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.2)");
}

export function drawAttackingTile(ctx, x, y) {
	ctx.lineWidth = 10;
	drawHexagon(ctx, x, y, "rgba(213, 33, 33, 1)", "rgba(213, 33, 33, 0.3)");
}

export function drawMovingTile(ctx, x, y) {
	ctx.lineWidth = 10;
	drawHexagon(ctx, x, y, "rgba(61, 133, 198, 1)", "rgba(61, 133, 198, 0.3)");
}

export function drawImageTile(ctx, spritesheet, src, dest) {
	console.log(src, dest);
	ctx.save();
	ctx.beginPath();
	drawHexagonLine(ctx, dest.x, dest.y, TileSize.REGULAR);
	ctx.closePath();
	ctx.clip();
	ctx.drawImage(spritesheet, src.x, src.y, src.width, src.height, dest.x, dest.y, dest.width, dest.height);
	ctx.restore();
}

export function drawBoundary(ctx, x, y, r, edge, color = "white") {
	const angle = (2 * Math.PI) / 6;
	
	ctx.strokeStyle = color;
	ctx.lineWidth = 5;
	ctx.beginPath();
	ctx.moveTo(x + r * Math.sin(angle * -1), y + r * Math.cos(angle * -1));
	for (var i = 0; i < 6; i++) {
		if(edge[i]) {
			ctx.lineTo(x + r * Math.sin(angle * i), y + r * Math.cos(angle * i));
		} else {
			ctx.moveTo(x + r * Math.sin(angle * i), y + r * Math.cos(angle * i));
		}
	}
	ctx.stroke();
}