import React from 'react';
import { withApollo } from 'react-apollo';
import QUERY_NOTES from './../../NotesBoard/QUERY_NOTES.gql';
import SearchBox from './SearchBox';
import { gql } from 'apollo-boost';
import { Query, graphql, compose } from 'react-apollo';

export class SearchBoxContainer extends React.PureComponent {
	searchNotes = async filters => {
		const { client } = this.props;
		await this.props.addNewNoteMutation({
			variables: {},
			update: (store, { data: { addNote } }) => {
				const cachedData = store.readQuery({ query: QUERY_NOTES });
				cachedData.notes = cachedData.notes.concat([addNote]);
				store.writeQuery({ query: QUERY_NOTES, data: cachedData });
			}
		});
	};

	onFiltersChange = async filters => {
		console.log('onFiltersChange', filters, this.props);
		const { searchWithFilters, client } = this.props;
		await searchWithFilters.updateQuery((data, options) => {
			return [
				data,
				Object.assign({}, data, {
					variables: {
						a: 1
					}
				})
			];
		});
	};

	render() {
		return <SearchBox onFiltersChange={this.onFiltersChange} />;
	}
}

const searchWithFilters = graphql(
	gql`
		query queryNotes {
			notes {
				title
				body
			}
		}
	`,
	{ name: 'searchWithFilters' }
);

export default compose(searchWithFilters)(withApollo(SearchBoxContainer));
