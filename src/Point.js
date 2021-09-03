class Point {
	constructor() {
		this.x = -1;
		this.y = -1;
	}
	
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	static createPointFromEvent(event) {
		return new Point(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
	}
}