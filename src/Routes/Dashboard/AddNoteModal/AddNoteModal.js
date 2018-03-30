import React from 'react';
import { Modal, Form, Icon, Input, Button } from 'antd';
const { TextArea } = Input;

export const AddNoteModal = ({ isModalVisible, onClose, onSubmit, form }) => {
	const { getFieldDecorator } = form;

	return (
		<Modal
			title="Add new note"
			visible={isModalVisible}
			onOk={onSubmit}
			onCancel={onClose}
			footer={[
				<Button key="submit" type="primary" onClick={onSubmit} htmlType="submit" className="login-form-button">
					Create!
				</Button>
			]}
		>
			<Form onSubmit={onSubmit} className="login-form">
				<Form.Item>
					{getFieldDecorator('title', {
						rules: [{ required: true, message: 'Please input note title!' }]
					})(<Input placeholder="Title" />)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('body', {
						rules: [{ required: true, message: 'Please input note body!' }]
					})(<TextArea type="textarea" placeholder="Body" />)}
				</Form.Item>
			</Form>
		</Modal>
	);
};

const WrappedAddNoteForm = Form.create()(AddNoteModal);

export default WrappedAddNoteForm;
