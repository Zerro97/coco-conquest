import { TileSize } from "../Type";

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
	ctx.lineWidth = 10;
	ctx.strokeStyle = outColor;
	ctx.fillStyle = inColor;
	ctx.fill();
	ctx.stroke();
	ctx.restore();
}


export function drawBaseTile(ctx, x, y) {
	drawHexagon(ctx, x, y, "rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.01)");
}

export function drawHoveringTile(ctx, x, y) {
	drawHexagon(ctx, x, y, "rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.2)");
}

export function drawSelectedTile(ctx, x, y) {
	drawHexagon(ctx, x, y, "rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.2)");
}

export function drawAttackingTile(ctx, x, y) {
	drawHexagon(ctx, x, y, "rgba(255, 0, 0, 0.3)", "rgba(255, 0, 0, 0.1)");
}

export function drawMovingTile(ctx, x, y) {
	drawHexagon(ctx, x, y, "rgba(61, 133, 198, 1)", "rgba(61, 133, 198, 0.3)");
}

export function drawImageTile(ctx, x, y, image) {
	ctx.save();
	ctx.beginPath();
	drawHexagonLine(ctx, x, y, TileSize.REGULAR);
	ctx.closePath();
	ctx.clip();
	ctx.drawImage(image, x - TileSize.REGULAR, y - TileSize.REGULAR, 100, 100);
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