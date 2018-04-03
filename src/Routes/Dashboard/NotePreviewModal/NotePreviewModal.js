import React from 'react';
import AddNewCommentForm from './AddNewCommentForm';
import EditNoteDetailsForm from './EditNoteDetailsForm';
import styled from 'styled-components';
import { Modal, Button, List, Avatar, Divider } from 'antd';

export const NotePreviewModal = ({ isModalVisible, onClose, onPostComment, note }) => {
	return (
		<Modal
			visible={isModalVisible}
			onCancel={onClose}
			footer={[
				<Button key="back" onClick={onClose}>
					Close
				</Button>
			]}
		>
			<Divider>Note</Divider>
			<EditNoteDetailsForm note={note} />
			<Divider>Comments</Divider>
			<CommentsSection>
				<List
					itemLayout="horizontal"
					dataSource={note.comments}
					renderItem={item => (
						<List.Item>
							<List.Item.Meta
								avatar={
									<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
								}
								title={item.title}
								description={item.body}
							/>
						</List.Item>
					)}
				/>
				<AddNewCommentForm onPostComment={onPostComment} />
			</CommentsSection>
		</Modal>
	);
};

const CommentsSection = styled.div`
	max-height: 250px;
	overflow-y: auto;
`;

export default NotePreviewModal;
