export function lerp(a: number, b: number, alpha: number) {
	return a + alpha * ( b - a );
}

export function degreesToRadians(degrees: number) {
	return degrees * ( Math.PI / 180 );
}

export function radiansToDegrees(radians: number) {
	return radians * ( 180 / Math.PI );
}

export function distance(x1: number, y1: number, x2: number, y2: number) {
	const dX = x2 - x1;
	const dY = y2 - y1;

	return Math.sqrt(dX * dX + dY * dY);
}

export function clamp(min: number, max: number, value: number) {
	return Math.min(Math.max(value, min), max);
}
