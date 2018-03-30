import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import 'antd/dist/antd.min.css';
import registerServiceWorker from './registerServiceWorker';
import Dashboard from './Routes/Dashboard';
import { apolloClient } from './apollo-setup';
import './reset.css';

ReactDOM.render(
	<ApolloProvider client={apolloClient}>
		<Dashboard />
	</ApolloProvider>,
	document.getElementById('root')
);
registerServiceWorker();
