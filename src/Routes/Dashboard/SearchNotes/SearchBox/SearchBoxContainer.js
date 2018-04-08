import React from 'react';
import { withApollo } from 'react-apollo';
import GET_NOTES from './../../../../queries/GET_NOTES.query.gql';
import SearchBox from './SearchBox';
import { gql } from 'apollo-boost';
import { graphql, compose, Query } from 'react-apollo';

export class SearchBoxContainer extends React.PureComponent {

    onFiltersChange = async filters => {

        const { title } = filters
        const { getNotes, setFilters } = this.props
        setFilters({
            variables:{
                title
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
      mutation ToggleTodo($id: Int!) {
        setFilters(title: $title) @client
    }`, { name: 'setFilters' })
    )(withApollo(SearchBoxContainer));
