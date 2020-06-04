import React, { Component } from "react";
import ReservationDataService from "../services/reservation.service";
import { ReservationContext } from "../myContext";

export default class AddReservation extends Component {
    static contextType = ReservationContext;
    constructor(props) {
        super(props);
        this.onChangeReservationDate = this.onChangeReservationDate.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.onChangeTotalPrice = this.onChangeTotalPrice.bind(this);
        this.onChangeConfirmed = this.onChangeConfirmed.bind(this);
        this.onChangeCustomerId = this.onChangeCustomerId.bind(this);
        this.onChangeInvoiceId = this.onChangeInvoiceId.bind(this);
        this.onChangeCabinId = this.onChangeCabinId.bind(this);
        this.saveReservation = this.saveReservation.bind(this);
        this.newReservation = this.newReservation.bind(this);

        this.state = {
            id: null,
            reservationDate: "",
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
        var data = {
            reservationDate: this.state.reservationDate,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            totalPrice: parseFloat(this.state.totalPrice),
            confirmed: parseInt(this.state.confirmed),
            customerId: parseInt(this.state.customerId),
            invoiceId: parseInt(this.state.invoiceId),
            cabinId: parseInt(this.state.cabinId),
        };

        ReservationDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    reservationDate: response.data.reservationDate,
                    startDate: response.data.startDate,
                    endDate: response.data.endDate,
                    totalPrice: response.data.totalPrice,
                    confirmed: response.data.confirmed,
                    customerId: response.data.customerId,
                    invoiceId: response.data.invoiceId,
                    cabinId: response.data.cabinId,
                    published: response.data.published,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newReservation() {
        this.setState({
            id: null,
            reservationDate: "",
            startDate: "",
            endDate: "",
            totalPrice: "",
            confirmed: "",
            customerId: null,
            invoiceId: "",
            cabinId: "",
            published: false,
            submitted: false
        });
    }

    guide() {
        this.props.history.push("/Addreservation");
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Varaus lisätty onnistuneesti</h4>
                        <button className="btn btn-primary" onClick={this.guide.bind(this)}>
                            Etusivulle
                        </button>
                        <button className="btn btn-success" onClick={this.newReservation}>
                            Lisää uusi varaus
                        </button>
                    </div>
                ) : (
                        <div>
                            <h2>Lisää uusi varaus</h2>
                            <div className="form-group">
                                <label htmlFor="reservationDate ">Varauspvm</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="reservationDate"
                                    required
                                    value={this.state.reservationDate}
                                    onChange={this.onChangeReservationDate}
                                    name="reservationDate"
                                    defaultValue={Date} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="startDate">Aloituspvm</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="startDate"
                                    required
                                    value={this.state.startDate}
                                    onChange={this.onChangeStartDate}
                                    name="startDate" />
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
                                    name="endDate" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="totalPrice">Kokonaishinta</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="totalPrice"
                                    required
                                    value={this.state.totalPrice}
                                    onChange={this.onChangeTotalPrice}
                                    name="totalPrice" />
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
                                    name="confirmed" />
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
                                    name="customerId" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="invoiceId">Laskutus/Id</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="invoiceId"
                                    required
                                    value={this.state.invoiceId}
                                    onChange={this.onChangeInvoiceId}
                                    name="invoiceId" />
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
                                    name="cabinId" />
                            </div>

                            <button onClick={this.saveReservation} className="btn btn-success">
                                Lisää
                            </button>
                        </div>
                    )}
            </div>
        );
    }
}