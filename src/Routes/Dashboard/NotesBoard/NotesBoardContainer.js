import React from 'react';
import NotesBoard from './NotesBoard';
import { graphql } from 'react-apollo';
import QUERY_NOTES from './QUERY_NOTES.gql';
export class NotesBoardContainer extends React.PureComponent {
	render() {
		const { data: { notes, loading } } = this.props;
		return <NotesBoard isLoading={loading} notesList={notes} />;
	}
}

export default graphql(QUERY_NOTES)(NotesBoardContainer);
// export default NotesBoardContainer;
