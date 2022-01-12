/**
 * Given x, y position of the tile,
 * return the actual pixel position of tile in canvas
 *
 * @param {*} x
 * @param {*} y
 * @param {*} r
 */
export function evenrToPixel(x: number, y: number, r: number) {
  let canvasX = r * Math.sqrt(3) * (x - 0.5 * (y & 1));
  let canvasY = ((r * 3) / 2) * y;

  return { x: canvasX, y: canvasY };
}

/**
 * Given x, z position of the tile and radius r,
 * return the actual pixel position of tile in canvas
 *
 * @param {*} x
 * @param {*} y
 * @param {*} r
 */
export function cubeToPixel(x: number, z: number, r: number) {
  let canvasX = r * (Math.sqrt(3) * x + (Math.sqrt(3) / 2) * z);
  let canvasY = r * ((3 / 2) * z);

  return { x: canvasX, y: canvasY };
}

/**
 * Convert cube coordinate to evenr coordinate
 * 
 * @param x 
 * @param z 
 * @returns 
 */
export function cubeToEvenr(x: number, z: number) {
  let col = x + (z + (z & 1)) / 2;
  let row = z;

  return { x: col, y: row };
}

/**
 * Convert evenr coordinate to cube coordinate
 * 
 * @param x 
 * @param y 
 * @returns 
 */
export function evenrToCube(x: number, y: number) {
  let cubeX = x - (y + (y & 1)) / 2;
  let cubeZ = y;
  let cubeY = -cubeX - cubeZ;

  // let x = Math.sign(cubeX) == "-0" ? 0 : cubeX;
  // let y = Math.sign(cubeY) == "-0" ? 0 : cubeY;
  // let z = Math.sign(cubeZ) == "-0" ? 0 : cubeZ;

  return { x: cubeX, y: cubeY, z: cubeZ };
}