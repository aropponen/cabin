import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddResort from "./components/add-resort.component";
import Resorts from "./components/resort.component";
import ResortList from "./components/resort-list.component";
 
export default class Resort extends Component {
  render() {
    return (
      <div>
        <Router>
        <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/resort"]} component={ResortList} />
              <Route path="/resort/:id" component={Resorts} />
              <Route path="/add" component={AddResort} />
            </Switch>
          </div>
          </Router>
      </div>
    );
  }
}