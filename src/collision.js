import Point from "./Point.js";

class Collision {
	static getCollision(line1, line2) {
		 const EPS = 0.000001;

		const x1 = line1.begin.x;
		const y1 = line1.begin.y;
		const x2 = line1.end.x;
		const y2 = line1.end.y;

		const x3 = line2.begin.x;
		const y3 = line2.begin.y;
		const x4 = line2.end.x;
		const y4 = line2.end.y;

		let x;
		let y;

		let denom  = (y4-y3) * (x2-x1) - (x4-x3) * (y2-y1);
   		let numera = (x4-x3) * (y1-y3) - (y4-y3) * (x1-x3);
   		let numerb = (x2-x1) * (y1-y3) - (y2-y1) * (x1-x3);

  

   		if (Math.abs(numera) < EPS && Math.abs(numerb) < EPS && Math.abs(denom) < EPS) {
      		x = (x1 + x2) / 2;
      		y = (y1 + y2) / 2; 
      		return new Point(x, y);
   		}

   		if (Math.abs(denom) < EPS) {
      		return false;
   		}

   		const mua = numera / denom;
   		const mub = numerb / denom;

   		if (mua < 0 || mua > 1 || mub < 0 || mub > 1) {
      		return false;
   		}

   		x = x1 + mua * (x2 - x1);
   		y = y1 + mua * (y2 - y1);
   		return new Point(x, y); 

  		// let n;
    // 	if (y2 - y1 !== 0) {  // a(y)
    //     	let q = (x2 - x1) / (y1 - y2);   
    //     	let sn = (x3 - x4) + (y3 - y4) * q; 
    //     	if (!sn) {
    //     		return false;
    //     	}  // c(x) + c(y)*q
    //     	let fn = (x3 - x1) + (y3 - y1) * q;   // b(x) + b(y)*q
    //     	n = fn / sn;
    // 	} else {
    //     	if (!(y3 - y4)) {
    //     		return false;
    //     	}  // b(y)
    //     	n = (y3 - y1) / (y3 - y4);   // c(y)/b(y)
    // 	}
    // 	x = x3 + (x4 - x3) * n;  // x3 + (-b(x))*n
    // 	y = y3 + (y4 - y3) * n;  // y3 +(-b(y))*n
    // 	return new Point(x, y);
	}
}

export default Collision;