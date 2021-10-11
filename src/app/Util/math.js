export function isInsideCircle(circleX, circleY, posX, posY, radius){
	return Math.hypot(circleX - posX, circleY - posY) < radius;
}