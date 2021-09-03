import React from "react";
import Point from "./Point.js";
import Line from "./Line.js";

class CanvasComponent extends React.Component {

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.mouseMove = this.mouseMove.bind(this);
		this.contextMenu = this.contextMenu.bind(this);
		
		this.state = {
			lines: [],
			collisions: [],
			temp: {
				beginPoint: new Point(),
				endPoint: new Point(),
			},
			drawing: false
		}

		this.lineCanvas = null;

		this.setLineCanvasRef = (canvas) => {
			this.lineCanvas = canvas;
		}
	}

	handleClick(e) {
		if (!this.state.drawing) {
			const point = Point.createPointFromEvent(e);
			this.setState({
				temp: {
					beginPoint: point,
					endPoint: point
				},
				drawing: true
			});

		} else {
			const endPoint = Point.createPointFromEvent(e);

			const line = new Line(this.state.temp.beginPoint, endPoint);

			let collisions = [];
			if (this.state.lines.length > 0) {
				this.state.lines.forEach((l) => {
					let result = line.cross(l);
					if (Point.isPoint(result))
						collisions.push(result);
				});
			}

			this.setState((state) => {
				return {
					lines: [...state.lines, line],
					collisions: [...state.collisions, ...collisions],
					temp: {
						beginPoint: new Point(),
						endPoint: new Point()
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
						endPoint: Point.createPointFromEvent(e),
						drawing: state.temp.drawing
					}
				};
			})
		}
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

			if (this.state.collisions) {
				this.state.collisions.forEach((collision) => {
					ctx.beginPath();
					ctx.fillStyle = "#FA3B1D";
					ctx.arc(collision.x, collision.y, 15, 0, 2 * Math.PI);
					ctx.fill();
					ctx.stroke();
				});
			}

			if (this.state.drawing) {
				ctx.beginPath();
				ctx.moveTo(this.state.temp.beginPoint.x, this.state.temp.beginPoint.y);
				ctx.lineTo(this.state.temp.endPoint.x, this.state.temp.endPoint.y);
				ctx.stroke();
			}
		
		}, 1000 / 60);
	}

	render() {
		return <canvas className="canvas" ref={this.setLineCanvasRef} onClick={this.handleClick} onMouseMove={this.mouseMove} onContextMenu={this.contextMenu} width={this.props.width} height={this.props.height}/>;
	}
}

export default CanvasComponent;