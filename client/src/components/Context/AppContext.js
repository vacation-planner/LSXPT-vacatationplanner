import React, { Component } from "react";
import axios from "axios";

export const AppContext = React.createContext();

export default class AppProvider extends Component {
  state = {
    currentVacationMenu: false,
    pastVacationMenu: false,
    loggedIn: true,
    userID: null,
    userEmail: null,
    userFirstName: null,
    userLastName: null,
    allVacations: JSON.parse(localStorage.getItem('allVacations')) || [],
    myVacations: JSON.parse(localStorage.getItem('myVacations')) || [],
    myCurrentVacations: JSON.parse(localStorage.getItem('myCurrentVacations')) || [],
    myPastVacations: JSON.parse(localStorage.getItem('myPastVacations')) || [],
    tempVacationHolder: JSON.parse(localStorage.getItem('tempVacationHolder')) || [],
    secondaryUserTable: [],
    currentVacationId: null,
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          getUserID: (value) => {
            this.setState({ ...this.state, userID: value });
          },
          getUserEmail: (value) => {
            this.setState({ ...this.state, userEmail: value });
          },
          getUserFirstName: (value) => {
            this.setState({
              ...this.state, userFirstName: value
            });
          },
          getUserLastName: (value) => {
            this.setState({
              ...this.state, userLastName: value
            });
          },
          signOut: () => {
            localStorage.removeItem('allVacations');
            localStorage.removeItem('allCurrentVacations');
            localStorage.removeItem('allPastVacations');
            localStorage.removeItem('myVacations');
            localStorage.removeItem('myCurrentVacations');
            localStorage.removeItem('myPastVacations');
            localStorage.removeItem('tempVacationHolder');
          },
          getVacations: () => {
            const userID = this.state.userID;
            const vacationsEndpoint = '/vacations';
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

                  else if (Date.parse(result.endDate) < Date.parse(new Date()) + 172800000) {
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

                    else if (Date.parse(result.endDate) < Date.parse(new Date()) + 172800000) {
                      myPastVacations.push(result);
                    }
                    else {
                      myCurrentVacations.push(result);
                    }
                  };
                })
                this.setState({
                  ...this.state,
                  allVacations,
                  myVacations,
                  myPastVacations,
                  myCurrentVacations
                })
              });
                let joined = [];
                let joinCurrent = [];
                let joinPast = [];
                this.state.secondaryUserTable.forEach(result => {
                    if (!this.state.myVacations.find(x => x.id === result.vacationsId)) {
                      const foundIndex = this.state.allVacations.findIndex(x => x.id === result.vacationsId);
                      joined = joined.concat(this.state.allVacations[foundIndex]);
                      if (this.state.allVacations[foundIndex].endDate === null) {
                        joinCurrent = joinCurrent.concat(this.state.allVacations[foundIndex]);
                      }

                      else if (Date.parse(this.state.allVacations[foundIndex].endDate) < Date.parse(new Date()) + 172800000) {
                        joinPast = joinPast.concat(this.state.allVacations[foundIndex]);
                      }
                      else {
                        joinCurrent = joinCurrent.concat(this.state.allVacations[foundIndex]);
                      }
                    }
                })
                this.setState({
                  ...this.state,
                  myVacations: this.state.myVacations.concat(joined),
                  myCurrentVacations: this.state.myCurrentVacations.concat(joinCurrent),
                  myPastVacations: this.state.myPastVacations.concat(joinPast),
                })
                localStorage.setItem('myVacations', JSON.stringify(this.state.myVacations));
                localStorage.setItem('myCurrentVacations', JSON.stringify(this.state.myCurrentVacations));
                localStorage.setItem('myPastVacations', JSON.stringify(this.state.myPastVacations));
          },
          setId: id => {
            this.setState({ ...this.state, currentVacationId: id });
          },
          addVacation: (vacationName) => {
            const userID = this.state.userID;
            const vacationsEndpoint = '/vacations';
            let vacation = {
              title: vacationName,
              usersUid: userID,
              premium: 0,
              closed: 0,
              location: "",
              startDate: "",
              endDate: ""
            }
            axios
              .post(vacationsEndpoint, vacation)
              .then(res => {
                let vacationData = res.data;
                let newVacation = {
                  id: vacationData.id,
                  title: vacationName,
                  location: "",
                  startDate: "",
                  endDate: "",
                  usersUid: userID,
                  premium: vacation.premium,
                  closed: vacation.closed
                }
                this.setState({
                  ...this.state,
                  tempVacationHolder: newVacation,
                  currentVacationId: vacationData.id
                })
                localStorage.setItem('tempVacationHolder', JSON.stringify(newVacation));
                const allVactionsJoined = this.state.allVacations.concat(newVacation);
                localStorage.setItem('allVacations', JSON.stringify(allVactionsJoined));
                const joined = this.state.myVacations.concat(newVacation);
                localStorage.setItem('myVacations', JSON.stringify(joined));
                const currentJoined = this.state.myCurrentVacations.concat(newVacation);
                localStorage.setItem('myCurrentVacations', JSON.stringify(currentJoined));
                this.setState({
                  ...this.state,
                  myVacations: joined,
                  myCurrentVacations: currentJoined,
                  allVacations: allVactionsJoined,
                });
              })
              .catch(err => {
                console.log('error adding vacation', err)
              });
          },
          setPremium: (id, premium) => {
            let vacation = {
              id: Number(id),
              premium: premium
            };
            const vacationsEndpoint = `/vacations/${id}`;
            axios.put(vacationsEndpoint, vacation).then(res => {
              axios.get(vacationsEndpoint).then(res => {
                let allVacations = this.state.allVacations;
                let myCurrentVacations = this.state.myCurrentVacations;
                const foundIndexAllVacations = this.state.allVacations.findIndex(
                  x => x.id === id
                );
                const foundIndexMyCurrentVacations = this.state.myCurrentVacations.findIndex(
                  x => x.id === id
                );
                allVacations[foundIndexAllVacations].premium = premium;
                myCurrentVacations[foundIndexMyCurrentVacations].premium = premium;
                localStorage.setItem(
                  "allVacations",
                  JSON.stringify(allVacations)
                );
                localStorage.setItem(
                  "myCurrentVacations",
                  JSON.stringify(myCurrentVacations)
                );
                this.setState({
                  ...this.state,
                  allVacations,
                  myCurrentVacations
                });
              });
            });
          },
          updateVacationStartDate: (id, vacationData, startDate) => {
            axios
              .put(`/vacations/${id}`, vacationData)
              .then(response => {
                console.log("start day updated")
                let allVacations = this.state.allVacations;
                let myCurrentVacations = this.state.myCurrentVacations;
                const foundIndexAllVacations = this.state.allVacations.findIndex(x => x.id === id);
                const foundIndexMyCurrentVacations = this.state.myCurrentVacations.findIndex(x => x.id === id);
                allVacations[foundIndexAllVacations].startDate = startDate;
                myCurrentVacations[foundIndexMyCurrentVacations].startDate = startDate;
                localStorage.setItem('allVacations', JSON.stringify(allVacations))
                localStorage.setItem('myCurrentVacations', JSON.stringify(myCurrentVacations))
                this.setState({
                  allVacations,
                  myCurrentVacations
                })
              })
              .catch(err => {
                console.log('We"ve encountered an error');
              });
          },
          updateVacationEndDate: (id, vacationData, endDate) => {
            const foundCurrentVacationIndex = this.state.myCurrentVacations.findIndex(x => x.id === id);
            if (this.state.myCurrentVacations[foundCurrentVacationIndex].startDate !== "") {

            }
            axios
              .put(`/vacations/${id}`, vacationData)
              .then(response => {
                console.log("end date updated")
                let allVacations = this.state.allVacations;
                let myCurrentVacations = this.state.myCurrentVacations;
                const foundIndexAllVacations = this.state.allVacations.findIndex(x => x.id === id);
                const foundIndexMyCurrentVacations = this.state.myCurrentVacations.findIndex(x => x.id === id);
                allVacations[foundIndexAllVacations].endDate = endDate;
                myCurrentVacations[foundIndexMyCurrentVacations].endDate = endDate;
                localStorage.setItem('allVacations', JSON.stringify(allVacations))
                localStorage.setItem('myCurrentVacations', JSON.stringify(myCurrentVacations))
                this.setState({
                  allVacations,
                  myCurrentVacations
                })
              })
              .catch(err => {
                console.log('We"ve encountered an error');
              });
          },
          updateVacation: (id, location, title, startDate, endDate, userID, premium) => {
            let vacation = {
              id: id,
              title: title,
              location: location,
              startDate: startDate,
              endDate: endDate,
              usersUid: userID,
              premium: premium,
              closed: 0,
            }
            const foundCurrentVacationIndex = this.state.myCurrentVacations.findIndex(x => x.id === id);

            if (this.state.myCurrentVacations[foundCurrentVacationIndex].startDate !== "") {
              if (this.state.myCurrentVacations[foundCurrentVacationIndex].enddate !== "") {
                let vacation = {
                  id: id,
                  title: title,
                  location: location,
                  usersUid: userID,
                  premium: premium,
                  closed: 0,
                }

                const vacationsEndpoint = `/vacations/${id}`;
                axios
                  .put(vacationsEndpoint, vacation)
                  .then(res => {
                    let id = res.data.id;
                    let allVacations = this.state.allVacations;
                    let myCurrentVacations = this.state.myCurrentVacations;
                    let myVacations = this.state.myVacations;
                    const foundIndexAllVacations = this.state.allVacations.findIndex(x => x.id === id);
                    const foundIndexMyCurrentVacations = this.state.myCurrentVacations.findIndex(x => x.id === id);
                    const foundIndexMyVacations = this.state.myVacations.findIndex(x => x.id === id);
                    allVacations[foundIndexAllVacations] = vacation;
                    myCurrentVacations[foundIndexMyCurrentVacations] = vacation;
                    myVacations[foundIndexMyVacations] = vacation;
                    localStorage.setItem('allVacations', JSON.stringify(allVacations))
                    localStorage.setItem('myCurrentVacations', JSON.stringify(myCurrentVacations))
                    localStorage.setItem('myVacations', JSON.stringify(myVacations))
                    this.setState({
                      ...this.state,
                      allVacations,
                      myCurrentVacations,
                      myVacations,
                      currentVacationId: id
                    })
                  })
                  .catch(err => {
                    console.log('error editing vaction', err);
                  })
              }
              else {
                let vacation = {
                  id: id,
                  title: title,
                  location: location,
                  endDate: endDate,
                  usersUid: userID,
                  premium: premium,
                  closed: false,
                }

                const vacationsEndpoint = `/vacations/${id}`;
                axios
                  .put(vacationsEndpoint, vacation)
                  .then(res => {
                    let id = res.data.id;
                    let allVacations = this.state.allVacations;
                    let myCurrentVacations = this.state.myCurrentVacations;
                    let myVacations = this.state.myVacations;
                    const foundIndexAllVacations = this.state.allVacations.findIndex(x => x.id === id);
                    const foundIndexMyCurrentVacations = this.state.myCurrentVacations.findIndex(x => x.id === id);
                    const foundIndexMyVacations = this.state.myVacations.findIndex(x => x.id === id);
                    allVacations[foundIndexAllVacations] = vacation;
                    myCurrentVacations[foundIndexMyCurrentVacations] = vacation;
                    myVacations[foundIndexMyVacations] = vacation;
                    localStorage.setItem('allVacations', JSON.stringify(allVacations))
                    localStorage.setItem('myCurrentVacations', JSON.stringify(myCurrentVacations))
                    localStorage.setItem('myVacations', JSON.stringify(myVacations))
                    this.setState({
                      ...this.state,
                      allVacations,
                      myCurrentVacations,
                      myVacations,
                      currentVacationId: id
                    })
                  })
                  .catch(err => {
                    console.log('error editing vaction', err);
                  })
              }
            }
            else {
              const vacationsEndpoint = `/vacations/${id}`;
              axios
                .put(vacationsEndpoint, vacation)
                .then(res => {
                  let id = res.data.id;
                  let allVacations = this.state.allVacations;
                  let myCurrentVacations = this.state.myCurrentVacations;
                  let myVacations = this.state.myVacations;
                  const foundIndexAllVacations = this.state.allVacations.findIndex(x => x.id === id);
                  const foundIndexMyCurrentVacations = this.state.myCurrentVacations.findIndex(x => x.id === id);
                  const foundIndexMyVacations = this.state.myVacations.findIndex(x => x.id === id);
                  allVacations[foundIndexAllVacations] = vacation;
                  myCurrentVacations[foundIndexMyCurrentVacations] = vacation;
                  myVacations[foundIndexMyVacations] = vacation;
                  localStorage.setItem('allVacations', JSON.stringify(allVacations))
                  localStorage.setItem('myCurrentVacations', JSON.stringify(myCurrentVacations))
                  localStorage.setItem('myVacations', JSON.stringify(myVacations))
                  this.setState({
                    ...this.state,
                    allVacations,
                    myCurrentVacations,
                    myVacations,
                    currentVacationId: id
                  })
                })
                .catch(err => {
                  console.log('error editing vaction', err);
                })
            }
          },
          deleteVacation: (id) => {
            // Remove secondary users
            this.state.secondaryUserTable.forEach(result => {
              if(result.vacationsId === id) {
                let deleteId = result.id
                let tableIndex = this.state.secondaryUserTable.indexOf(result)
                axios
                  .delete(`/secondaryUsers/${deleteId}`)
                  .then(res => {
                    if(tableIndex > -1) {
                      let secondaryUserTable = this.state.secondaryUserTable.splice(tableIndex, 1);
                      this.setState({ ...this.state, secondaryUserTable });
                    }
                  })
                  .catch(err => {
                    console.log('error deleting secondary user', err)
                  })
              }
            })
            // Delete Vacation
            const deleteVacationEndpoint = `/vacations/${id}`;
            const foundIndexMyVacations = this.state.myVacations.findIndex(x => x.id === id);
            const foundIndexAllVacations = this.state.allVacations.findIndex(x => x.id === id);
            const foundIndexMyCurrentVacations = this.state.myCurrentVacations.findIndex(x => x.id === id);
            const foundIndexMyPastVacations = this.state.myPastVacations.findIndex(x => x.id === id);
            axios
              .delete(deleteVacationEndpoint)
              .then(res => {
                console.log(res.data)
                if(foundIndexMyVacations > -1) {
                  this.state.myVacations.splice(foundIndexMyVacations, 1);
                  this.setState({
                    ...this.state, 
                  })
                  localStorage.setItem('myVacations', JSON.stringify(this.state.myVacations));
                }
                if(foundIndexAllVacations > -1) {
                  this.state.allVacations.splice(foundIndexAllVacations, 1);
                  this.setState({ 
                    ...this.state,
                  })
                  localStorage.setItem('allVacations', JSON.stringify(this.state.allVacations));
                }
                if(foundIndexMyCurrentVacations > -1) {
                  this.state.myCurrentVacations.splice(foundIndexMyCurrentVacations, 1);
                  this.setState({ 
                    ...this.state,
                  })
                  localStorage.setItem('myCurrentVacations', JSON.stringify(this.state.myCurrentVacations));
                }
                if(foundIndexMyPastVacations > -1) {
                  this.state.myPastVacations.splice(foundIndexMyPastVacations, 1);
                  this.setState({ 
                    ...this.state,
                  })
                  localStorage.setItem('myPastVacations', JSON.stringify(this.state.myPastVacations));
                }
              })
              .catch(err => {
                console.log('error deleting vacation', err)
              })
          },
          closeVacation: (id) => {
            let vacation = {
              closed: 1,
            }
            axios
              .put(`/vacations/${id}`, vacation)
              .then(response => {
                console.log("Vacation closed")
                let allVacations = this.state.allVacations;
                let myPastVacations = this.state.myPastVacations;
                const foundIndexAllVacations = this.state.allVacations.findIndex(x => x.id === id);
                const foundIndexMyPastVacations = this.state.myPastVacations.findIndex(x => x.id === id);
                allVacations[foundIndexAllVacations].closed = 1;
                myPastVacations[foundIndexMyPastVacations].closed = 1;
                localStorage.setItem('allVacations', JSON.stringify(allVacations))
                localStorage.setItem('myPastVacations', JSON.stringify(myPastVacations))
                this.setState({
                  allVacations,
                  myPastVacations
                })
              })
              .catch(err => {
                console.log('We\'ve encountered an error');
              });
          },
          getSecondaryUserTable: (email) => {
            let secondaryUserTable = [];
            const secondaryUserEndpoint = '/secondaryUsers';
            axios
            .get(secondaryUserEndpoint)
            .then(res => {
              res.data.forEach(result => {
                if (email === result.email) {
                  secondaryUserTable.push(result)
                }
              })
              console.log('secondaryUserTable filled');
              this.setState({
                secondaryUserTable,
              })
            })
            .catch(err => {
              console.log('error adding secondary User Table', err)
            });
          },
          addPrimaryUserAsSecondaryUser: (newVacationName) => {
            const secondaryUserEndpoint = '/secondaryUsers';
            this.state.myVacations.forEach(result => {
              if (result.title === newVacationName) {
                let foundSecondaryUser = this.state.secondaryUserTable.find(x => x.vacationsId === result.id && x.email === this.state.userEmail)
                if (foundSecondaryUser === undefined) {
                  let secondaryUserData = {
                    vacationsId: result.id,
                    firstName: this.state.userFirstName,
                    lastName: this.state.userLastName,
                    email: this.state.userEmail
                  }
                  axios
                    .post(secondaryUserEndpoint, secondaryUserData)
                    .then(res => {
                      let secondaryUserDataAdded = {
                        id: res.data.id,
                        vacationsId: secondaryUserData.vacationsId,
                        firstName: secondaryUserData.firstName,
                        lastName: secondaryUserData.lastName,
                        email: secondaryUserData.email,
                      }
                      console.log('Secondary user added');
                      let secondaryUserTable = this.state.secondaryUserTable.concat(secondaryUserDataAdded)
                      this.setState({
                        secondaryUserTable
                      })
                    })
                    .catch(err => {
                      console.log('error adding secondary User', err)
                    });
                }
              }
            })
         }
        }}
      >
        {this.props.children}
      </AppContext.Provider >
    );
  }
}
