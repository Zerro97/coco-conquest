/**
 * Given the center of hexagon (in canvas coordinate),
 * draw the hexagon based on that center
 * 
 * @param {*} ctx 
 * @param {*} x 
 * @param {*} y 
 * @param {*} r 
 */
export function drawHexagon(ctx, x, y, r) {
	const angle = 2 * Math.PI / 6; // 60 degree

	ctx.beginPath();
	ctx.strokeStyle = '#444444';
	for (var i = 0; i < 6; i++) {
		ctx.lineTo(x + r * Math.sin(angle * i), y + r * Math.cos(angle * i));
	}
	ctx.closePath();
	ctx.stroke();
}

/**
 * Variation of drawHexagon.
 * Draw highlighted hexagon when mouse is hovering
 * 
 * @param {*} ctx 
 * @param {*} x 
 * @param {*} y 
 * @param {*} r 
 */
export function drawHoveredHexagon(ctx, x, y, r) {
	const angle = 2 * Math.PI / 6; // 60 degree

	ctx.beginPath();
	ctx.strokeStyle = '#2c5c8a';
	ctx.lineWidth = 3;
	for (var i = 0; i < 6; i++) {
		ctx.lineTo(x + r * Math.sin(angle * i), y + r * Math.cos(angle * i));
	}
	ctx.closePath();
	ctx.stroke();
	ctx.lineWidth = 1;
}

/**
 * Variation of drawHexagon.
 * Draw highlighted hexagon when tile is clicked
 * 
 * @param {*} ctx 
 * @param {*} x 
 * @param {*} y 
 * @param {*} r 
 */
export function drawSelectedHexagon(ctx, x, y, r) {
	const angle = 2 * Math.PI / 6; // 60 degree

	ctx.beginPath();
	ctx.fillStyle = '#243240';
	ctx.strokeStyle = '#2c5c8a';
	ctx.lineWidth = 3;
	for (var i = 0; i < 6; i++) {
		ctx.lineTo(x + r * Math.sin(angle * i), y + r * Math.cos(angle * i));
	}
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.lineWidth = 1;
}

/**
 * Given x, y position of the tile,
 * return the actual pixel position of tile in canvas
 * 
 * @param {*} x 
 * @param {*} y 
 * @param {*} r 
 */
export function hexToCanvas(x, y, r) {
	let canvasX = x * Math.sqrt(3) * r;
	let canvasY = y * 3/2 * r;

	if(y % 2 === 0) {
		canvasX += Math.sqrt(3) * r/2;
	}

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

	return (dy <= a) && (a*dx + 0.25*dy <= 0.5*a);
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