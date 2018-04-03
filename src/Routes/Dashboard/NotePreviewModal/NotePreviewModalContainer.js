import React from 'react';
import NotePreviewModal from './NotePreviewModal';
import { compose, graphql, withApollo } from 'react-apollo';
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

	saveNote = () => {};

	handlePostComment = async ({ commentBody }) => {
		const { note: { id } } = this.state;
		const { addComment, client, noteID } = this.props;
		await addComment({
			variables: {
				id: parseInt(id),
				body: commentBody
			},
			update: (store, { data: { addComment } }) => {
				const { notes } = client.readQuery({ query: GET_NOTES });
				const note = this.getNote(client, noteID);
				note.comments.push(addComment);
				const noteIndex = notes.findIndex(item => item.id === noteID);
				notes[noteIndex] = note;
				client.writeQuery({ query: GET_NOTES, data: notes });
				this.setState({
					note
				});
			}
		});
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
