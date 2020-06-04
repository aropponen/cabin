import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {ReservationContext} from "./myContext";


import AddCustomer from "./components/add-customer.component";
import Customers from "./components/customer.component";
import CustomerList from "./components/customer-list.component";

export default class Customer extends Component {
  static contextType = ReservationContext;

  render() {
    return (
      <div>
        <Router>
        <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/customer"]} component={CustomerList} />
              <Route path="/customer/:id" component={Customers} />
              <Route exact path="/add" component={AddCustomer} />
            </Switch>
          </div>
          </Router>
      </div>
    );
  }
}