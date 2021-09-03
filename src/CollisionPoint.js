import Point from "./Point.js";

class CollisionPoint {
	constructor(point) {
		this.point = point;
	}

	static isCollisionPoint(point) {
		return point instanceof CollisionPoint;
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = "#FA3B1D";
		ctx.arc(this.point.x, this.point.y, 5, 0, 2 * Math.PI);
		ctx.fill();
	}
}

export default CollisionPoint;