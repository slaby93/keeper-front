import React from 'react';
import { Form, Input, Button } from 'antd';

const AddNewCommentForm = Form.create()(({ form, onPostComment }) => {
	const { getFieldDecorator } = form;

	return (
		<Form
			onSubmit={event => {
				event.preventDefault();
				form.validateFields((err, values) => {
					if (err) {
						return;
					}
					onPostComment(values, form);
				});
			}}
		>
			<Form.Item>
				{getFieldDecorator('commentBody', {
					rules: [{ required: true, message: 'Please input note comment!' }]
				})(<Input placeholder="Comment" />)}
			</Form.Item>
			<Button key="submit" type="primary" htmlType="submit">
				Post comment!
			</Button>
		</Form>
	);
});

export default AddNewCommentForm;
