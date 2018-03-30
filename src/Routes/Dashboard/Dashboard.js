import React from 'react';
import styled from 'styled-components';
import Note from './../../Components/Note';
import AddNoteModal from './AddNoteModal';
import { Button, Icon } from 'antd';

export class Dashboard extends React.PureComponent {
	render() {
		const { toggleModal, isModalVisible, onAddNoteModalSubmit } = this.props;
		return (
			<NotesBoard>
				<AddNoteButton onClick={toggleModal} type="primary" shape="circle" icon="plus" size="large" />
				<AddNoteModal isModalVisible={isModalVisible} onSubmit={onAddNoteModalSubmit} onClose={toggleModal} />
				<Note title="Test1" body="test2" />
			</NotesBoard>
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

const NotesBoard = styled.div`
	background-color: #ececec;
	padding: 30px;
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
`;

export default Dashboard;
