import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import dotenv from 'dotenv';
import './index.css';
import App from './App';
import AppProvider from './components/Context/AppContext.js';
<<<<<<< HEAD
require("dotenv").config("/.env");
=======
import Global from './components/StyledComponents/GlobalReset.js';
>>>>>>> bbeeeb4bfffe41ad6238dbc7e2e413e89de4b583

//dotenv.config()


ReactDOM.render(
    <AppProvider>
        <Router>
            <Global />
            <App />
        </Router>
    </AppProvider>,
    document.getElementById('root')
);
