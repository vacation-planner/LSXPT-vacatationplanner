import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { AppContext } from '../Context/AppContext.js';
import Navbar from '../Dashboards/Navbar';

class LandingPage extends Component {
    componentDidMount() {
        // Get Token
        // If Token exists good
        // Else make sure signed out
    }

    render() {
        // Check if logged in
        // If logged In 
        // return (
        //     <>
        //         <Redirect to='/dashboard' />
        //     </>
        // )

        // else
        return (
            <>
                <Navbar />
                
            </>
        )
    }
}

LandingPage.contextType = AppContext;

export default LandingPage;