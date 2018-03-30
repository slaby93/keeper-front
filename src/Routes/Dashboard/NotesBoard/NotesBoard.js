import React from 'react';
import styled from 'styled-components';
import Note from './../../../Components/Note';
import NotePreviewModal from './NotePreviewModal';
export class NotesBoard extends React.PureComponent {
	parseDataToNotes = notesList => {
		const { onNoteClick } = this.props;
		return (
			notesList &&
			notesList.map(({ title, body }, index) => {
				return <Note onClick={onNoteClick} key={index} title={title} body={body} />;
			})
		);
	};

	render() {
		const { className, notesList, isModalVisible, toggleModal } = this.props;
		const parsedNotes = this.parseDataToNotes(notesList);
		return (
			<div className={className}>
				{parsedNotes}
				<NotePreviewModal onClose={toggleModal} isModalVisible={isModalVisible} />
			</div>
		);
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
