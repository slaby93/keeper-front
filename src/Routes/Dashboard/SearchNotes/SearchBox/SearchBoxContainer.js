import React from 'react';
import { withApollo } from 'react-apollo';
import GET_NOTES from './../../../../queries/GET_NOTES.query.gql';
import SearchBox from './SearchBox';
import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';

export class SearchBoxContainer extends React.PureComponent {
	searchNotes = async filters => {
		await this.props.addNewNoteMutation({
			variables: {},
			update: (store, { data: { addNote } }) => {
				const cachedData = store.readQuery({ query: GET_NOTES });
				cachedData.notes = cachedData.notes.concat([addNote]);
				store.writeQuery({ query: GET_NOTES, data: cachedData });
			}
		});
	};

	onFiltersChange = async filters => {
		const { searchWithFilters } = this.props;
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
