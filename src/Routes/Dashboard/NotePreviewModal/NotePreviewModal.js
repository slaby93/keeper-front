import React from 'react';
import AddNewCommentForm from './AddNewCommentForm';
import EditNoteDetailsForm from './EditNoteDetailsForm';
import styled from 'styled-components';
import { Modal, Button,Tag, List, Avatar, Divider, Icon } from 'antd';

export const NotePreviewModal = ({ isModalVisible, onClose,onEditNote, onPostComment,onRemoveComment, note }) => {
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
			<Divider>Note (id: {note.id})</Divider>
			<EditNoteDetailsForm note={note} onEditNote={onEditNote}/>
			<Divider>Comments</Divider>
			<CommentsSection>
				<List
					itemLayout="horizontal"
					dataSource={note.comments}
					renderItem={item => (
						<List.Item actions={[<Icon onClick={() =>  onRemoveComment(item)} type="delete" />]}>
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
			<Divider>Tags</Divider>
			<div>
				<Tag>1</Tag>
				<Tag>2</Tag>
				<Tag>3</Tag>
				<Tag>4</Tag>
				<Tag>5</Tag>
			</div>

		</Modal>
	);
};

const CommentsSection = styled.div`
	max-height: 250px;
	overflow-y: auto;
`;

export default NotePreviewModal;
