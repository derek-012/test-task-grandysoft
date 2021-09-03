class Point {
	constructor(x = -1, y = -1) {
		this.x = x;
		this.y = y;
	}

	static createPointFromEvent(event) {
		return new Point(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
	}

	static isPoint(point) {
		return point instanceof Point;
	}

	compare(point) {
		return point.x === this.x && point.y === this.y;
	}
}

export default Point;