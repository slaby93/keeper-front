import React from 'react';
import NotePreviewModal from './NotePreviewModal';
import { compose, graphql, withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';
import ADD_COMMENT from './../../../queries/ADD_COMMENT.mutation.gql';
import GET_NOTES from './../../../queries/GET_NOTES.query.gql';

export class NotePreviewModalContainer extends React.PureComponent {
	constructor(props) {
		super(props);
		const { client, noteID } = props;
		this.state = {
			note: this.getNote(client, noteID)
		};
	}

	getNote = (client, noteID) => {
		const { notes } = client.cache.readQuery({ query: GET_NOTES });
		const note = notes.filter(item => item.id === noteID)[0];
		return note;
	};

	handlePostComment = async ({ commentBody }, form) => {
		const { addComment, client, noteID } = this.props;
		await addComment({
			variables: {
				id: parseInt(noteID),
				body: commentBody
			},
			update: async (store, { data: { addComment } }) => {
				const note = this.getNote(client, noteID);
				note.comments.push(addComment);
				const cachedData = store.readQuery({ query: GET_NOTES });
				const index = cachedData.notes.findIndex(item => item.id === noteID);
				cachedData.notes[index] = note;
				await client.writeQuery({ query: GET_NOTES, data: cachedData });
				this.setState({
					note: this.getNote(client, noteID)
				});
			}
		});
		form.resetFields();
	};

	render() {
		const { note } = this.state;
		const { isModalVisible, onClose } = this.props;

		return (
			<NotePreviewModal
				onPostComment={this.handlePostComment}
				note={note}
				isModalVisible={isModalVisible}
				onClose={onClose}
			/>
		);
	}
}

export default compose(graphql(ADD_COMMENT, { name: 'addComment' }))(withApollo(NotePreviewModalContainer));
