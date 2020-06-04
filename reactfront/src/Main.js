import React, { Component } from 'react'
import { BrowserRouter as HashRouter, Route, NavLink, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home";
import Resort from "./Resort";
import Cabin from "./Cabin";
import Service from "./Service";
import Customer from "./Customer";
import Reservation from "./Reservation";
import Invoice from "./Invoice";
import About from "./About";
import Contact from "./Contact";
import Login from "./components/login.component";
import Register from "./components/register.component";
import NotFound from "./NotFound";

import { ReservationContext } from "./myContext"

export default class Main extends Component {
  static contextType = ReservationContext;

  constructor(props) {
    super(props);
    this.state = {
      uusiData:
      {
        customerId: null,
        loggedInUser: "",
        userRole: null
      },
    };
  }

  logout() {
    var emptyData = {
      userRole: 0,
      loggedInUser: "",
      cabinId: "",
      customerId: ""
    }
    const ctx = this.context;
    ctx.updateData(null);
    console.log("Tyhjennetty: ", emptyData)
  }

  render() {
    const userRole = this.state.uusiData.userRole;
    const customerId = this.state.uusiData.customerId;
    const userName = this.state.uusiData.loggedInUser;
    console.log("käyttäjän kontekstista saatu rooli on ", userRole);

    if (userRole === 1) {
      return (
        <ReservationContext.Provider value={{
          data: this.state,
          updateData: (asiakasData) => {
            console.log("asiakasData: ", asiakasData);
            console.log("asiakasData.userRole: ", asiakasData.userRole);
            this.setState({ uusiData: asiakasData })
          }
        }}>
          <HashRouter>
            <div>
              <div>
                <p style={{ color: 'red' }}>Rooli {userRole}</p>
                <h1>Village People Oy</h1>
                <h2>Mökkivarausjärjestelmä</h2>
                <h3 style={{ color: 'red' }}>Käyttäjä {userName}</h3>
                <ul className="header">
                  <li><NavLink to="/">Kotisivu</NavLink></li>
                  <li><NavLink to={`/customer/${customerId}`}>Omat tiedot</NavLink></li>
                  <li><NavLink to="/reservation">Varaukset</NavLink></li>
                  <li><NavLink to="/about">Meistä</NavLink></li>
                  <li><NavLink to="/contact">Yhteystiedot</NavLink></li>
                </ul>
                <ul className="header">
                  <button>KIRJAUDU ULOS</button>
                </ul>
              </div>
              <div className="content">
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/resort" component={Resort} />
                  <Route path="/cabin" component={Cabin} />
                  <Route path="/service" component={Service} />
                  <Route path={`/customer/${customerId}`} component={Customer} />
                  <Route path="/reservation" component={Reservation} />
                  <Route path="/invoice" component={Invoice} />
                  <Route path="/about" component={About} />
                  <Route path="/contact" component={Contact} />
                  <Route path="*" component={NotFound} />
                </Switch>
              </div>
            </div>
          </HashRouter >
        </ReservationContext.Provider>
      );
    }

    if (userRole === 2) {
      return (
        //<ReservationContext.Provider value={this.state}> TÄMÄ ORKKIS KIVI JA KEPPI VERSIO 1#
        <ReservationContext.Provider value={{
          data: this.state,
          updateData: (asiakasData) => {
            console.log("asiakasData: ", asiakasData);
            console.log("asiakasData.userRole: ", asiakasData.userRole);
            this.setState({ uusiData: asiakasData })
          }
        }}>
          <HashRouter>
            <div>
              <div>
                <p>Rooli {userRole}</p>
                <h1>Village People Oy</h1>
                <h2>Mökkivarausjärjestelmä</h2>
                <h2 style={{ color: 'red' }}>MÖKIN OMISTAJA {userName}</h2>
                <ul className="header">
                  <li><NavLink to="/">Kotisivu</NavLink></li>
                  <li><NavLink to={`/customer/${customerId}`}>Omat tiedot</NavLink></li>
                  <li><NavLink to="/cabin">Omat mökit</NavLink></li>
                  <li><NavLink to="/reservation">Omien mökkien varaukset</NavLink></li>
                  <li><NavLink to="/about">Meistä</NavLink></li>
                  <li><NavLink to="/contact">Yhteystiedot</NavLink></li>
                </ul>
                <ul className="header">
                  <button>KIRJAUDU ULOS</button>
                </ul>

              </div>

              <div className="content">
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/resort" component={Resort} />
                  <Route path="/cabin" component={Cabin} />
                  <Route path="/service" component={Service} />
                  <Route path={`/customer/${customerId}`} component={Customer} />
                  <Route path="/reservation" component={Reservation} />
                  <Route path="/invoice" component={Invoice} />
                  <Route path="/about" component={About} />
                  <Route path="/contact" component={Contact} />
                  <Route path="*" component={NotFound} />
                </Switch>
              </div>
            </div>
          </HashRouter >
        </ReservationContext.Provider>
      );
    }

    if (userRole === 3) {
      return (
        //<ReservationContext.Provider value={this.state}> TÄMÄ ORKKIS KIVI JA KEPPI VERSIO 1#
        <ReservationContext.Provider value={{
          data: this.state,
          updateData: (asiakasData) => {
            console.log("asiakasData: ", asiakasData);
            console.log("asiakasData.userRole: ", asiakasData.userRole);
            this.setState({ uusiData: asiakasData })
          }
        }}>
          <HashRouter>
            <div>
              <div>
                <p>Rooli {userRole}</p>
                <h1>Village People Oy</h1>
                <h2>Mökkivarausjärjestelmä</h2>
                <h3 style={{ color: 'red' }}>ADMIN {userName}</h3>
                <ul className="header">
                  <li><NavLink to="/">Kotisivu</NavLink></li>
                  <li><NavLink to="/resort">Toimipaikat</NavLink></li>
                  <li><NavLink to="/cabin">Mökit</NavLink></li>
                  <li><NavLink to="/service">Palvelut</NavLink></li>
                  <li><NavLink to="/customer">Asiakkaat</NavLink></li>
                  <li><NavLink to="/reservation">Varaukset</NavLink></li>
                  <li><NavLink to="/invoice">Laskut</NavLink></li>
                </ul>
                <ul className="header">
                  <button>KIRJAUDU ULOS</button>
                </ul>
              </div>

              <div className="content">
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/resort" component={Resort} />
                  <Route path="/cabin" component={Cabin} />
                  <Route path="/service" component={Service} />
                  <Route path="/customer" component={Customer} />
                  <Route path="/reservation" component={Reservation} />
                  <Route path="/invoice" component={Invoice} />
                  <Route path="/about" component={About} />
                  <Route path="/contact" component={Contact} />
                  <Route path="*" component={NotFound} />
                </Switch>
              </div>
            </div>
          </HashRouter >
        </ReservationContext.Provider>
      );
    }

    if (userRole === 0 || userRole === null) {
      return (
        //<ReservationContext.Provider value={this.state}> TÄMÄ ORKKIS KIVI JA KEPPI VERSIO 1#
        <ReservationContext.Provider value={{
          data: this.state,
          updateData: (asiakasData) => {
            console.log("asiakasData: ", asiakasData);
            console.log("asiakasData.userRole: ", asiakasData.userRole);
            this.setState({ uusiData: asiakasData })
          }
        }}>
          <HashRouter>

            <div>
              <div>
                <p style={{ color: 'red' }}>Rooli {userRole}</p>
                <h1>Village People Oy</h1>
                <h2>Mökkivarausjärjestelmä</h2>
                <ul className="header">
                  <li><NavLink to="/">Kotisivu</NavLink></li>
                  <li><NavLink to="/about">Meistä</NavLink></li>
                  <li><NavLink to="/contact">Yhteystiedot</NavLink></li>
                  <li><NavLink to="/login">Kirjaudu </NavLink> </li>
                  <li><NavLink to="/register">Rekisteröidy</NavLink></li>
                </ul>
              </div>

              <div className="content">
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/resort" component={Resort} />
                  <Route path="/cabin" component={Cabin} />
                  <Route path="/service" component={Service} />
                  <Route path="/customer" component={Customer} />
                  <Route path="/reservation" component={Reservation} />
                  <Route path="/invoice" component={Invoice} />
                  <Route path="/about" component={About} />
                  <Route path="/contact" component={Contact} />
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                  <Route path="*" component={NotFound} />
                </Switch>
              </div>
            </div>
          </HashRouter >
        </ReservationContext.Provider>
      );
    }


  }
} 