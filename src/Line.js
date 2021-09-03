import Collision from "./collision.js";
import Point from "./Point.js";

class Line {
	constructor(begin, end) {
		this.begin = begin;
		this.end = end;
		this.center = null;
	}

	setEndPoint(point) {
		this.end = point;
	}

	calculateCenter() {
		const x = (this.begin.x + this.end.x) / 2;
		const y = (this.begin.y + this.end.y) / 2;
		this.center = new Point(x, y);
	}

	cross(line) {
		return Collision.getCollision(this, line);
	} 

	draw(ctx) {
		ctx.beginPath();
		ctx.moveTo(this.begin.x, this.begin.y);
		ctx.lineTo(this.end.x, this.end.y);
		ctx.stroke();
	}

	scalePoint(point, center, percent) {
		point.x += Math.abs((point.x - center.x) * percent) * (point.x > center.x ? -1 : 1);
		point.y += Math.abs((point.y - center.y) * percent) * (point.y > center.y ? -1 : 1);
	}

	scale(percent) {
		if (!this.center)
			this.calculateCenter();

		this.scalePoint(this.begin, this.center, percent);
		this.scalePoint(this.end, this.center, percent);
	}

	compare(line) {
		return this.begin.compare(line.begin) && this.end.compare(line.end);
	}

}

export default Line;