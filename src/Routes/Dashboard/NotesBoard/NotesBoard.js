import React from 'react';
import styled from 'styled-components';
import Note from './../../../Components/Note';

export class NotesBoard extends React.PureComponent {
	render() {
		const { className } = this.props;
		return (
			<div className={className}>
				<Note title="Test1" body="test2" />
			</div>
		);
	}
}

const StyledNotesBoard = styled(NotesBoard)`
	background-color: #ececec;
	padding: 30px;
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
`;

export default StyledNotesBoard;
