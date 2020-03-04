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
    allVacations: JSON.parse(localStorage.getItem('allVacations')) || [],
    myVacations: JSON.parse(localStorage.getItem('myVacations')) || [],
    myCurrentVacations: JSON.parse(localStorage.getItem('myCurrentVacations')) || [],
    myPastVacations: JSON.parse(localStorage.getItem('myPastVacations')) || [],
    tempVacationHolder: JSON.parse(localStorage.getItem('tempVacationHolder')) || [],
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
            const userEmail = this.state.userEmail;
            const vacationsEndpoint = '/vacations';
            const secondaryUserEndpoint = '/secondaryUsers';
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

                      else if (Date.parse(this.state.allVacations[foundIndex].endDate) < Date.parse(new Date()) + 172800000) {
                        joinPast = joinPast.concat(this.state.allVacations[foundIndex]);
                      }
                      else {
                        joinCurrent = joinCurrent.concat(this.state.allVacations[foundIndex]);
                      }
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
              });
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
              closed: false,
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
                  closed: false,
                }

                const vacationsEndpoint = `/vacations/${id}`;
                axios
                  .put(vacationsEndpoint, vacation)
                  .then(res => {
                    let id = res.data.id;
                    let allVacations = this.state.allVacations;
                    let myCurrentVacations = this.state.myCurrentVacations;
                    const foundIndexAllVacations = this.state.allVacations.findIndex(x => x.id === id);
                    const foundIndexMyCurrentVacations = this.state.myCurrentVacations.findIndex(x => x.id === id);
                    allVacations[foundIndexAllVacations] = vacation;
                    myCurrentVacations[foundIndexMyCurrentVacations] = vacation;
                    localStorage.setItem('allVacations', JSON.stringify(allVacations))
                    localStorage.setItem('myCurrentVacations', JSON.stringify(myCurrentVacations))
                    this.setState({
                      ...this.state,
                      allVacations,
                      myCurrentVacations,
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
                    const foundIndexAllVacations = this.state.allVacations.findIndex(x => x.id === id);
                    const foundIndexMyCurrentVacations = this.state.myCurrentVacations.findIndex(x => x.id === id);
                    allVacations[foundIndexAllVacations] = vacation;
                    myCurrentVacations[foundIndexMyCurrentVacations] = vacation;
                    localStorage.setItem('allVacations', JSON.stringify(allVacations))
                    localStorage.setItem('myCurrentVacations', JSON.stringify(myCurrentVacations))
                    this.setState({
                      ...this.state,
                      allVacations,
                      myCurrentVacations,
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
                  const foundIndexAllVacations = this.state.allVacations.findIndex(x => x.id === id);
                  const foundIndexMyCurrentVacations = this.state.myCurrentVacations.findIndex(x => x.id === id);
                  allVacations[foundIndexAllVacations] = vacation;
                  myCurrentVacations[foundIndexMyCurrentVacations] = vacation;
                  localStorage.setItem('allVacations', JSON.stringify(allVacations))
                  localStorage.setItem('myCurrentVacations', JSON.stringify(myCurrentVacations))
                  this.setState({
                    ...this.state,
                    allVacations,
                    myCurrentVacations,
                    currentVacationId: id
                  })
                })
                .catch(err => {
                  console.log('error editing vaction', err);
                })
            }
          },
          deleteVacation: (id) => {
            const deleteVacationEndpoint = `/vacations/${id}`;
            axios
              .delete(deleteVacationEndpoint)
              .then(res => {
                console.log(res.data)
              })
              .catch(err => {
                console.log('error deleting vacation', err)
              })
            const userID = this.state.userID;
            const userEmail = this.state.userEmail;
            const vacationsEndpoint = '/vacations';
            const secondaryUserEndpoint = '/secondaryUsers';
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
                    } else if (
                      Date.parse(result.endDate) <
                      Date.parse(new Date()) + 172800000
                    ) {
                      myPastVacations.push(result);
                    } else {
                      myCurrentVacations.push(result);
                    }
                  }
                });
                this.setState({
                  ...this.state,
                  allVacations,
                  myVacations,
                  myPastVacations,
                  myCurrentVacations
                });
              });
            axios.get(secondaryUserEndpoint).then(res => {
              const secondaryUserTable = res.data;
              let joined = [];
              let joinCurrent = [];
              let joinPast = [];
              secondaryUserTable.forEach(result => {
                if (result.email === userEmail) {
                  if (
                    this.state.myVacations.find(
                      x => x.id !== result.vacationsId
                    )
                  ) {
                    const foundIndex = this.state.allVacations.findIndex(
                      x => x.id === result.vacationsId
                    );
                    joined = joined.concat(this.state.allVacations[foundIndex]);
                    if (this.state.allVacations[foundIndex].endDate === null) {
                      joinCurrent = joinCurrent.concat(
                        this.state.allVacations[foundIndex]
                      );
                    } else if (
                      Date.parse(this.state.allVacations[foundIndex].endDate) <
                      Date.parse(new Date()) + 172800000
                    ) {
                      joinPast = joinPast.concat(
                        this.state.allVacations[foundIndex]
                      );
                    } else {
                      joinCurrent = joinCurrent.concat(
                        this.state.allVacations[foundIndex]
                      );
                    }
                  }
                }
              });
              this.setState({
                myVacations: this.state.myVacations.concat(joined),
                myCurrentVacations: this.state.myCurrentVacations.concat(
                  joinCurrent
                ),
                myPastVacations: this.state.myPastVacations.concat(joinPast)
              });
              localStorage.setItem(
                "myVacations",
                JSON.stringify(this.state.myVacations)
              );
              localStorage.setItem(
                "myCurrentVacations",
                JSON.stringify(this.state.myCurrentVacations)
              );
              localStorage.setItem(
                "myPastVacations",
                JSON.stringify(this.state.myPastVacations)
              );
            });
          }
        }
        }
      >
        {this.props.children}
      </AppContext.Provider >
    );
  }
}
