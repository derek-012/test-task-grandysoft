import React from "react";
import Point from "./Point.js";
import Line from "./Line.js";
import CollisionPoint from "./CollisionPoint.js";

class CanvasComponent extends React.Component {

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.mouseMove = this.mouseMove.bind(this);
		this.contextMenu = this.contextMenu.bind(this);
		this.handleCollapse = this.handleCollapse.bind(this);
		
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
					if (CollisionPoint.isCollisionPoint(result))
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
					line.draw(ctx);
				});
			}

			if (this.state.collisions) {
				this.state.collisions.forEach((collision) => {
					collision.draw(ctx);
				});
			}

			if (this.state.drawing) {
				const tempLine = new Line(new Point(this.state.temp.beginPoint.x, this.state.temp.beginPoint.y), new Point(this.state.temp.endPoint.x, this.state.temp.endPoint.y));

				tempLine.draw(ctx);

				this.state.lines.forEach((line) => {
					const result = tempLine.cross(line);
					if (CollisionPoint.isCollisionPoint(result)) {
						result.draw(ctx);
					}
				});
			}
		
		}, 1000 / 60);
	}

	componentWillUnmount() {

	}

	handleCollapse(e) {
		console.log("COLLAPSE!!!");
	}

	render() {
		return <div className="wrap-canvas">
				<canvas className="canvas" ref={this.setLineCanvasRef} onClick={this.handleClick} onMouseMove={this.mouseMove} onContextMenu={this.contextMenu} width={this.props.width} height={this.props.height}/>
				<button className="button" onClick={this.handleCollapse}>collapse lines</button>
			</div>;
	}
}

export default CanvasComponent;