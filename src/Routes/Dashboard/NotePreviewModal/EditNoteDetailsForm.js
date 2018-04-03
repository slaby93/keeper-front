import React from 'react';
import { Form, Input, Button } from 'antd';
const { TextArea } = Input;

const EditNoteDetailsForm = Form.create()(({ form, note: { title, body }, onEditNote }) => {
	const { getFieldDecorator } = form;

	return (
		<Form
			onSubmit={event => {
				event.preventDefault();
				form.validateFields((err, values) => {
					if (err) {
						return;
					}
					onEditNote(values, form);
				});
				
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
	);
});

export default EditNoteDetailsForm;
