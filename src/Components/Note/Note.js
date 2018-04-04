import React from 'react';
import Draggable from 'react-draggable';
import styled, { css } from 'styled-components';
import { Card, Icon, Popover, Popconfirm } from 'antd';
import { prop, ifProp } from 'styled-tools'
import { CirclePicker } from 'react-color';
const { Meta } = Card;

export class Note extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			isHovered: false,
			bgColor: 'white'
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
		const { onClick, title, body, id } = this.props;
		onClick({ title, body, id });
	};

	handleRemoveClick = event => {
		event.stopPropagation();
		const { onRemove, id } = this.props;
		onRemove(id);
	};

	handleChangeColor = ({hex}, event)=>{
		event.persist()
		this.setState({
			bgColor: hex
		})
	}

	render() {
		const {isHovered, bgColor} = this.state
		const { className, title, body } = this.props;
		return (
			<Draggable axis="both" handle=".handle" defaultPosition={{ x: 0, y: 0 }} position={null} grid={[25, 25]}>
				<Card
				  style={{backgroundColor:bgColor}}
					onMouseOver={this.onMouseOver}
					onMouseLeave={this.onMouseLeave}
					onClick={this.handleClick}
					className={`${className} handle`}
				>
					<Meta title={title} description={body} />
					<NoteOverlay onClick={event => event.stopPropagation()}  visible={isHovered}>
						<NoteOverlayBottomOptions>
							<Popover trigger="hover" placement="top" content={<CirclePicker onChangeComplete={ this.handleChangeColor }/>}>
								<Icon type="eye" onClick={event => event.stopPropagation()} />
							</Popover>
							<Popconfirm title="Are you sure delete this note?" placement="bottom" onConfirm={this.handleRemoveClick} okText="Yes" cancelText="No">
								<Icon type="delete" />
  						</Popconfirm>
						</NoteOverlayBottomOptions>
					</NoteOverlay>
				</Card>
			</Draggable>
		);
	}
}
const NoteOverlay = styled.div`
	opacity: 0;
	position: absolute;
	left: 0;
	top: 0;
	transition: opacity .2s linear;
	${ifProp('visible', css`
			opacity: 1;
  `)}
`

const NoteOverlayBottomOptions = styled.div`
  bottom: 0;
  position: fixed;
	padding: 10px;
  width: 100%;
	font-size: 20px;
	
	i {
		cursor: pointer;
		&:hover{ 
			color: black;
		}
		&:not(:last-of-type) {
			margin-right: 10px;
		}
	}
	
`

const StyledNote = styled(Note)`
	margin: 10px;
	position: relative;
	&:hover {
		box-shadow: 0px 0px 10px 1px #a7a7a7;
	}
	& > .ant-card-body {
		width: 250px;
		height: 250px;
	}
`;

export default StyledNote;
