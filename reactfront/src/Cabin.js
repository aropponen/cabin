import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddCabin from "./components/add-cabin.component";
import Cabins from "./components/cabin.component";
import CabinList from "./components/cabin-list.component";
import AddReservation from "./components/add-new-reservation.component";
import AddCustomer from "./components/add-new-customer.component";
import { ReservationContext } from "./myContext";

export default class Cabin extends Component {
  static contextType = ReservationContext;
  
  render() {
    const ctxCabin = this.context;
    console.log("cabinista tulee: ", ctxCabin)


    return (
      <div>
         <Router>
        <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/cabin"]} component={CabinList} />
              <Route path="/cabin/:id" component={Cabins} />
              <Route path="/add" component={AddCabin} />
              <Route path="/addreservation" component={AddReservation} />
              <Route path="/addcustomer" component={AddCustomer} />

            </Switch>
          </div>
          </Router>
      </div>
    );
  }
}