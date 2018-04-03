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

	handlePostComment = async ({ body }) => {
		const { data: { id }, addComment } = this.props;
		await addComment({
			variables: {
				id: parseInt(id),
				body
			}
		});
	};

	render() {
		const { note } = this.state;
		const { isModalVisible } = this.props;
		return <NotePreviewModal onPostComment={this.handlePostComment} note={note} isModalVisible={isModalVisible} />;
	}
}

export default compose(graphql(ADD_COMMENT, { name: 'addComment' }))(withApollo(NotePreviewModalContainer));
