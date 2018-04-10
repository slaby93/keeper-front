import React from 'react';
import { withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';
import SearchBox from './SearchBox';
import GET_NOTES from './../../../../queries/GET_NOTES.query.gql';


export class SearchBoxContainer extends React.PureComponent {

    onFiltersChange = async filters => {
        const { title, state } = filters
        const { setFilters } = this.props
        /**
         * title needs to be send as null if empty
         * as to have same cache value 
         */
        setFilters({
            variables: {
                ...title && title.length ? {title} : null,
                ...state && { state }
            }
        })
    };

    render() {
        return <SearchBox onFiltersChange={this.onFiltersChange} />;
    }
}


export default compose(
    graphql(GET_NOTES, { name: 'getNotes' }),
    graphql(gql`
      mutation {
        setFilters(title: $title, state: $state) @client
    }`, { name: 'setFilters' })
)(withApollo(SearchBoxContainer));
