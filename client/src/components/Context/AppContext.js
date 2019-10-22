import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const AppContext = React.createContext();

export default class AppProvider extends Component {
    state = {
        // state variables here
    };

    render() {
        return (
            <AppContext.Provider
                value={{
                    state: this.state,
                }}
            >
                {this.props.children}
            </AppContext.Provider>
        );
    }
}