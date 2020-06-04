import React, { Component } from "react";
import ReservationDataService from "../services/reservation.service";
import moment from "moment";
import { ReservationContext } from "../myContext";

export default class Reservation extends Component {
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
        this.getReservation = this.getReservation.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateReservation = this.updateReservation.bind(this);
        this.deleteReservation = this.deleteReservation.bind(this);

        this.state = {
            currentReservation: {
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
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getReservation(this.props.match.params.id);
    }

    onChangeReservationDate(e) {
        const reservationDate = e.target.value;

        this.setState(function (prevState) {
            return {
                currentReservation: {
                    ...prevState.currentReservation,
                    reservationDate: reservationDate
                }
            };
        });
    }

    onChangeStartDate(e) {
        const startDate = e.target.value;

        this.setState(function (prevState) {
            return {
                currentReservation: {
                    ...prevState.currentReservation,
                    startDate: startDate
                }
            };
        });
    }

    onChangeEndDate(e) {
        const endDate = e.target.value;

        this.setState(function (prevState) {
            return {
                currentReservation: {
                    ...prevState.currentReservation,
                    endDate: endDate
                }
            };
        });
    }

    onChangeTotalPrice(e) {
        const totalPrice = e.target.value;

        this.setState(function (prevState) {
            return {
                currentReservation: {
                    ...prevState.currentReservation,
                    totalPrice: totalPrice
                }
            };
        });
    }

    onChangeConfirmed(e) {
        const confirmed = e.target.value;

        this.setState(function (prevState) {
            return {
                currentReservation: {
                    ...prevState.currentReservation,
                    confirmed: confirmed
                }
            };
        });
    }

    onChangeCustomerId(e) {
        const customerId = e.target.value;

        this.setState(function (prevState) {
            return {
                currentReservation: {
                    ...prevState.currentReservation,
                    customerId: customerId
                }
            };
        });
    }

    onChangeInvoiceId(e) {
        const invoiceId = e.target.value;

        this.setState(function (prevState) {
            return {
                currentReservation: {
                    ...prevState.currentReservation,
                    invoiceId: invoiceId
                }
            };
        });
    }

    onChangeCabinId(e) {
        const cabinId = e.target.value;

        this.setState(function (prevState) {
            return {
                currentReservation: {
                    ...prevState.currentReservation,
                    cabinId: cabinId
                }
            };
        });
    }

    getReservation(id) {
        ReservationDataService.get(id)
            .then(response => {
                this.setState({
                    currentReservation: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePublished(status) {
        var data = {
            id: this.state.currentReservation.id,
            reservationDate: this.currentReservation.reservationDate,
            startDate: this.currentReservation.startDate,
            endDate: this.currentReservation.endDate,
            totalPrice: this.currentReservation.totalPrice,
            confirmed: this.currentReservation.confirmed,
            customerId: this.currentReservation.customerId,
            invoiceId: this.currentReservation.invoiceId,
            cabinId: this.currentReservation.cabinId,
            published: status
        };

        ReservationDataService.update(this.state.currentReservation.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentReservation: {
                        ...prevState.currentReservation,
                        published: status
                    }
                }));
                console.log(response.data + "tästäkö uudelleenohjaus");
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateReservation() {
        ReservationDataService.update(
            this.state.currentReservation.id,
            this.state.currentReservation
        )
            .then(response => {
                console.log(response.data);
                //alert('Varauksen muokkaus onnistui');
                this.setState({
                    message: "Varauksen muokkaus onnistui",

                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteReservation() {
        ReservationDataService.delete(this.state.currentReservation.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/Reservation-List')
            })
            .catch(e => {
                console.log(e);
            });
    }

    guide() {
        this.props.history.push("/Reservation");
    }

    render() {
        const { currentReservation } = this.state;

        return (
            <div>
                {currentReservation ? (
                    <div className="submit-form">
                        <h4>Muokkaa varauksen tietoja</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="reservationDate">Varauspäivä</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="reservationDate"
                                    value={moment(currentReservation.reservationDate).format("DD.MM.YYYY")}
                                    onChange={this.onChangeReservationDate}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="startDate">Aloituspvm</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="startDate"
                                    value={moment(currentReservation.startDate).format("DD.MM.YYYY")}
                                    onChange={this.onChangeStartDate} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="endDate">Lopetuspvm</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="endDate"
                                    value={moment(currentReservation.endDate).format("DD.MM.YYYY")}
                                    onChange={this.onChangeEndDate} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="totalPrice">Kokonaishinta</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="totalPrice"
                                    defaultValue={currentReservation.totalPrice}
                                    onChange={this.onChangeTotalPrice} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmed">Vahvistettu</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="confirmed"
                                    required
                                    defaultValue={currentReservation.confirmed}
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
                                    defaultValue={currentReservation.customerId}
                                    onChange={this.onChangeCustomerId}
                                    name="customerId" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="invoiceId">Laskutus/Id</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="invoiceId"
                                    defaultValue={currentReservation.invoiceId}
                                    onChange={this.onChangeInvoiceId}
                                    name="invoiceId" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="cabinId">Mökki/Id</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="cabinId"
                                    defaultValue={currentReservation.cabinId}
                                    onChange={this.onChangeCabinId}
                                    name="cabinId" />
                            </div>

                            <button type="submit" onClick={this.updateReservation} className="btn btn-success">
                                Lähetä
                            </button>
                            <button onClick={this.deleteReservation} className="btn btn-danger">
                                Poista
                            </button>
                            <p>{this.state.message}</p>

                        </form>
                    </div>
                ) : (
                        <div>
                        </div>
                    )}
            </div>
        );
    }
}
