import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
const { TextArea } = Input;

export const AddNoteModal = ({ isModalVisible, onClose, onSubmit, form }) => {
	const { getFieldDecorator } = form;

	return (
		<Modal
			title="Add new note"
			visible={isModalVisible}
			onCancel={onClose}
			footer={[
				<Button
					key="submit"
					type="primary"
					onClick={event => {
						event.preventDefault();
						form.validateFields((err, values) => {
							if (err) {
								return;
							}
							onSubmit(values);
						});
					}}
					htmlType="submit"
					className="login-form-button"
				>
					Create!
				</Button>
			]}
		>
			<Form className="login-form">
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
