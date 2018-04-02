import React from 'react';
import Dashboard from './Dashboard';
import Noty from 'noty';
import { graphql, compose, withApollo } from 'react-apollo';
import ADD_NOTE from './../../queries/ADD_NOTE.mutation.gql';
import GET_NOTES from './../../queries/GET_NOTES.query.gql';
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
			},
			/**
			 * Direct access to cache in order to update existing Notes without requrering existing notes
			 */
			update: (store, { data: { addNote } }) => {
				const cachedData = store.readQuery({ query: GET_NOTES });
				cachedData.notes = cachedData.notes.concat([addNote]);
				store.writeQuery({ query: GET_NOTES, data: cachedData });
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

export default compose(graphql(ADD_NOTE, { name: 'addNewNoteMutation' }))(withApollo(DashboardContainer));
