import ApolloClient from 'apollo-boost';

export const apolloClient = new ApolloClient({
	errorPolicy: 'ignore',
	uri: 'https://floating-crag-80168.herokuapp.com/graphql',
	clientState: {
		defaults: {
			filterByTitle: null,
			filterByState: null
		},
		resolvers: {
			Mutation: {
				setFilters: (_, { title = null, state = null }, { cache, getCacheKey }) => {
					cache.writeData({ data: { filterByTitle: title, filterByState: state } });
					return null;
				}
			}
		},
		typeDefs: ``
	}
});
