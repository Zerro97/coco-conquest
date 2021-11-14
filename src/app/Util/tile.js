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
	drawHexagon(ctx, x, y, "rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.1)");
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

/**
 * Given x, y position of the tile,
 * return the actual pixel position of tile in canvas
 *
 * @param {*} x
 * @param {*} y
 * @param {*} r
 */
export function evenrToPixel(x, y, r) {
	let canvasX = r * Math.sqrt(3) * (x - 0.5 * (y & 1));
	let canvasY = ((r * 3) / 2) * y;

	return { x: canvasX, y: canvasY };
}

export function cubeToPixel(x, z, r) {
	let canvasX = r * (Math.sqrt(3) * x + (Math.sqrt(3) / 2) * z);
	let canvasY = r * ((3 / 2) * z);

	return { x: canvasX, y: canvasY };
}



/**
 * Apply given transformation to a point
 * Currently only translation & scale transformation
 * are handled (with translate applied first and then scale).
 *
 * @param {*} x
 * @param {*} y
 * @param {*} transformation
 */
export function applyTransformation(x, y, translation, scale, canvas) {
	return { 
		x: (x + translation.x - canvas.width/2) / scale.x + canvas.width/2, 
		y: (y + translation.y - canvas.height/2) / scale.y + canvas.height/2
	};
}

/**
 * 
 */
export function reverseTransformation(x, y, translation, scale, canvas) {
  return { 
		x: (x - canvas.width/2) * scale.x - translation.x + canvas.width/2,
		y: (y - canvas.height/2) * scale.y - translation.y + canvas.height/2
	};
}

// const scaledX = (x - width/2) * scale;
// const scaledY= (y - height/2) * scale;
// return {x: scaledX + centerX, y: scaledY + centerY};