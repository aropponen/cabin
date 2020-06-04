import React, { Component } from "react";
import CustomerDataService from "../services/customer.service";
import { ReservationContext } from "../myContext";

export default class AddCustomer extends Component {
    static contextType = ReservationContext;
    constructor(props) {
        super(props);
        this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.onChangeDetails = this.onChangeDetails.bind(this);
        this.saveCustomer = this.saveCustomer.bind(this);
        this.newCustomer = this.newCustomer.bind(this);

        this.state = {
            id: null,
            companyName: "",
            firstName: "",
            lastName: "",
            address: "",
            phone: "",
            email: "",
            password: "",

            details: "",
            published: false,
            submitted: false
        };
    }

    onChangeCompanyName(e) {
        this.setState({
            companyName: e.target.value
        });
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeDetails(e) {
        this.setState({
            details: e.target.value
        });
    }

    onChangeReservationId(e) {
        this.setState({
            reservationId: e.target.value
        });
    }

    saveCustomer() {
        var data = {
            companyName: this.state.companyName,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phone: this.state.phone,
            email: this.state.email,
            password: this.state.password,

            details: this.state.details,
            reservationId: this.state.reservationId
        };

        CustomerDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    companyName: response.data.companyName,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    address: response.data.address,
                    phone: response.data.phone,
                    email: response.data.email,
                    password: response.data.password,
                    details: response.data.details,
                    published: response.data.published,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newCustomer() {
        this.setState({
            id: null,
            companyName: "",
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            password: "",

            details: "",
            published: false,
            submitted: false
        });
    }

    guide() {
        this.props.history.push("/Customer");
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Aiakas lisätty onnistuneesti</h4>
                        <button className="btn btn-primary" onClick={this.guide.bind(this)}>
                            Etusivulle
                        </button>
                        <button className="btn btn-success" onClick={this.newCustomer}>
                            Lisää uusi asiakas
                        </button>

                    </div>
                ) : (
                        <div>
                            <h2>Lisää uusi asiakas</h2>
                            <div className="form-group">
                                <label htmlFor="companyName">Yrityksen nimi</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="companyName"
                                    value={this.state.companyName}
                                    onChange={this.onChangeCompanyName}
                                    name="companyname"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="firstName">Etunimi</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    required
                                    value={this.state.firstName}
                                    onChange={this.onChangeFirstName}
                                    name="firstname"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName">Sukunimi</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    required
                                    value={this.state.lastName}
                                    onChange={this.onChangeLastName}
                                    name="lastname"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">Osoite</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    required
                                    value={this.state.address}
                                    onChange={this.onChangeAddress}
                                    name="address"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Puhelin</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    required
                                    value={this.state.phone}
                                    onChange={this.onChangePhone}
                                    name="phone"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Sähköposti</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    required
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                    name="email"
                                />
                            </div>


                            <div className="form-group">
                                <label htmlFor="password">Salasana</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="password"
                                    required
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                    name="password"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="details">Lisätiedot</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="details"
                                    value={this.state.details}
                                    onChange={this.onChangeDetails}
                                    name="details"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="reservationId">VarausId</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="resrevationId"
                                    value={this.state.reservationId}
                                    onChange={this.onChangeReservationId}
                                    name="reservationId"
                                />
                            </div>

                            <button onClick={this.saveCustomer} className="btn btn-success">
                                Lisää
                            </button>

                        </div>
                    )}
            </div>
        );
    }
}