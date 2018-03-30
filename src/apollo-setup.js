import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

export const apolloClient = new ApolloClient({
	uri: 'https://floating-crag-80168.herokuapp.com/graphql',
	errorPolicy: 'ignore'
});

apolloClient
	.query({
		query: gql`
			{
				notes {
					title
				}
			}
		`
	})
	.then(data => console.log({ data }));
