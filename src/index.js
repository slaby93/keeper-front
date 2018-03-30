import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import 'antd/dist/antd.min.css';
import registerServiceWorker from './registerServiceWorker';
import Dashboard from './Routes/Dashboard';

ReactDOM.render(<Dashboard />, document.getElementById('root'));
registerServiceWorker();
