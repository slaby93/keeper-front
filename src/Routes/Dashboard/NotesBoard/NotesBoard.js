import React from 'react';
import { Spin } from 'antd';
import styled, { css } from 'styled-components';
import { prop, ifProp, switchProp } from 'styled-tools';
import Note from './../../../Components/Note';
import NotePreviewModal from './NotePreviewModal';

export class NotesBoard extends React.PureComponent {
	parseDataToNotes = notesList => {
		const { onNoteClick, onNoteRemove } = this.props;
		return (
			notesList &&
			notesList.map(({ title, body, id }) => {
				return (
					<Note onClick={onNoteClick} onRemove={onNoteRemove} key={id} id={id} title={title} body={body} />
				);
			})
		);
	};

	render() {
		const { className, notesList, isModalVisible, toggleModal, modalData, isLoading } = this.props;
		const parsedNotes = this.parseDataToNotes(notesList);
		return (
			<Spin spinning={isLoading}>
				<div className={className}>
					{parsedNotes}
					{isModalVisible &&
						modalData && (
							<NotePreviewModal data={modalData} onClose={toggleModal} isModalVisible={isModalVisible} />
						)}
				</div>
			</Spin>
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

	${ifProp('isLoading', css``)};
`;

export default StyledNotesBoard;
