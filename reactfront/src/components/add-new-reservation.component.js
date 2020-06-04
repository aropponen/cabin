import React, { Component } from "react";
import ReservationDataService from "../services/reservation.service";
import moment from "moment";
import {ReservationContext} from "../myContext"

export default class AddReservation extends Component {
    static contextType = ReservationContext;

    constructor(props) {
        super(props);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.onChangeTotalPrice = this.onChangeTotalPrice.bind(this);
        this.onChangeConfirmed =  this.onChangeConfirmed.bind(this);
        this.onChangeCustomerId = this.onChangeCustomerId.bind(this);
        this.onChangeInvoiceId = this.onChangeInvoiceId.bind(this);
        this.onChangeCabinId = this.onChangeCabinId.bind(this);
        this.saveReservation = this.saveReservation.bind(this);
        this.newReservation = this.newReservation.bind(this);

        this.state = {
            id: null,
            startDate: "",
            endDate: "",
            totalPrice: "",
            confirmed: "",
            customerId: "",
            invoiceId: "",
            cabinId: "",
            published: false,
            submitted: false
        };
    }

    onChangeReservationDate(e) {
        this.setState({
            reservationDate: e.target.value
        });
    }

    onChangeStartDate(e) {
        this.setState({
            startDate: e.target.value
        });
    }

    onChangeEndDate(e) {
        this.setState({
            endDate: e.target.value
        });
    }

    onChangeTotalPrice(e) {
        this.setState({
            totalPrice: e.target.value
        });
    }

    onChangeConfirmed(e) {
        this.setState({
            confirmed: e.target.value
        });
    }

    onChangeCustomerId(e) {
        this.setState({
            customerId: e.target.value
        });
    }

    onChangeInvoiceId(e) {
        this.setState({
            invoiceId: e.target.value
        });
    }

    onChangeCabinId(e) {
        this.setState({
            cabinId: e.target.value
        });
    }

    saveReservation() {
        const ctx = this.context;
        const idForCustomer = ctx.data.uusiData.customerId;
        const idForCabin = ctx.data.uusiData.cabinId;
        var data = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            totalPrice: parseFloat(this.state.totalPrice),
            confirmed: 0,
            customerId: parseInt(idForCustomer),
            invoiceId: parseInt(this.state.invoiceId),
            cabinId: parseInt(idForCabin),
        };

        ReservationDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    startDate: response.data.startDate,
                    endDate: response.data.endDate,
                    totalPrice: response.data.totalPrice,
                    confirmed: response.data.confirmed,
                    customerId: response.data.customerId,
                    invoiceId: response.data.invoiceId,
                    cabinId: response.data.cabinId,
                    published: response.data.published,
                    submitted: true,
                }, () => {
                    var reservData = {
                        customerId: ctx.data.uusiData.customerId,
                        userRole: ctx.data.uusiData.userRole,
                        cabinId: ctx.data.uusiData.cabinId,
                        firstName: ctx.data.uusiData.firstName,
                        lasName: ctx.data.uusiData.lastName,                        reservationId: response.data.id,
                        startDate: response.data.startDate,
                        endDate: response.data.endDate,
                    }
                    ctx.updateData(reservData);
                    this.teeJotainDatalla(reservData);
                });
                console.log(response.data);
                return response.json();
            })
            .then(function(jsonData) {
                return JSON.stringify(jsonData);
            }
            ).then(function(jsonStr){
                this.setState({apiData: jsonStr});
                console.log(jsonStr)
            })
            .catch(e => {
                console.log(e);
            });
    }

    newReservation() {
        this.setState({
                id: null,
                startDate: "",
                endDate: "",
                totalPrice: "",
                confirmed: 0,
                customerId: "",
                invoiceId: "",
                cabinId: "",
                published: false,
                submitted: false        
        });
    }

    teeJotainDatalla = (reservData) => {
        console.log("ReservDatasta contekxtiin", reservData)
    }

    guide(){
        this.props.history.push("/addservice");
    }

    render() {
        const data = this.context;
        console.log("add-new-reservista tulostetaan koko context Data: ", data)
        const idForCustomer = data.data.uusiData.customerId;
        const idForCabin = data.data.uusiData.cabinId;
        const nameFirst = data.data.uusiData.firstName;
        const nameLast = data.data.uusiData.lastName;
        const starting = data.data.uusiData.startDate;
        const ending = data.data.uusiData.endDate;

        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                    <h4>Varausesi on tallennettu onnistuneesti!</h4>
                <p>{nameFirst}{nameLast} olet tehnyt varauksen ajalle {moment(starting).format('DD.MM.YYYY')}-{moment(ending).format('DD.MM.YYYY')}.</p>
                    <h3>Lisää ohjelmaa lomallesi valitsemalla seuraavaksi retkiä, palveluita tai vuokraa harrastusvälineitä! </h3>
                        <button className="btn btn-primary" onClick={this.guide.bind(this)}>
                        Ei kiitos, palaan etusivulle
                        </button>

                        <button className="btn btn-primary" onClick={this.addService}>
                        Lisäpalveluihin
                        </button>


                    </div>
                ) : (
                        <div>
                            <h2>Lisää uusi varaus</h2>
{/*                         <div className="form-group">
                                <label htmlFor="reservationDate ">Varauspvm</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="reservationDate"
                                    required
                                    value={this.state.reservationDate}
                                    onChange={this.onChangeReservationDate}
                                    name="reservationDate"
                                    defaultValue={Date}/>
                            </div>     
*/}
                            <div className="form-group">
                                <label htmlFor="startDate">Aloituspvm</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="startDate"
                                    required
                                    value={this.state.startDate}
                                    onChange={this.onChangeStartDate}
                                    name="startDate"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="endDate">Lopetuspvm</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="endDate"
                                    required
                                    value={this.state.endDate}
                                    onChange={this.onChangeEndDate}
                                    name="endDate"/>
                            </div>

{/*                         <div className="form-group">
                                <label htmlFor="totalPrice">Kokonaishinta</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="totalPrice"
                                    required
                                    value={this.state.totalPrice}
                                    onChange={this.onChangeTotalPrice}
                                    name="totalPrice"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmed">Vahvistettu</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="confirmed"
                                    required
                                    value={this.state.confirmed}
                                    onChange={this.onChangeConfirmed}
                                    name="confirmed"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="customerId">Asiakas/Id</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="customerId"
                                    required
                                    value={this.state.customerId}
                                    onChange={this.onChangeCustomerId}
                                    name="customerId"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="cabinId">Mökki/Id</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cabinId"
                                    required
                                    value={this.state.cabinId}
                                    onChange={this.onChangeCabinId}
                                    name="cabinId"/>
                            </div>
*/}
                            <div className="form-group">
                                <label htmlFor="customerId">Asiakas Id</label>
                                <input readOnly
                                    value={idForCustomer}
                                    name="customerId"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="cabinId">Mökki Id</label>
                                <input readOnly
                                    value={idForCabin}
                                    name="cabinId"/>
                            </div>

                            <button onClick={this.saveReservation} className="btn btn-success">
                            Tee varaus
                            </button>
                        </div>
                    )}
            </div>
        );
    }
}