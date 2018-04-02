import React from 'react';
import AddNoteModal from './AddNoteModal';
import GET_NOTES from './../../../queries/GET_NOTES.query.gql';
import ADD_NOTE from './../../../queries/ADD_NOTE.mutation.gql';
import { graphql, compose } from 'react-apollo';
import Noty from 'noty';

export class AddNoteContainer extends React.PureComponent {
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

	onAddNoteModalSubmit = async ({ title, body }, form) => {
		const { addNote } = this.props;
		await addNote({
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
			text: 'Note created!'
		}).show();
		this.toggleModal();
		form.resetFields();
	};

	render() {
		const { isModalVisible } = this.state;
		return (
			<AddNoteModal
				isModalVisible={isModalVisible}
				toggleModal={this.toggleModal}
				onSubmit={this.onAddNoteModalSubmit}
				{...this.props}
			/>
		);
	}
}

export default compose(graphql(ADD_NOTE, { name: 'addNote' }))(AddNoteContainer);
