import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import ResortList from "./components/resort-list.component";
import Resort from "./components/resort.component";
import AddResort from "./components/add-resort.component";
import HomePage from "./components/homepage";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/" className="navbar-brand">
              Village People Oy
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/resort"} className="nav-link">
                  Toimipaikat
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/cabin"} className="nav-link">
                  Mökit
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/customer"} className="nav-link">
                  Asiakkaat
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/reservation"} className="nav-link">
                  Varaukset
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/invoice"} className="nav-link">
                  Laskut
                </Link>
              </li>

            </div>
          </nav>
          <div className="container mt-3">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/resort" component={ResortList} />
              <Route path="/resort/:id" component={Resort} />
              <Route exact path="/add" component={AddResort} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;