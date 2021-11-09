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
	
	drawHexagonLine(ctx, x, y, 50);
	ctx.clip();
	ctx.closePath();
	ctx.lineWidth = 6;
	ctx.strokeStyle = outColor;
	ctx.fillStyle = inColor;
	ctx.fill();
	ctx.stroke();
	ctx.restore();
}


export function drawBaseTile(ctx, x, y) {
	drawHexagon(ctx, x, y, 'rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.01)');
}

export function drawHoveringTile(ctx, x, y) {
	drawHexagon(ctx, x, y, 'rgba(44, 92, 138, 0.2)', 'rgba(34, 34, 34, 0.2)');
}

export function drawSelectedTile(ctx, x, y) {
	drawHexagon(ctx, x, y, 'rgba(44, 92, 138, 0.3)', 'rgba(36, 50, 64, 0.3)');
}

export function drawAttackingTile(ctx, x, y) {
	drawHexagon(ctx, x, y, 'rgba(255, 0, 0, 0.3)', 'rgba(255, 0, 0, 0.1)');
}

export function drawMovingTile(ctx, x, y) {
	drawHexagon(ctx, x, y, 'rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.1)');
}

export function drawImageTile(ctx, x, y, image) {
	ctx.save();
	ctx.beginPath();
	drawHexagonLine(ctx, x, y, 50);
	ctx.closePath();
	ctx.clip();
	ctx.drawImage(image, x - 50, y - 50, 100, 100);
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
export function applyTransformation(x, y, translation, scale) {
	return { x: (x + translation.x) / scale.x, y: (y + translation.y) / scale.y };
}
