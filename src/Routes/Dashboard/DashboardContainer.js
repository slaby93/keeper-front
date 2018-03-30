import React from 'react';
import Dashboard from './Dashboard';
import Noty from 'noty';
import { graphql, compose } from 'react-apollo';
import addNewNoteMutation from './addNewNoteMutation.gql';

export class DashboardContainer extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			isModalVisible: false
		};
	}

	toggleModal = () => {
		const { isModalVisible } = this.state;
		this.setState({
			isModalVisible: !isModalVisible
		});
	};

	onAddNoteModalSubmit = async ({ title, body }) => {
		await this.props.addNewNoteMutation({
			variables: {
				title,
				body
			}
		});
		new Noty({
			type: 'success',
			theme: 'metroui',
			timeout: 1500,
			text: 'Some notification text'
		}).show();
		this.toggleModal();
	};

	render() {
		const { isModalVisible } = this.state;
		return (
			<Dashboard
				toggleModal={this.toggleModal}
				onAddNoteModalSubmit={this.onAddNoteModalSubmit}
				isModalVisible={isModalVisible}
			/>
		);
	}
}

export default compose(graphql(addNewNoteMutation, { name: 'addNewNoteMutation' }))(DashboardContainer);
