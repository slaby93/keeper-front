import React from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';
import { Card } from 'antd';
const { Meta } = Card;

export class Note extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			isHovered: false
		};
	}

	onMouseOver = () => {
		this.setState({
			isHovered: true
		});
	};

	onMouseLeave = () => {
		this.setState({
			isHovered: false
		});
	};

	handleClick = () => {
		console.log('click');
	};

	render() {
		const { className, title, body } = this.props;
		return (
			<Draggable
				axis="both"
				handle=".handle"
				defaultPosition={{ x: 0, y: 0 }}
				position={null}
				grid={[25, 25]}
				onStart={this.handleStart}
				onDrag={(...args) => {
					console.log(args);
				}}
				onStop={this.handleStop}
			>
				<Card
					onClick={this.handleClick}
					onMouseOver={this.onMouseOver}
					onMouseLeave={this.onMouseLeave}
					className={`${className} handle`}
				>
					<Meta title={title} description={body} />
				</Card>
			</Draggable>
		);
	}
}

const StyledNote = styled(Note)`
	width: 250px;
	height: 250px;
	margin: 10px;
	&:hover {
		box-shadow: 0px 0px 10px 1px #a7a7a7;
	}
`;

export default StyledNote;
