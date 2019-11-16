import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const AppContext = React.createContext();

export default class AppProvider extends Component {
    state = {
        currentVacations: [
            {
                name: 'test 1',
                location: 'Boca',
                startDate: 'June 27th 2020',
                endDate: 'July 4th 2020'
            },
            {
                name: 'test 2',
                location: 'Paris',
                startDate: 'November 27th 2019',
                endDate: 'December 4th 2019'
            },
            {
                name: 'I am the Mega Vacation',
                location: 'New York',
                startDate: 'April 15th 2020',
                endDate: 'April 24th 2020'
            }
        ],
        pastVacations: [
            {
                name: 'Moving up and down side to side like a roller coaster',
                location: 'Austin',
                startDate: 'October 31st 2019',
                endDate: 'November 3rd 2019'
            }
        ],
        testCurrent: false,
        testPast: true
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