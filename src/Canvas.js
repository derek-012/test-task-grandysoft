import React from "react";
////import Collision from "./collision.js";

class CanvasComponent extends React.Component {

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.mouseMove = this.mouseMove.bind(this);
		this.contextMenu = this.contextMenu.bind(this);
		
		this.state = {
			lines: [],
			temp: {
				beginPoint: { x: -1, y: -1 },
				endPoint: { x: -1, y: -1 },
			},
			drawing: false
		}

		console.log(this);

		this.lineCanvas = null;

		this.setLineCanvasRef = (canvas) => {
			this.lineCanvas = canvas;
		}
	}

	getPoint(e) {
		return { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
	}

	createLine(begin, end) {
		return {
			begin: begin,
			end: end
		};
	}

	handleClick(e) {

		if (!this.state.drawing) {
			const point = this.getPoint(e);
			this.setState({
				temp: {
					beginPoint: point,
					endPoint: point
				},
				drawing: true
			});

		} else {
			// const endPoint = {
			// 	x: e.nativeEvent.offsetX,
			// 	y: e.nativeEvent.offsetY
			// };

			

			// const line = {
			// 	begin: this.state.temp.beginPoint,
			// 	end: endPoint
			// };

			const endPoint = this.getPoint(e);

			const line = this.createLine(this.state.temp.beginPoint, endPoint);

			this.setState((state) => {
				return {
					lines: [...state.lines, line],
					temp: {
						beginPoint: {
							x: -1,
							y: -1
						},
						endPoint: {
							x: -1,
							y: -1
						}
					},
					drawing: false
				}
			});
		}
	}

	contextMenu(e) {
		if (this.state.drawing)
			this.setState({drawing: false});
	}

	mouseMove(e) {
		if (this.state.drawing) {
			this.setState((state) => {
				return {
					temp: {
						beginPoint: state.temp.beginPoint,
						endPoint: this.getPoint(e),
						drawing: state.temp.drawing
					}
				};
			})
		}
	}

	updateCanvas() {
		//this.context.clearRect(0, 0, this.props.width, this.props.height);
		
	}

	componentDidMount() {
		const ctx = this.lineCanvas.getContext('2d');
		this.timerId = setInterval(() => {
			ctx.clearRect(0, 0, this.props.width, this.props.height);
			if (this.state.lines) {
				this.state.lines.forEach((line) => {
					ctx.beginPath();
					ctx.moveTo(line.begin.x, line.begin.y);
					ctx.lineTo(line.end.x, line.end.y);
					ctx.stroke();
				})
			}

			if (this.state.drawing) {
				ctx.beginPath();
				ctx.moveTo(this.state.temp.beginPoint.x, this.state.temp.beginPoint.y);
				ctx.lineTo(this.state.temp.endPoint.x, this.state.temp.endPoint.y);
				ctx.stroke();
			}
		
		}, 1000 / 60);
	}

	getCollision(line1, line2) {

	}

	render() {
		//console.log(this.state);
		return <canvas className="canvas" ref={this.setLineCanvasRef} onClick={this.handleClick} onMouseMove={this.mouseMove} onContextMenu={this.contextMenu} width={this.props.width} height={this.props.height}/>;
	}
}

// export default CanvasComponent;

// class CanvasComponent extends React.Component {
// 	constructor() {
// 		super();
// 		this.canvas = null;
// 		this.getCanvas = (el) => {
// 			this.canvas = el;
// 		}
// 	}

//     componentDidMount() {
//         this.updateCanvas();
//     }
//     updateCanvas() {
//         const ctx = this.canvas.getContext('2d');
//         ctx.fillRect(0,0, 100, 100);
//         ctx.beginPath();
// 		ctx.moveTo(5, 5);
// 		ctx.lineTo(34, 234);
// 		ctx.stroke();
//     }
//     render() {
//         return (
//             <canvas ref={this.getCanvas} width={300} height={300}/>
//         );
//     }
// }
//ReactDOM.render(<CanvasComponent/>, document.getElementById('container'));

export default CanvasComponent;