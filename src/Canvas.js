import React from "react";
import Point from "./Point.js";
import Line from "./Line.js";
import CollisionPoint from "./CollisionPoint.js";

const FPS = 1000 / 60;
const SCALE = 1 / (60 * 3);
const COLLAPETIME = 3000;

class CanvasComponent extends React.Component {

	constructor(props) {
		super(props);

		// Инициализация обработчиков действий
		this.handleClick = this.handleClick.bind(this);
		this.mouseMove = this.mouseMove.bind(this);
		this.contextMenu = this.contextMenu.bind(this);
		this.handleCollapse = this.handleCollapse.bind(this);
		
		this.state = {
			lines: [],
			temp: {
				beginPoint: new Point(),
				endPoint: new Point(),
			},
			drawing: false,
			collapse: false
		}


		// Получения объекта canvas
		this.lineCanvas = null;

		this.setLineCanvasRef = (canvas) => {
			this.lineCanvas = canvas;
		}

		this.timerId = null;
	}

	handleClick(e) {
		// Пока происходит удаление линий рисование не допускается
		if (this.state.collapse)
			return;

		// Проверка на рисование
		if (!this.state.drawing) {
			// Сохранение начальной точки линии
			const point = Point.createPointFromEvent(e);
			this.setState({
				temp: {
					beginPoint: point,
					endPoint: point
				},
				drawing: true
			});

		} else {
			// Сохранение конечной точки линии по второму нажатию левой кнопки мыши
			const endPoint = Point.createPointFromEvent(e);

			const line = new Line(this.state.temp.beginPoint, endPoint);

			this.setState((state) => {
				return {
					lines: [...state.lines, line],
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
		// Отмена рисования при нажатии правой кнопки мыши
		if (this.state.drawing)
			this.setState({drawing: false});
	}

	mouseMove(e) {
		// Обновление предполагаемой линии при перемещении курсора мыши
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
			// Отрисовка линий
			ctx.clearRect(0, 0, this.props.width, this.props.height);
			if (this.state.lines) {
				this.state.lines.forEach((line) => {
					// Если была нажата копка "Collapse lines", линии уменьшаются за каждый кадр до момента удалению
					if (this.state.collapse){
						line.scale();
					}
					line.draw(ctx);
				});
			}


			// Отрисовка пересечений линий
			if (this.state.lines.length > 1) {
				const lines = this.state.lines;
				for (let i = 1; i < lines.length; i++) {
					for (let j = 0; j < i; j++) {
						let result = lines[i].cross(lines[j]);
						if (CollisionPoint.isCollisionPoint(result))
							result.draw(ctx);
					}
				}
			}

			// Отрисовка линии, которую пользователь хочет создать, вместе с поиском пересечений для нее
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
		}, FPS);
	}

	componentWillUnmount() {
		clearInterval(this.timerId);
	}

	handleCollapse(e) {
		// Инициализация удаления линий
		if (this.state.lines.length > 0) {
			this.state.lines.forEach((l) => l.setScale(SCALE));
			this.setState({
				collapse: true
			});
			setTimeout(() => {
				this.setState({
					lines: [],
					temp: {
						beginPoint: new Point(),
						endPoint: new Point()
					},
					drawing: false,
					collapse: false
				})
			}, COLLAPETIME);
		}
		
	}

	render() {
		return <div className="wrap-canvas">
				<canvas className="canvas" ref={this.setLineCanvasRef} onClick={this.handleClick} onMouseMove={this.mouseMove} onContextMenu={this.contextMenu} width={this.props.width} height={this.props.height}/>
				<button className="button" onClick={this.handleCollapse}>collapse lines</button>
			</div>;
	}
}

export default CanvasComponent;