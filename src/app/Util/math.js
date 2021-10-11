export function isInsideCircle(circleX, circleY, posX, posY, radius){
	return Math.hypot(circleX - posX, circleY - posY) < radius;
}

export function cube_to_evenr(x, z) {
	let col = x + (z + (z&1)) / 2;
	let row = z;

	return {x: col, y: row};
}

export function evenr_to_cube(row, col){
	let cubeX = col - (row + (row&1)) / 2;
	let cubeZ = row;
	let cubeY = -cubeX - cubeZ;

	return {x: cubeX, y: cubeY, z: cubeZ};
}

export function cube_distance(a, b) {
	return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y), Math.abs(a.z - b.z));
}

export function tiles_in_range(tile, n) {
	let results = [];
	
	for(let x=-n; x <= n; x++) {
		for(let y = Math.max(-n, -x-n); y <= Math.min(n, -x+n); y++){
			let z = -x -y;
			results.push({x: x+tile.x, y: y+tile.y, z: z+tile.z});
		}
	}

	return results;
}