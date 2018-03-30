import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
const { TextArea } = Input;

export const NotePreviewModal = ({ isModalVisible, onClose, data: { title, body } }) => {
	return (
		<Modal title={title} visible={isModalVisible} onCancel={onClose}>
			<p>{body}</p>
		</Modal>
	);
};

export default NotePreviewModal;
