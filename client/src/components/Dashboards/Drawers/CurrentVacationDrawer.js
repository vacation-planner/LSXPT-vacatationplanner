import React from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class CurrentVacationDrawer extends React.Component {
    state = {
        vacationDetails: true,
        calendar: false,
        expenses: false
    };

    displayCurrentVacation = event => {
        event.preventDefault();
        this.setState({
            vacationDetails: false,
            calendar: false,
            expenses: false
        });
        this.setState({
            [event.currentTarget.id]: true
        });
    };

    render() {
        const selectedDrawer = {
            backgroundColor: 'white'
        };

        const listItems = [
            { name: 'vacationDetails', text: 'Vacation Details' },
            { name: 'calendar', text: 'Calendar' },
            { name: 'expenses', text: 'Expenses' }
        ];

        return (
            <>
                <div
                    style={{
                        margin: '0px',
                        textAlign: 'center',
                        padding: '15px',
                        color: 'black',
                        backgroundColor: '#DDDDDD',
                        fontSize: '1.5rem'
                    }}
                >
                    current vacation name {/*  Name of Current Vacation Here */}
                </div>
                <List>
                    listItems.map((item, index) => (
                    <>
                        <ListItem
                            button
                            key={item.name}
                            id={item.name}
                            onClick={this.displayCurrentVacation}
                        >
                            <ListItemText primary={item.text} />
                        </ListItem>
                        <Divider />
                    </>
                    ))
                </List>
            </>
        );
    }
}

export default CurrentVacationDrawer;
