// import './reset.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import 'antd/dist/antd.min.css';
import 'noty/src/noty.scss';
import 'noty/src/themes/metroui.scss';
import registerServiceWorker from './registerServiceWorker';
import Dashboard from './Routes/Dashboard';
import { apolloClient } from './apollo-setup';

ReactDOM.render(
	<ApolloProvider client={apolloClient}>
		<Dashboard />
	</ApolloProvider>,
	document.getElementById('root')
);
registerServiceWorker();
