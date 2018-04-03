// import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
	errorPolicy: 'ignore',
	link: new HttpLink({uri: 'https://floating-crag-80168.herokuapp.com/graphql'}),
  cache
});
