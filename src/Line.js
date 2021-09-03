import Collision from "./collision.js";

class Line {
	constructor(begin, end) {
		this.begin = begin;
		this.end = end;
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
}

export default Line;