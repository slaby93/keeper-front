import ApolloClient from 'apollo-boost';

export const apolloClient = new ApolloClient({
	uri: 'https://floating-crag-80168.herokuapp.com/graphql',
	errorPolicy: 'ignore'
});
