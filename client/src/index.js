import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import dotenv from 'dotenv';
import './index.css';
import App from './App';
import AppProvider from './components/Context/AppContext.js';
// import Global from './components/StyledComponents/GlobalReset.js';
require("dotenv").config("/.env");

dotenv.config()

axios.defaults.baseURL = 
process.env.NODE_ENV === 'production'
? 'https://vacationplannerlx.herokuapp.com/api'
: 'http://localhost:5500/api';

ReactDOM.render(
    <AppProvider>
        <Router>
            {/* <Global /> */}
            <App />
        </Router>
    </AppProvider>,
    document.getElementById('root')
);
