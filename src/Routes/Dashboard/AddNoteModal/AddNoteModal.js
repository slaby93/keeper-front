import React from 'react';
import styled from 'styled-components';
import { Modal, Form, Input, Button } from 'antd';
const { TextArea } = Input;

export const AddNoteModal = ({ isModalVisible, toggleModal, onSubmit, form }) => {
	const { getFieldDecorator } = form;

	return (
		<React.Fragment>
			<AddNoteButton onClick={toggleModal} type="primary" shape="circle" icon="plus" size="large" />
			<Modal
				title="Add new note"
				visible={isModalVisible}
				onCancel={toggleModal}
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
								onSubmit(values, form);
							});
						}}
						htmlType="submit"
					>
						Create!
					</Button>
				]}
			>
				<Form>
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
		</React.Fragment>
	);
};
const AddNoteButton = styled(Button)`
	--distance: 5%;
	position: fixed;
	top: var(--distance);
	right: var(--distance);
	z-index: 123;
`;
const WrappedAddNoteForm = Form.create()(AddNoteModal);

export default WrappedAddNoteForm;
