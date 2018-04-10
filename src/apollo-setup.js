import ApolloClient from 'apollo-boost';

export const apolloClient = new ApolloClient({
	errorPolicy: 'ignore',
	uri: 'https://floating-crag-80168.herokuapp.com/graphql',
	clientState: {
		defaults: {},
		resolvers: {
			Mutation: {
				setFilters: (_, { title, state }, { cache, getCacheKey }) => {
					cache.writeData({ data: { filterByTitle: title, filterByState: state } });
					return null;
				}
			}
		},
		typeDefs: ``
	}
});
