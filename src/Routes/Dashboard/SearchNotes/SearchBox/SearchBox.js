import React from 'react';
import { Form, Select, Input } from 'antd';

export class SearchBox extends React.PureComponent {
	onChange = () => {
		const { form, onFiltersChange } = this.props;
		form.validateFields((err, values) => {
			onFiltersChange(values);
		});
	};

	onSelectChange = (state) => {
		const { form, onFiltersChange } = this.props;
		form.validateFields((err, values) => {
			onFiltersChange({ ...values, state });
		});
	}

	render() {
		const { form: { getFieldDecorator } } = this.props;
		return (
			<div>
				<Form onChange={this.onChange} className="login-form">
					<Form.Item>{getFieldDecorator('title')(<Input placeholder="Title" />)}</Form.Item>
					<Form.Item>
						{getFieldDecorator('state')(
							<Select onChange={this.onSelectChange} placeholder="State" allowClear>
								<Select.Option value="active">Active</Select.Option>
								<Select.Option value="archived">Archived</Select.Option>
								<Select.Option value="complete">Complete</Select.Option>
							</Select>
						)}
					</Form.Item>
				</Form>
			</div>
		);
	}
}

const WrappedSearchBox = Form.create()(SearchBox);

export default WrappedSearchBox;
