import React from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';
import { Card } from 'antd';
const { Meta } = Card;

export const Note = ({ className, title, body }) => {
	return (
		<Draggable
			axis="both"
			handle=".handle"
			defaultPosition={{ x: 0, y: 0 }}
			position={null}
			grid={[25, 25]}
			onStart={this.handleStart}
			onDrag={this.handleDrag}
			onStop={this.handleStop}
		>
			<Card className={`${className} handle`}>
				<Meta title={title} description={body} />
			</Card>
		</Draggable>
	);
};

const StyledNote = styled(Note)`
	width: 230px;
	height: 250px;
`;

export default StyledNote;
