import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import dotenv from 'dotenv';
import './index.css';
import App from './App';
import AppProvider from './components/Context/AppContext.js';
require("dotenv").config("/.env");

//dotenv.config()


ReactDOM.render(
    <AppProvider>
        <Router>
            <App />
        </Router>
    </AppProvider>,
    document.getElementById('root')
);
