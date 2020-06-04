import React, { Component } from "react";
import "./App.css";
import { ReservationContext } from "./myContext";

export default class Contact extends Component {
    static contextType = ReservationContext;

    render() {
      /* EKAT TOIMIVAT CONTEXTIN YRITYKSET, EI HÄVITETÄ
      const joku = this.context;
      console.log("x=", joku)
      let luku = joku.number;
      joku.number = 300;
      let data = joku.customerData.loggedUser;*/

    return (
        <div className="Contact">
            <p>Ota yhteyttä</p>
           {/*} <p>{luku}</p>
            <p>{data}</p>*/}
            <div>
                <form action="/action_page.php">
                    <label>Etunimi</label>
                    <input type="text" id="fname" name="firstname" placeholder="Etunimesi..." />
                    <label>Sukunimi</label>
                    <input type="text" id="lname" name="lastname" placeholder="Sukunimesi.." />
                    <label>Sähköposti</label>
                    <input type="email" id="email" name="email" placeholder="Sähköpostisi.." />
                    <label>Kommentti</label>
                    <textarea id="subject" name="subject" placeholder="Risuja, ruusuja vai kenties ehdotus? Kerro se tähän..."></textarea>
                    <input type="submit" value="Lähetä" />
                </form>
            </div>
            <div>
                <p>Village People Oy </p>                      
                <p>Karjalankatu 3</p>
                <p>80200 JOENSUU</p>
            </div>
        </div>
      );
    }
}