import React, { Component } from "react";
import ReservationDataService from "../services/reservation.service";
import { Link } from "react-router-dom";
import moment from "moment";
import { ReservationContext } from "../myContext"

export default class ReservationList extends Component {

    static contextType = ReservationContext;
    constructor(props) {
        super(props);
        this.retrieveReservation = this.retrieveReservation.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveReservation = this.setActiveReservation.bind(this);

        this.state = {
            reservation: [],
            currentReservation: null,
            currentIndex: -1,
        };
    }

    componentDidMount() {
        this.retrieveReservation();
    }

    retrieveReservation() {
        const data = this.context;
        const userRole = data.data.uusiData.userRole;

        if (userRole === 2) {
            ReservationDataService.getReservation(userRole)
                .then(response => {
                    this.setState({
                        reservation: response.data
                    });
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
        else
            ReservationDataService.getAll()
                .then(response => {
                    this.setState({
                        reservation: response.data
                    });
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
    }

    refreshList() {
        this.retrieveReservation();
        this.setState({
            currentReservation: null,
            currentIndex: -1
        });
    }

    setActiveReservation(reservation, index) {
        this.setState({
            currentReservation: reservation,
            currentIndex: index
        });
    }

    removeReservation() {
        ReservationDataService.delete()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchChanged = event => {
        this.setState({ search: event.target.value })
    }

    render() {
        const { reservation, currentReservation, currentIndex } = this.state;
        //  const userRole = this.state.uusiData.userRole;

        //  const userName = this.state.uusiData.loggedInUser;
        //  console.log("käyttäjän kontekstista saatu rooli on ", userRole, customerId, userName);

        const data = this.context;
        console.log("Data loginista=", data)
        const customerId = data.data.uusiData.customerId;

        const userRole = data.data.uusiData.userRole;
        console.log("käyttäjän kontekstista saatu rooli on ", userRole);
        console.log("käyttäjän kontekstista saatu id on ", customerId);


        if (userRole === 1) {
            const filteredjson = reservation.filter(function (ownerId) {
                return ownerId.customerId === customerId;
            }
            );
            console.log("suodatettu varausdata: ", filteredjson)
            return (

                <div className="list row">
                    <div className="col-md-6">
                        <h4>Varaukset</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Varauspvm</th>
                                    <th>Aloituspvm</th>
                                    <th>Lopetuspvm</th>
                                    <th>Kokonaishinta</th>
                                    <th>Vahvistettu</th>

                                    <th>Lasku/Id</th>
                                    <th>Mökki/Id</th>
                                </tr>
                            </thead>
                            {filteredjson &&
                                filteredjson.map((filteredjson, index) => (
                                    <tbody key={index}>
                                        <tr className={"table-item " + (index === currentIndex ? "active" : "")}
                                            onClick={() => this.setActiveReservation(filteredjson, index)} key={index}>
                                            <td>{moment(filteredjson.reservationDate).format('DD.MM.YYYY')}</td>
                                            <td>{moment(filteredjson.startDate).format('DD.MM.YYYY')}</td>
                                            <td>{moment(filteredjson.endDate).format('DD.MM.YYYY')}</td>
                                            <td>{filteredjson.totalPrice}</td>
                                            <td>{filteredjson.confirmed}</td>
                                            <td>{filteredjson.invoiceId}</td>
                                            <td>{filteredjson.cabinId}</td>
                                        </tr>
                                    </tbody>
                                ))}
                        </table>
                    </div>
                    <div className="col-md-2">
                    </div>
                    <div className="col-md-4">
                        {currentReservation ? (
                            <div>
                                <h4>Varaus</h4>
                                <div>
                                    <label>
                                        <strong>Id:</strong>
                                    </label>{" "}
                                    {currentReservation.id}
                                </div>
                                <div>
                                    <label>
                                        <strong>Varauspvm:</strong>
                                    </label>{" "}
                                    {currentReservation.reservationDate}
                                </div>
                                <div>
                                    <label>
                                        <strong>Aloituspvm:</strong>
                                    </label>{" "}
                                    {currentReservation.startDate}
                                </div>
                                <div>
                                    <label>
                                        <strong>Lopetuspvm:</strong>
                                    </label>{" "}
                                    {currentReservation.endDate}
                                </div>
                                <div>
                                    <label>
                                        <strong>Kokonaishinta:</strong>
                                    </label>{" "}
                                    {currentReservation.totalPrice}
                                </div>
                                <div>
                                    <label>
                                        <strong>Varauspvm:</strong>
                                    </label>{" "}
                                    {currentReservation.reservationDate}
                                </div>
                                <div>
                                    <label>
                                        <strong>Vahvistettu:</strong>
                                    </label>{" "}
                                    {currentReservation.confirmed}
                                </div>
                                <div>
                                    <label>
                                        <strong>Asiakas/Id:</strong>
                                    </label>{" "}
                                    {currentReservation.customerId}
                                </div>
                                <div>
                                    <label>
                                        <strong>Lasku/Id:</strong>
                                    </label>{" "}
                                    {currentReservation.invoiceId}
                                </div>
                                <div>
                                    <label>
                                        <strong>Mökki/Id:</strong>
                                    </label>{" "}
                                    {currentReservation.cabinId}
                                </div>
                                <Link to={"/reservation/" + currentReservation.id}
                                    className="badge badge-warning">
                                    Tarkastele
                            </Link>
                            </div>
                        ) : (
                                <div>
                                    <p>Valitse varaus listalta</p>
                                </div>
                            )}
                    </div>
                </div>
            );
        }

        else if (userRole === 2) {
            const filteredjson = reservation.filter(function (ownerId) {
                return ownerId.customerId === customerId;
            }
            );
            console.log("suodatettu varausdata: ", filteredjson)
            return (

                <div className="list row">
                    <div className="col-md-6">
                        <h4>Varaukset</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Varauspvm</th>
                                    <th>Aloituspvm</th>
                                    <th>Lopetuspvm</th>
                                    <th>Kokonaishinta</th>
                                    <th>Mökki/Id</th>
                                </tr>
                            </thead>
                            {filteredjson &&
                                filteredjson.map((filteredjson, index) => (
                                    <tbody key={index}>
                                        <tr className={"table-item " + (index === currentIndex ? "active" : "")}
                                            onClick={() => this.setActiveReservation(filteredjson, index)} key={index}>
                                            <td>{moment(filteredjson.reservationDate).format('DD.MM.YYYY')}</td>
                                            <td>{moment(filteredjson.startDate).format('DD.MM.YYYY')}</td>
                                            <td>{moment(filteredjson.endDate).format('DD.MM.YYYY')}</td>
                                            <td>{filteredjson.totalPrice}</td>
                                            <td>{filteredjson.cabinId}</td>
                                        </tr>
                                    </tbody>
                                ))}
                        </table>
                    </div>
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-2">
                        {currentReservation ? (
                            <div>
                                <h4>Varaus</h4>
                                <div>
                                    <label>
                                        <strong>Id:</strong>
                                    </label>{" "}
                                    {currentReservation.id}
                                </div>
                                <div>
                                    <label>
                                        <strong>Varauspvm:</strong>
                                    </label>{" "}
                                    {currentReservation.reservationDate}
                                </div>
                                <div>
                                    <label>
                                        <strong>Aloituspvm:</strong>
                                    </label>{" "}
                                    {currentReservation.startDate}
                                </div>
                                <div>
                                    <label>
                                        <strong>Lopetuspvm:</strong>
                                    </label>{" "}
                                    {currentReservation.endDate}
                                </div>
                                <div>
                                    <label>
                                        <strong>Kokonaishinta:</strong>
                                    </label>{" "}
                                    {currentReservation.totalPrice}
                                </div>
                                <div>
                                    <label>
                                        <strong>Varauspvm:</strong>
                                    </label>{" "}
                                    {currentReservation.reservationDate}
                                </div>
                                <div>
                                    <label>
                                        <strong>Vahvistettu:</strong>
                                    </label>{" "}
                                    {currentReservation.confirmed}
                                </div>
                                <div>
                                    <label>
                                        <strong>Asiakas/Id:</strong>
                                    </label>{" "}
                                    {currentReservation.customerId}
                                </div>
                                <div>
                                    <label>
                                        <strong>Lasku/Id:</strong>
                                    </label>{" "}
                                    {currentReservation.invoiceId}
                                </div>
                                <div>
                                    <label>
                                        <strong>Mökki/Id:</strong>
                                    </label>{" "}
                                    {currentReservation.cabinId}
                                </div>
                                <Link to={"/reservation/" + currentReservation.id}
                                    className="badge badge-warning">
                                    Tarkastele
                            </Link>
                            </div>
                        ) : (
                                <div>
                                    <p>Valitse varaus listalta</p>
                                </div>
                            )}
                    </div>
                </div>
            );
        }
        else
            return (

                <div className="list row">
                    <div className="col-md-6">
                        <Link to={"addreservation"} className="nav-link">
                            Lisää uusi varaus
                    </Link>
                        <h4>Varaukset</h4>
                        <table className="table">
                            <thead>
                                <tr><th>Id</th>
                                    <th>Varauspvm</th>
                                    <th>Aloituspvm</th>
                                    <th>Lopetuspvm</th>
                                    <th>Kokonaishinta</th>
                                    <th>Vahvistettu</th>
                                    <th>Asiakas/Id</th>
                                    <th>Lasku/Id</th>
                                    <th>Mökki/Id</th>
                                </tr>
                            </thead>
                            {reservation &&
                                reservation.map((reservation, index) => (
                                    <tbody key={index}>
                                        <tr className={"table-item " + (index === currentIndex ? "active" : "")}
                                            onClick={() => this.setActiveReservation(reservation, index)} key={index}>
                                            <td>{reservation.id}</td>
                                            <td>{moment(reservation.reservationDate).format('DD.MM.YYYY')}</td>
                                            <td>{moment(reservation.startDate).format('DD.MM.YYYY')}</td>
                                            <td>{moment(reservation.endDate).format('DD.MM.YYYY')}</td>
                                            <td>{reservation.totalPrice}</td>
                                            <td>{reservation.confirmed}</td>
                                            <td>{reservation.customerId}</td>
                                            <td>{reservation.invoiceId}</td>
                                            <td>{reservation.cabinId}</td>

                                        </tr>
                                    </tbody>
                                ))}
                        </table>
                    </div>
                    <div className="col-md-2">


                    </div>
                    <div className="col-md-4">
                        {currentReservation ? (
                            <div>
                                <h4>Varaus</h4>
                                <div>
                                    <label>
                                        <strong>Id:</strong>
                                    </label>{" "}
                                    {currentReservation.id}
                                </div>
                                <div>
                                    <label>
                                        <strong>Varauspvm:</strong>
                                    </label>{" "}
                                    {currentReservation.reservationDate}
                                </div>
                                <div>
                                    <label>
                                        <strong>Aloituspvm:</strong>
                                    </label>{" "}
                                    {currentReservation.startDate}
                                </div>
                                <div>
                                    <label>
                                        <strong>Lopetuspvm:</strong>
                                    </label>{" "}
                                    {currentReservation.endDate}
                                </div>
                                <div>
                                    <label>
                                        <strong>Kokonaishinta:</strong>
                                    </label>{" "}
                                    {currentReservation.totalPrice}
                                </div>
                                <div>
                                    <label>
                                        <strong>Varauspvm:</strong>
                                    </label>{" "}
                                    {currentReservation.reservationDate}
                                </div>
                                <div>
                                    <label>
                                        <strong>Vahvistettu:</strong>
                                    </label>{" "}
                                    {currentReservation.confirmed}
                                </div>
                                <div>
                                    <label>
                                        <strong>Asiakas/Id:</strong>
                                    </label>{" "}
                                    {currentReservation.customerId}
                                </div>
                                <div>
                                    <label>
                                        <strong>Lasku/Id:</strong>
                                    </label>{" "}
                                    {currentReservation.invoiceId}
                                </div>
                                <div>
                                    <label>
                                        <strong>Mökki/Id:</strong>
                                    </label>{" "}
                                    {currentReservation.cabinId}
                                </div>
                                <Link to={"/reservation/" + currentReservation.id}
                                    className="badge badge-warning">
                                    Tarkastele
                            </Link>
                            </div>
                        ) : (
                                <div>
                                    <p>Valitse varaus listalta</p>
                                </div>
                            )}
                    </div>
                </div>
            );
    }
}