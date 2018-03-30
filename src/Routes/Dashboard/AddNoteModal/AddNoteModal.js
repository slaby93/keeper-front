import React from 'react';
import { Modal, Button, Icon } from 'antd';

export const AddNoteModal = ({ isModalVisible, onClose, onSubmit }) => {
	return (
		<Modal title="Basic Modal" visible={isModalVisible} onOk={onSubmit} onCancel={onClose}>
			<p>Some contents...</p>
			<p>Some contents...</p>
			<p>Some contents...</p>
		</Modal>
	);
};

export default AddNoteModal;
