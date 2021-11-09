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
	return pointX < rectX + width/2 && pointX > rectX - width/2 && pointY < rectY + height/2 && pointY > rectY - height/2;
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

	return {x: cubeX, y: cubeY, z: cubeZ};
}

export function cubeDistance(a, b) {
	return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y), Math.abs(a.z - b.z));
}

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