import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddService from "./components/add-service.component";
import Services from "./components/service.component";
import ServiceList from "./components/service-list.component";
 
export default class Service extends Component {
  render() {
    return (
      <div>
      
        <Router>
        <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/service"]} component={ServiceList} />
              <Route path="/service/:id" component={Services} />
              <Route exact path="/add" component={AddService} />
            </Switch>
          </div>
          </Router>
      </div>
    );
  }
}