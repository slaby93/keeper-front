import React from 'react';
import NotesBoard from './NotesBoard';
import { graphql } from 'react-apollo';
import QUERY_NOTES from './QUERY_NOTES.gql';
export class NotesBoardContainer extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			isModalVisible: false
		};
	}

	onNoteClick = () => {
		this.setState({
			isModalVisible: true
		});
	};

	toggleModal = () => {
		const { isModalVisible } = this.state;
		this.setState({
			isModalVisible: !isModalVisible
		});
	};

	render() {
		const { isModalVisible } = this.state;
		const { data: { notes, loading } } = this.props;
		return (
			<NotesBoard
				toggleModal={this.toggleModal}
				onNoteClick={this.onNoteClick}
				isModalVisible={isModalVisible}
				isLoading={loading}
				notesList={notes}
			/>
		);
	}
}

export default graphql(QUERY_NOTES)(NotesBoardContainer);
// export default NotesBoardContainer;
