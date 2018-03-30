import React from 'react';
import NotesBoard from './NotesBoard';
import { gql } from 'apollo-boost';
import { Query, graphql, compose } from 'react-apollo';
import QUERY_NOTES from './QUERY_NOTES.gql';
export class NotesBoardContainer extends React.PureComponent {
	render() {
		const { data: { notes, loading } } = this.props;
		return <NotesBoard isLoading={loading} notesList={notes} />;
	}
}

export default graphql(QUERY_NOTES)(NotesBoardContainer);
// export default NotesBoardContainer;
