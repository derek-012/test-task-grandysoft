// class Collision {
// 	static getCollision(line1, line2) {
// 		const EPS = 0.000001;

// 		const x1 = line1.begin.x;
// 		const y1 = line1.begin.y;
// 		const x2 = line1.end.x;
// 		const y2 = line1.end.y;

// 		const x3 = line2.begin.x;
// 		const y3 = line2.begin.y;
// 		const x4 = line2.end.x;
// 		const y4 = line2.end.y;

// 		let denom  = (y4-y3) * (x2-x1) - (x4-x3) * (y2-y1);
//    		let numera = (x4-x3) * (y1-y3) - (y4-y3) * (x1-x3);
//    		let numerb = (x2-x1) * (y1-y3) - (y2-y1) * (x1-x3);

//    		let x;
//    		let y;

//    		if (abs(numera) < EPS && abs(numerb) < EPS && abs(denom) < EPS) {
//       		x = (x1 + x2) / 2;
//       		y = (y1 + y2) / 2; 
//       		return [x, y];
//    		}

//    		if (abs(denom) < EPS) {
//       		return false;
//    		}

//    		const mua = numera / denom;
//    		const mub = numerb / denom;

//    		if (mua < 0 || mua > 1 || mub < 0 || mub > 1) {
//       		return false;
//    		}

//    		x = x1 + mua * (x2 - x1);
//    		y = y1 + mua * (y2 - y1);
//    		return [x, y];
// 	}
// }

// export default Collision;