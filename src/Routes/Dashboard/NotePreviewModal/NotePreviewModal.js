import React from 'react';
import styled from 'styled-components';
import { Modal, Form, Input, Button, List, Avatar, Divider } from 'antd';
const { TextArea } = Input;

export const NotePreviewModal = ({ isModalVisible, onClose, form, onPostComment, data: { title, body, id } }) => {
	const { getFieldDecorator } = form;
	const data = [
		{
			title: 'Ant Design Title 1'
		},
		{
			title: 'Ant Design Title 2'
		},
		{
			title: 'Ant Design Title 3'
		},
		{
			title: 'Ant Design Title 4'
		}
	];

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
			<Form
				onSubmit={event => {
					event.preventDefault();
					console.log('SUBMIT FORM INFO');
				}}
			>
				<Form.Item>
					{getFieldDecorator('title', {
						rules: [{ required: true, message: 'Please input title!' }],
						initialValue: title
					})(<Input type="textarea" placeholder="Title" />)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('body', {
						rules: [{ required: true, message: 'Please input body!' }],
						initialValue: body
					})(<TextArea type="textarea" placeholder="Body" />)}
				</Form.Item>
				<Button key="submit" type="primary" htmlType="submit">
					Submit
				</Button>
			</Form>
			<Divider>Comments</Divider>
			<CommentsSection>
				<List
					itemLayout="horizontal"
					dataSource={data}
					renderItem={item => (
						<List.Item>
							<List.Item.Meta
								avatar={
									<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
								}
								title={item.title}
								description="Ant Design, a design language for background applications, is refined by Ant UED Team"
							/>
						</List.Item>
					)}
				/>
				<Form
					onSubmit={event => {
						event.preventDefault();
						form.validateFields((err, values) => {
							if (err) {
								return;
							}
							onPostComment(values);
						});
					}}
				>
					<Form.Item>
						{getFieldDecorator('body', {
							rules: [{ required: true, message: 'Please input note comment!' }]
						})(<TextArea type="textarea" placeholder="Comment" />)}
					</Form.Item>
					<Button key="submit" type="primary" htmlType="submit">
						Post comment!
					</Button>
				</Form>
			</CommentsSection>
		</Modal>
	);
};

const CommentsSection = styled.div`
	max-height: 250px;
	overflow-y: auto;
`;

const WrappedNotePreviewModal = Form.create()(NotePreviewModal);

export default WrappedNotePreviewModal;
