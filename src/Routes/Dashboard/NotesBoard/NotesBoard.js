import React from 'react';
import { Spin } from 'antd';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';
import Note from './../../../Components/Note';
import NotePreviewModal from './../NotePreviewModal';

export class NotesBoard extends React.PureComponent {
	parseDataToNotes = notesList => {
		const { onNoteClick, onNoteRemove } = this.props;
		return (
			notesList &&
			notesList.map(data => {
				return <Note onClick={() => onNoteClick(data.id)} onRemove={onNoteRemove} key={data.id} {...data} />;
			})
		);
	};

	render() {
		const { className, notesList, isModalVisible, toggleModal, noteID, isLoading } = this.props;
		const parsedNotes = this.parseDataToNotes(notesList);
		return (
			<Spin spinning={isLoading}>
				<div className={className}>
					{parsedNotes}
					{isModalVisible &&
						noteID && (
							<NotePreviewModal noteID={noteID} onClose={toggleModal} isModalVisible={isModalVisible} />
						)}
				</div>
			</Spin>
		);
	}
}

const StyledNotesBoard = styled(NotesBoard)`
	padding: 30px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	max-width: 100vw;
	overflow: hidden;
	align-items: flex-start;
	${ifProp('isLoading', css``)};
`;

export default StyledNotesBoard;
