import React from 'react';
import styled from 'styled-components';
import Note from './../../../Components/Note';

export class NotesBoard extends React.PureComponent {
	parseDataToNotes = notesList => {
		return (
			notesList &&
			notesList.map(({ title, body }) => {
				return <Note key={title + body} title={title} body={body} />;
			})
		);
	};

	render() {
		const { className, notesList } = this.props;
		const parsedNotes = this.parseDataToNotes(notesList);
		return <div className={className}>{parsedNotes}</div>;
	}
}

const StyledNotesBoard = styled(NotesBoard)`
	background-color: #ececec;
	padding: 30px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	min-height: 100vh;
	max-width: 100vw;
	overflow: hidden;
`;

export default StyledNotesBoard;
