import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

class NavBar extends Component{
    render(){
        return(
            <Nav>
                <div className="logo">
                    <h3>Vacation Planner</h3>
                </div>
                <NavLink to="" activeClassName="active">Login</NavLink>
                <NavLink to="" activeClassName="active">Register</NavLink>
            </Nav>
        )
    }
}

const Nav = styled.div`
    border:1px solid black;
    display:flex;
    div{
        border:1px solid black;
    }
    a{
        display:flex;
        border:1px solid purple;
        align-items:center;
    }
`

export default NavBar;