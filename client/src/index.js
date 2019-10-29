import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import dotenv from 'dotenv';
import './index.css';
import App from './App';
import AppProvider from './components/Context/AppContext.js';
import Global from './components/StyledComponents/GlobalReset.js';

dotenv.config()


ReactDOM.render(
    <AppProvider>
        <Router>
            <Global />
            <App />
        </Router>
    </AppProvider>,
    document.getElementById('root')
);
