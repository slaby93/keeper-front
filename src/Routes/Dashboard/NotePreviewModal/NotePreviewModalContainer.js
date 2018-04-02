import React from 'react';
import NotePreviewModal from './NotePreviewModal';
import { compose, graphql } from 'react-apollo';
import ADD_COMMENT from './../../../queries/ADD_COMMENT.mutation.gql';

export class NotePreviewModalContainer extends React.PureComponent {
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
		// return <NotePreviewModal onPostComment={this.handlePostComment} {...this.props} />;
		return <span>WIRE FETCHING DATA FOR SINGLE NOTE</span>;
	}
}

export default compose(graphql(ADD_COMMENT, { name: 'addComment' }))(NotePreviewModalContainer);
