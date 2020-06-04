import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Cabins from "./components/cabin.component";
import CabinList from "./components/cabin-list.component";
import AddCustomer from "./components/add-new-customer.component";
import AddReservation from "./components/add-new-reservation.component";
import { ReservationContext } from "./myContext";

export default class Cabin extends Component {
  static contextType = ReservationContext;
  
  render() {

    return (
      <div>
         <Router>
        <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/cabin"]} component={CabinList} />
              <Route path="/cabin/:id" component={Cabins} />
              <Route path="/addcustomer" component={AddCustomer} />
              <Route path="/addreservation" component={AddReservation} />
            </Switch>
          </div>
          </Router>
      </div>
    );
  }
}