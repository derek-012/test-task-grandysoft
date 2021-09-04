class Point {
	constructor(x = -1, y = -1) {
		this.x = x;
		this.y = y;

		this.scaleX = 0;
		this.scaleY = 0;
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

	setScale(x, y) {
		this.scaleX = x;
		this.scaleY = y;
	}

	hasScale() {
		return this.scaleX === 0 && this.scaleY === 0;
	}

	scale() {
		if (this.hasScale) {
			this.x += this.scaleX;
			this.y += this.scaleY;
			console.log(`x = ${this.x}; y = ${this.y}; scaleX = ${this.scaleX}; scaleY = ${this.scaleY}`);
		}
	}

	clear() {
		this.x = -1;
		this.y = -1;

		this.scaleX = 0;
		this.scaleY = 0;
	}
}

export default Point;