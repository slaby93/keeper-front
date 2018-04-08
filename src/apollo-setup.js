// import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state'
import ApolloClient from 'apollo-boost';

export const apolloClient = new ApolloClient({
	errorPolicy: 'ignore',
	uri: 'https://floating-crag-80168.herokuapp.com/graphql',
	clientState: {
		defaults: {
			visibilityFilter: {
				a: 1
			}
		},
		resolvers: {
			Mutation: {
				setFilters: (_, { title }, { cache, getCacheKey }) => {
					cache.writeData({ data: { filterByTitle: title } });
					return null;
				}
			}
		},
		typeDefs
	}
});

const typeDefs = `

	type Mutation {
		setFilters(title: String)
	}
  type Query {
    filterByTitle: String
  }
`;