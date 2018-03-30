import React from 'react';
import NotesBoard from './NotesBoard';
import { graphql } from 'react-apollo';
import QUERY_NOTES from './QUERY_NOTES.gql';
export class NotesBoardContainer extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			isModalVisible: false,
			modalData: null
		};
	}

	onNoteClick = data => {
		this.setState({
			isModalVisible: true,
			modalData: data
		});
	};

	toggleModal = data => {
		const { isModalVisible } = this.state;
		this.setState({
			isModalVisible: !isModalVisible,
			modalData: data || null
		});
	};

	render() {
		const { isModalVisible, modalData } = this.state;
		const { data: { notes, loading } } = this.props;
		return (
			<NotesBoard
				toggleModal={this.toggleModal}
				onNoteClick={this.onNoteClick}
				isModalVisible={isModalVisible}
				modalData={modalData}
				isLoading={loading}
				notesList={notes}
			/>
		);
	}
}

export default graphql(QUERY_NOTES)(NotesBoardContainer);
// export default NotesBoardContainer;
