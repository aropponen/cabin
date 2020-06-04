import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import AddReservation from "./components/add-reservation.component";
import Reservations from "./components/reservation.component";
import ReservationList from "./components/reservation-list.component";
//import NewReservation from "./components/new-reservation.component";
   
  export default class Reservation extends Component {
    render() {
      return (
        <div>
          <Router>
          <div className="container mt-3">
              <Switch>
                <Route exact path={["/", "/reservation"]} component={ReservationList} />
                <Route path="/reservation/:id" component={Reservations} />
                <Route path="/addreservation" component={AddReservation} />
              </Switch>
            </div>
            </Router>
        </div>
      );
    }
  }