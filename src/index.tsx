import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import React from 'react';

import('react-dom').then((ReactDOM) =>
	ReactDOM.default.render(<App />, document.getElementById('root'))
);
