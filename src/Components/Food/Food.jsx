import React from 'react';

export default (props) => {
	const foodDot = props.foodDot;
	const style = {
		left: `${foodDot[0]}%`,
		 top: `${foodDot[1]}%`			
	}
	return (
		<div>
			<div className='game-snake-food' style={style}></div>
		</div>
	)
}