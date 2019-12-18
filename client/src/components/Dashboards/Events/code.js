import React, { Component } from 'react';
import Button from '../styles/code/jss/Button.jsx';
//import Button from "../Styles/Stocks/jsx/Button.jsx";
import Data from './data';
import ListBox from './listBox';

class Code extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            code: ""
        }
    }

    componentDidMount() {
 
        //  console.log("in the addnewinput component did mount")
      //  console.log(this.state)
    }

    handleChange = (index) => {
        const newTitle = Data[index].title
        console.log("title:", newTitle)
        const code = Data[index].code;
        console.log("code:", code)
        //const name = target.name;
        this.setState({
            title: newTitle,
            code: code
        });
    }

    render() {

        return (
            <div className="code-container">
           <form>
            <div>
             <p>  <Button onClick={() => this.handleChange(0)}>{Data[0].title}
                   </Button>
                   <Button onClick={() => this.handleChange(1)}>{Data[1].title}
                   </Button>
                   <Button onClick={() => this.handleChange(2)}>{Data[2].title}
                   </Button>
                   <Button onClick={() => this.handleChange(3)}>{Data[3].title}
                   </Button></p>
                   <p>  <Button onClick={() => this.handleChange(4)}>{Data[4].title}
                   </Button>
                 </p>   
                   </div>
                   <div className="list-box">
                   <div>{this.state.title} </div>
                   <div><textarea value={this.state.code}> {this.state.code} </textarea> </div>
                   {/* <ListBox code={this.state.code} title={this.state.title}>

                       </ListBox> */}

                       </div>

                   

              </form>

            </div>

        );

    }

}

export default Code;