import React from 'react';

import Snake from 'Components/Snake';
import Food from 'Components/Food';

const getFoodRandomPlace = () => {
	let min = 1;
	let max = 98;

	let x = Math.floor((Math.random()*(max - min +1) + min)/2)*2;
	let y = Math.floor((Math.random()*(max - min +1) + min)/2)*2;

	return [x, y];
}

const initialState = {
	snakeDots: [
		[0, 0],
		[2, 0],
		[4, 0]
	],
	foodDot: getFoodRandomPlace(),
	direction: 'RIGHT',
	speed: 200
}

class App extends React.PureComponent {
	state = initialState;

	componentDidMount(){
		setInterval(this.moveSnake, this.state.speed)
		document.onkeydown = this.onKeyDown;
	}

	componentDidUpdate() {
		this.checkSnakeOutofBorder();
		this.checkSnakeCollapsed();		
		this.checkSnakeEatFood();
	}

	onKeyDown = (e) => {
		e = e || window.event;
		switch (e.keyCode) {
			default:
				this.setState({direction: 'RIGHT'});
				break;
			case 38:
				this.setState({direction: 'UP'});
				break;
			case 40:
				this.setState({direction: 'DOWN'});
				break;
			case 39:
				this.setState({direction: 'RIGHT'});
				break;
			case 37:
				this.setState({direction: 'LEFT'});
				break;
		}
	}

	moveSnake = () => {
		let snake = [...this.state.snakeDots];
		let head = snake[snake.length - 1];

		switch(this.state.direction){
			default:
				head = [head[0] + 2,  head[1]];
				break;
			case 'RIGHT':
				head = [head[0] + 2,  head[1]];
				break;
			case 'LEFT':
				head = [head[0] - 2,  head[1]];
				break;
			case 'UP':
				head = [head[0],  head[1] - 2];
				break;
			case 'DOWN':
				head = [head[0],  head[1] + 2];
				break;
		}
		snake.push(head);
		snake.shift();
		this.setState({snakeDots: snake})
	}

	getGameOver = () => {
		this.setState({speed: 1000000});
		alert(`'Game Over! '`);
		this.setState(initialState);
	}

	checkSnakeOutofBorder = () => {
		let snake = [...this.state.snakeDots];
		let head = snake[snake.length - 1];

		if(head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0){
			this.getGameOver();
		}
	}

	checkSnakeCollapsed = () =>{
		let snake = [...this.state.snakeDots];
		let head = snake[snake.length - 1];

		snake.pop();
		snake.forEach(dot => {
			if (dot[0] == head[0] && dot[1] == head[1]) {
				this.getGameOver();
			}
		})
	}

	checkSnakeEatFood = () => {
		let snake = [...this.state.snakeDots];
		let head = snake[snake.length - 1];
		let food = this.state.foodDot;

		if (head[0] == food[0] && head[1] == food[1]) {
			this.setState({foodDot: getFoodRandomPlace()});
			this.speedUp();
			this.enlargeSnake();
		}
	}

	enlargeSnake = () => {
		let newSnake = [...this.state.snakeDots];
		newSnake.unshift([]);
		this.setState({snakeDots: newSnake});
	}

	speedUp = () => {
		if (this.state.speed > 20) {
			this.setState({speed: this.state.speed - 20})
		}
	}

	render = () => {
		return <>
			<div className='game-area' onKeyDown={this.onKeyDown}>
				<Snake snakeDots={this.state.snakeDots} />
				<Food foodDot={this.state.foodDot} />
			</div>
		</>
	}
}

export default App; 