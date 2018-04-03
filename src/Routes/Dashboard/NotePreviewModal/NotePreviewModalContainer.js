import React from 'react';
import NotePreviewModal from './NotePreviewModal';
import { compose, graphql, withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';
import ADD_COMMENT from './../../../queries/ADD_COMMENT.mutation.gql';
import REMOVE_COMMENT from './../../../queries/REMOVE_COMMENT.mutation.gql';
import NOTE_FRAGMENT from './../../../queries/Note.fragment.gql';

export class NotePreviewModalContainer extends React.PureComponent {
	constructor(props) {
		super(props);
		const { client, noteID } = props;
		this.state = {
			note: this.getNote(client, noteID)
		};
	}

	getNote = (client, noteID) => {
		return client.readFragment({
			id: `Note:${noteID}`,
			fragment: NOTE_FRAGMENT
		})
	};

	handlePostComment = async ({ commentBody }, form) => {
		const { addComment, client, noteID } = this.props;
		await addComment({
			variables: {
				id: parseFloat(noteID),
				body: commentBody
			},
			update: async (store, { data: { addComment } }) => {
				const {note} =  this.state
				client.writeFragment({
					id: `Note:${noteID}`,
					fragment: gql`
						fragment myTodo2 on Note {
							comments {
								body
							}
						}
					`,
					data: {
						__typename: 'Note',
						comments: note.comments.concat([addComment])
					}
				});
				this.setState({
					note: this.getNote(client, noteID)
				})
			}
		});
		form.resetFields();
	};

	handleRemoveComment = async (item)=>{
		const { removeComment, client, noteID } = this.props
		
		await removeComment({
			variables: {
				id: parseFloat(item.id),
			},
			update: async (store, {data:{deleteComment}}) => {
				const { note } = this.state	
				client.writeFragment({
					id: `Note:${noteID}`,
					fragment: gql`
					fragment myTodo3 on Note {
							comments {
								body
							}
						}
					`,
					data: {
						__typename:'Note',
						comments: note.comments.filter(item => item.id !== deleteComment.id)
					}
				})
				this.setState({
					note: this.getNote(client, noteID)
				})	
			}
		}) 
	}

	render() {
		const { note } = this.state;
		const { isModalVisible, onClose } = this.props;

		return (
			<NotePreviewModal
				onRemoveComment={this.handleRemoveComment}
				onPostComment={this.handlePostComment}
				note={note}
				isModalVisible={isModalVisible}
				onClose={onClose}
			/>
		);
	}
}

export default compose(
	graphql(ADD_COMMENT, { name: 'addComment' }),
	graphql(REMOVE_COMMENT, { name: 'removeComment' })
)(withApollo(NotePreviewModalContainer));
