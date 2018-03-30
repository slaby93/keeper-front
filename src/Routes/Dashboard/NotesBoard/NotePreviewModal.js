import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
const { TextArea } = Input;

export const NotePreviewModal = ({ isModalVisible, onClose, title, body }) => {
	return (
		<Modal title="Add new note" visible={isModalVisible} onCancel={onClose}>
			<span>title: {title}</span>
			<span>body: {body}</span>
		</Modal>
	);
};

export default NotePreviewModal;
