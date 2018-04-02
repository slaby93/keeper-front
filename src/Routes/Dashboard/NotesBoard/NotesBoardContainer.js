import React from 'react';
import NotesBoard from './NotesBoard';
import { graphql, compose } from 'react-apollo';
import GET_NOTES from './../../../queries/GET_NOTES.query.gql';
import REMOVE_NOTE from './../../../queries/REMOVE_NOTE.mutation.gql';
export class NotesBoardContainer extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			isModalVisible: false,
			modalData: null,
			isLoading: false
		};
	}

	onNoteClick = data => {
		this.setState({
			isModalVisible: true,
			modalData: data
		});
	};

	onNoteRemove = async id => {
		const { removeNote } = this.props;
		this.setState({
			isLoading: true
		});

		await removeNote({
			variables: {
				id: parseInt(id)
			},
			/**
			 * Example of mutation in which we requery all Notes
			 */
			refetchQueries: [{ query: GET_NOTES }]
		});

		this.setState({
			isLoading: false
		});
	};

	toggleModal = data => {
		const { isModalVisible, isLoading } = this.state;
		this.setState({
			isModalVisible: !isModalVisible,
			modalData: data || null
		});
	};

	render() {
		const { isModalVisible, modalData, isLoading } = this.state;
		const { data: { notes, loading } } = this.props;

		return (
			<NotesBoard
				isLoading={isLoading || loading}
				toggleModal={this.toggleModal}
				onNoteClick={this.onNoteClick}
				onNoteRemove={this.onNoteRemove}
				isModalVisible={isModalVisible}
				modalData={modalData}
				notesList={notes}
			/>
		);
	}
}

export default compose(graphql(GET_NOTES), graphql(REMOVE_NOTE, { name: 'removeNote' }))(NotesBoardContainer);
