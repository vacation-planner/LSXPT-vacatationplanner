import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.css';
import { AppContext } from './components/Context/AppContext.js';
import LandingPage from './components/LandingPage';

class App extends Component {
    render() {
        // Defined homepage for route checks
        const homepage = () => {
            return <Redirect to='/' />;
        };

        return (
            <div className="App">
                <Route exact path='/' component={LandingPage} />
                {/* Route for signin */}
                {/* Route for sign up */}
                {/* Route for user settings */}
                {/* Route for home dashboard */}
                {/* Implement more Routes as needed */}
            </div>
        );
    }
}

App.contextType = AppContext;

export default App;