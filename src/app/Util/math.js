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
