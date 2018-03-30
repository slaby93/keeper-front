import React from 'react';
import styled from 'styled-components';
import AddNoteModal from './AddNoteModal';
import SearchNotes from './SearchNotes';
import { Button } from 'antd';
import NotesBoard from './NotesBoard';
export class Dashboard extends React.PureComponent {
	render() {
		const { toggleModal, isModalVisible, onAddNoteModalSubmit } = this.props;
		return (
			<div>
				<AddNoteButton onClick={toggleModal} type="primary" shape="circle" icon="plus" size="large" />
				<SearchNotes />
				<AddNoteModal isModalVisible={isModalVisible} onSubmit={onAddNoteModalSubmit} onClose={toggleModal} />
				<NotesBoard />
			</div>
		);
	}
}
const AddNoteButton = styled(Button)`
	--distance: 5%;
	position: fixed;
	top: var(--distance);
	right: var(--distance);
	z-index: 123;
`;

export default Dashboard;
