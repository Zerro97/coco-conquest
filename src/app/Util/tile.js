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
	const angle = 2 * Math.PI / 6; // 60 degree

	for (var i = 0; i < 6; i++) {
		ctx.lineTo(x + r * Math.sin(angle * i), y + r * Math.cos(angle * i));
	}
}

function drawHexagon(ctx, x, y, outColor, inColor) {
	ctx.beginPath();
	ctx.fillStyle = outColor;
	drawHexagonLine(ctx, x, y, 50);
	ctx.closePath();
	ctx.fill();

	// Reverse Clip
	ctx.save();
	ctx.beginPath();
	drawHexagonLine(ctx, x, y, 45);
	ctx.closePath();
	ctx.clip();
	ctx.fillStyle = inColor;
	ctx.fillRect(-5000, -5000, 10000, 10000);
	ctx.restore();
}

export function drawBaseTile(ctx, x, y) {
	drawHexagon(ctx, x, y, 'rgba(68, 68, 68, 0.5)', 'rgba(34, 34, 34, 0.5)');
}

export function drawHoveringTile(ctx, x, y) {
	drawHexagon(ctx, x, y, 'rgba(44, 92, 138, 0.5)', 'rgba(34, 34, 34, 0.5)');
}

export function drawSelectedTile(ctx, x, y) {
	drawHexagon(ctx, x, y, 'rgba(44, 92, 138, 0.5)', 'rgba(36, 50, 64, 0.5)');
}

export function drawAttackingTile(ctx, x, y) {
	drawHexagon(ctx, x, y, 'rgba(122, 70, 70, 0.5)', 'rgba(74, 44, 44, 0.5)');
}

export function drawMovingTile(ctx, x, y) {
	drawHexagon(ctx, x, y, 'rgba(70, 122, 75, 0.5)', 'rgba(38, 64, 40, 0.5)');
}


export function drawImageTile(ctx, x, y, image) {
	ctx.save();
	ctx.beginPath();
	drawHexagonLine(ctx, x, y, 50);
	ctx.closePath();
	ctx.clip();
	ctx.drawImage(image, x-50, y-50, 100, 100);
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
	let canvasX = r * Math.sqrt(3) * (x - 0.5 * (y&1));
	let canvasY = r * 3/2 * y;

	return {x: canvasX, y: canvasY};
}

export function cubeToPixel(x, z, r) {
	let canvasX = r * (Math.sqrt(3) * x + Math.sqrt(3)/2 * z);
	let canvasY = r * (3./2 * z);

	return {x: canvasX, y: canvasY};
}

/**
 * Given canvas coordinate of hexagon and a point
 * return if the point is within the hexagon
 * 
 * @param {*} hexX 
 * @param {*} hexY 
 * @param {*} posX 
 * @param {*} posY 
 * @param {*} radius 
 * @returns 
 */
export function isInsideHexagon(hexX, hexY, posX, posY, radius){
	const dx = Math.abs(hexX - posX)/(radius*2);
	const dy = Math.abs(hexY - posY)/(radius*2);
	const a = 0.25 * Math.sqrt(3.0);

	return (dx <= a) && (a*dy + 0.25*dx <= 0.5*a);
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
	//return {x: x, y: y};
	return {x: (x + translation.x) / scale.x, y: (y + translation.y) / scale.y};
}