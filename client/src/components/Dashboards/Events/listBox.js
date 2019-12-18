import React, { Component } from 'react';
import Button from '../styles/code/jss/Button.jsx';

//import Button from "../Styles/Stocks/jsx/Button.jsx";

//import Data from './data';

//import ListBox from './listBox';

class ListBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
           code: this.props.code
       }
    }

    componentDidMount() {

      //  console.log("in the addnewinput component did mount")

      //  console.log(this.state)

    }

    handleChange = (event) => {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });

    }

    render() {

        return (
            <div className="list-container">
            <div className="list-title">Title: {this.state.title}</div>
            <div className="list-code">Code: {this.state.code}</div>
              

            </div>

        );

    }

}

export default ListBox;

