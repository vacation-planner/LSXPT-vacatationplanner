import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.css';
import { AppContext } from './components/Context/AppContext.js';
import LandingPage from './components/LandingPage';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Route exact path='/' component={LandingPage} />
                <h1>Hello!</h1>
            </div>
        );
    }
}

App.contextType = AppContext;

export default App;
