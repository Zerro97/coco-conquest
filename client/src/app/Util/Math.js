/**
 * Given canvas coordinate of circle and a point
 * return if the point is within the circle
 * 
 * @param {*} circleX 
 * @param {*} circleY 
 * @param {*} pointX 
 * @param {*} pointY 
 * @param {*} radius 
 * @returns 
 */
export function isInsideCircle(circleX, circleY, pointX, pointY, radius){
	return Math.hypot(circleX - pointX, circleY - pointY) < radius;
}

/**
 * Given canvas coordinate of rectangle and a point
 * return if the point is within the rectangle
 * 
 * @param {*} rectX 
 * @param {*} rectY 
 * @param {*} pointX 
 * @param {*} pointY 
 * @param {*} width 
 * @param {*} height 
 * @returns 
 */
export function isInsideRectangle(rectX, rectY, pointX, pointY, width, height){
	return pointX < rectX + width && pointX > rectX && pointY < rectY + height && pointY > rectY;
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
 export function isInsideHexagon(hexX, hexY, pointX, pointY, radius) {
	const dx = Math.abs(hexX - pointX) / (radius * 2);
	const dy = Math.abs(hexY - pointY) / (radius * 2);
	const a = 0.25 * Math.sqrt(3.0);

	return dx <= a && a * dy + 0.25 * dx <= 0.5 * a;
}

/**
 * Check if a point is within given list of verticies
 * 
 * @param {*} nvert Number of vertices in the polygon. Whether to repeat the first vertex at the end is discussed below.
 * @param {*} vertx Arrays containing the x-coordinates of the polygon's vertices.
 * @param {*} verty Arrays containing the y-coordinates of the polygon's vertices.
 * @param {*} testx x-coordinate of the test point.
 * @param {*} testy y-coordinate of the test point.
 * @returns 
 */
export function isInsidePolygon( nvert, vertx, verty, testx, testy ) {
	var i, j, c = false;
	for( i = 0, j = nvert-1; i < nvert; j = i++ ) {
		if( ( ( verty[i] > testy ) != ( verty[j] > testy ) ) &&
			( testx < ( vertx[j] - vertx[i] ) * ( testy - verty[i] ) / ( verty[j] - verty[i] ) + vertx[i] ) ) {
				c = !c;
		}
	}
	return c;
}

export function cubeToEvenr(x, z) {
	let col = x + (z + (z&1)) / 2;
	let row = z;

	return {x: col, y: row};
}

export function evenrToCube(row, col){
	let cubeX = col - (row + (row&1)) / 2;
	let cubeZ = row;
	let cubeY = -cubeX - cubeZ;

  let x = Math.sign(cubeX) == "-0" ? 0 : cubeX;
  let y = Math.sign(cubeY) == "-0" ? 0 : cubeY;
  let z = Math.sign(cubeZ) == "-0" ? 0 : cubeZ;

	return {x: x, y: y, z: z};
}

export function cubeDistance(a, b) {
	return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y), Math.abs(a.z - b.z));
}

/**
 * Given a tile cube coordinate and range
 * return tile coordinates within range
 */
export function tilesInRange(tile, n) {
	let results = [];
	
	for(let x=-n; x <= n; x++) {
		for(let y = Math.max(-n, -x-n); y <= Math.min(n, -x+n); y++){
			let z = -x -y;
			results.push({x: x+tile.x, y: y+tile.y, z: z+tile.z});
		}
	}

	return results;
}

/**
 * Used for calculating movement range
 * 
 * @param {*} tile 
 * @param {*} n 
 * @returns 
 */
export function getTilesInRange(tile, n) {
  let results = {};
	
	for(let x=-n; x <= n; x++) {
    results[tile.x + x] = {};
		for(let y = Math.max(-n, -x-n); y <= Math.min(n, -x+n); y++){
			let z = -x -y;

      results[tile.x + x][tile.y + y] = {};
      results[tile.x + x][tile.y + y][tile.z + z] = Number.MAX_VALUE;
		}
	}

	return results;
}

/**
 * Given center point, starting point and end point,
 * find an angle to be used to make arc to the given end point
 * @param {*} p1 
 * @param {*} p2 
 * @param {*} p3 
 * @returns 
 */
export function arcToPoint(p1, p2, c1) {
	const diffX = p1.x - c1.x;
    const diffY = p1.y - c1.y;
    const radius = Math.abs(Math.sqrt(diffX*diffX + diffY*diffY));
    const startAngle = Math.atan2(diffY, diffX);
    const endAngle   = Math.atan2(p2.y - c1.y, p2.x - c1.x);

	return {rad: radius, start: startAngle, end: endAngle};
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