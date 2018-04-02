import React from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';
import { Card, Icon } from 'antd';
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
		const { onClick, title, body } = this.props;
		onClick({ title, body });
	};

	handleRemoveClick = event => {
		event.stopPropagation();
		const { onRemove, id } = this.props;
		onRemove(id);
	};

	render() {
		const { className, title, body } = this.props;
		return (
			<Draggable axis="both" handle=".handle" defaultPosition={{ x: 0, y: 0 }} position={null} grid={[25, 25]}>
				<Card
					onMouseOver={this.onMouseOver}
					onMouseLeave={this.onMouseLeave}
					onClick={this.handleClick}
					className={`${className} handle`}
					actions={[<Icon onClick={this.handleRemoveClick} type="delete" />]}
				>
					<Meta title={title} description={body} />
				</Card>
			</Draggable>
		);
	}
}

const StyledNote = styled(Note)`
	margin: 10px;
	&:hover {
		box-shadow: 0px 0px 10px 1px #a7a7a7;
	}
	& > .ant-card-body {
		width: 250px;
		height: 250px;
	}
`;

export default StyledNote;
