import React, { Component } from 'react';
import axios from 'axios';

export const AppContext = React.createContext();

export default class AppProvider extends Component {
    state = {
        currentVacationMenu: false,
        pastVacationMenu: false,
        loggedIn: true,
        userID: null,
        userEmail: null,
        allVacations: JSON.parse(localStorage.getItem('allVacations')) || [],
        myVacations: JSON.parse(localStorage.getItem('myVacations')) || [],
        myCurrentVacations: JSON.parse(localStorage.getItem('myCurrentVacations')) || [],
        myPastVacations: JSON.parse(localStorage.getItem('myPastVacations')) || [], 
        //backendURL: 'https://vacationplannerlx.herokuapp.com/api',
        backendURL: 'http://localhost:5500/api',
        tempVacationHolder: JSON.parse(localStorage.getItem('tempVacationHolder')) || [],
    };

    render() {
        return (
            <AppContext.Provider
                value={{
                    state: this.state,
                    getUserID: (value) => {
                        this.setState({ userID: value })
                    },
                    getUserEmail: (value) => {
                        this.setState({ userEmail: value })
                    },
                    signOut: () => {
                        localStorage.removeItem('allVacations');
                        localStorage.removeItem('allCurrentVacations');
                        localStorage.removeItem('allPastVacations');
                        localStorage.removeItem('myVacations');
                        localStorage.removeItem('myCurrentVacations');
                        localStorage.removeItem('myPastVacations');
                    },
                    getVacations: () => {
                        const userID = this.state.userID;
                        const userEmail = this.state.userEmail;
                        const vacationsEndpoint = `${this.state.backendURL}/vacations`;
                        const secondaryUserEndpoint = `${this.state.backendURL}/secondaryUsers`;
                        axios
                            .get(vacationsEndpoint)
                            .then(res => {
                                const allVacations = res.data;
                                localStorage.setItem('allVacations', JSON.stringify(allVacations));
                                let allCurrentVacations = [];
                                let allPastVacations = [];
                                allVacations.forEach(result => {
                                    if (result.endDate === null) {
                                        allCurrentVacations.push(result);
                                    }

                                    else if (Date.parse(result.endDate) < Date.parse(new Date())  + 172800000) {
                                        allPastVacations.push(result);
                                    }
                                    else {
                                        allCurrentVacations.push(result);
                                    }
                                })
                                localStorage.setItem('allCurrentVacations', JSON.stringify(allCurrentVacations));
                                localStorage.setItem('allPastVacations', JSON.stringify(allPastVacations));

                                let myCurrentVacations = [];
                                let myPastVacations = [];
                                let myVacations = [];
                                allVacations.forEach(result => {
                                    if (result.usersUid === userID) {
                                        myVacations.push(result);
                                        if (result.endDate === null) {
                                            myCurrentVacations.push(result);
                                        }
    
                                        else if (Date.parse(result.endDate) < Date.parse(new Date())  + 172800000) {
                                            myPastVacations.push(result);
                                        }
                                        else {
                                            myCurrentVacations.push(result);
                                        }
                                    };
                                })
                                this.setState({
                                    allVacations,
                                    myVacations,
                                    myPastVacations,
                                    myCurrentVacations
                                })
                            });
                            axios
                            .get(secondaryUserEndpoint)
                            .then(res => {
                                const secondaryUserTable = res.data;
                                let joined = [];
                                let joinCurrent = [];
                                let joinPast = [];
                                secondaryUserTable.forEach(result => {
                                    if (result.email === userEmail) {
                                        if (this.state.myVacations.find(x => x.id !== result.vacationsId)) {
                                            const foundIndex = this.state.allVacations.findIndex(x => x.id === result.vacationsId);
                                            joined = joined.concat(this.state.allVacations[foundIndex]);
                                            if (this.state.allVacations[foundIndex].endDate === null) {
                                                joinCurrent = joinCurrent.concat(this.state.allVacations[foundIndex]);
                                            }
        
                                            else if (Date.parse(this.state.allVacations[foundIndex].endDate) < Date.parse(new Date())  + 172800000) {
                                                joinPast = joinPast.concat(this.state.allVacations[foundIndex]);
                                            }
                                            else {
                                                joinCurrent = joinCurrent.concat(this.state.allVacations[foundIndex]);
                                            }
                                        }
                                    }
                                })
                                this.setState({
                                    myVacations: this.state.myVacations.concat(joined),
                                    myCurrentVacations: this.state.myCurrentVacations.concat(joinCurrent),
                                    myPastVacations: this.state.myPastVacations.concat(joinPast),
                                })
                                localStorage.setItem('myVacations', JSON.stringify(this.state.myVacations));
                                localStorage.setItem('myCurrentVacations', JSON.stringify(this.state.myCurrentVacations));
                                localStorage.setItem('myPastVacations', JSON.stringify(this.state.myPastVacations));
                            });
                    },
                    addVacation: (vacationName) => {
                        const userID = this.state.userID;
                        const vacationsEndpoint = `${this.state.backendURL}/vacations`;
                        let vacation = {
                            title: vacationName,
                            usersUid: userID,
                        }
                        axios
                            .post(vacationsEndpoint, vacation)
                            .then(res => {
                                let vacationData = res.data;
                                let newVacation = {
                                    id: vacationData.id,
                                    title: vacationName,
                                    location: null,
                                    startDate: null,
                                    endDate: null,
                                    usersUid: userID,
                                    premium: false
                                }
                                const joined = this.state.myVacations.concat(newVacation);
                                localStorage.setItem('myVacations', JSON.stringify(joined));
                                const currentJoined = this.state.myCurrentVacations.concat(newVacation);
                                localStorage.setItem('myCurrentVacations', JSON.stringify(currentJoined));
                                localStorage.setItem('tempVacationHolder', JSON.stringify(newVacation));
                                this.setState({
                                    myVacations: joined,
                                    myCurrentVacations: currentJoined,
                                });
                            })
                            .catch(err => {
                                console.log('error adding vacation', err)
                            });

                    },


            }}
            >
                {this.props.children}
            </AppContext.Provider>
        );
    }
}