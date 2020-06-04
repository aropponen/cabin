//TÄLLÄ KOMPONENTILLA HOIDETAAN ASIAKKAAN MUUTOKSET

import React, { Component } from "react";
import CustomerDataService from "../services/customer.service";

export default class Customer extends Component {
    constructor(props) {
        super(props);
        this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeDetails = this.onChangeDetails.bind(this);
        this.onChangeReservation = this.onChangeReservation.bind(this);
        this.getCustomer = this.getCustomer.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);

        this.state = {
            currentCustomer: {},
            message: ""
        };
    }

    componentDidMount() {
        this.getCustomer(this.props.match.params.id);
    }

    onChangeCompanyName(e) {
        const companyname = e.target.value;

        this.setState(function (prevState) {
            return {
                currentCustomer: {
                    ...prevState.currentCustomer,
                    companyName: companyname
                }
            };
        });
    }

    onChangeFirstName(e) {
        const firstname = e.target.value;

        this.setState(prevState => ({
            currentCustomer: {
                ...prevState.currentCustomer,
                firstName: firstname
            }
        }));
    }

    onChangeLastName(e) {
        const lastname = e.target.value;

        this.setState(prevState => ({
            currentCustomer: {
                ...prevState.currentCustomer,
                lastName: lastname
            }
        }));
    }

    onChangeAddress(e) {
        const address = e.target.value;

        this.setState(prevState => ({
            currentCustomer: {
                ...prevState.currentCustomer,
                address: address
            }
        }));
    }

    onChangePhone(e) {
        const phone = e.target.value;

        this.setState(prevState => ({
            currentCustomer: {
                ...prevState.currentCustomer,
                phone: phone
            }
        }));
    }

    onChangeEmail(e) {
        const email = e.target.value;

        this.setState(prevState => ({
            currentCustomer: {
                ...prevState.currentCustomer,
                email: email
            }
        }));
    }


    onChangeDetails(e) {
        const details = e.target.value;

        this.setState(prevState => ({
            currentCustomer: {
                ...prevState.currentCustomer,
                details: details
            }
        }));
    }

    onChangeReservation(e) {
        const reservation = e.target.value;

        this.setState(prevState => ({
            currentCustomer: {
                ...prevState.currentCustomer,
                reservation: reservation
            }
        }));
    }

    getCustomer(id) {
        CustomerDataService.get(id)
            .then(response => {
                this.setState({
                    currentCustomer: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteCustomer(id) {
        CustomerDataService.delete(this.state.currentCustomer.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/customer')
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePublished(status) {
        var data = {
            id: this.state.currentCustomer.id,
            firstName: this.state.currentCustomer.firstname,
            lastName: this.state.currentCustomer.lastName,
            address: this.state.currentCustomer.address,
            phone: this.state.currentCustomer.phone,
            email: this.state.currentCustomer.email,
            details: this.state.currentCustomer.details,
            reservation: this.state.currentCustomer.reservation,
            published: status
        };

        CustomerDataService.update(this.state.currentCustomer.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentCustomer: {
                        ...prevState.currentCustomer,
                        published: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateCustomer() {
        CustomerDataService.update(
            this.state.currentCustomer.id,
            this.state.currentCustomer
        )
            .then(response => {
                console.log(response.data);
                alert('Asiakkaan muokkaus onnistui');
                this.setState({
                    message: "Asiakkaan muokkaus onnistui"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }



    render() {
        const { currentCustomer } = this.state;

        return (
            <div>
                {currentCustomer ? (
                    <div className="edit-form">
                        <h4>Muokkaa asiakkaan tietoja</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Id</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="id"
                                    value={currentCustomer.id}
                                    onChange={this.onChangeId}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="companyName">Yrityksen nimi</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="companyName"
                                    value={currentCustomer.companyName}
                                    onChange={this.onChangeCompanyName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="firstName">Etunimi</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    value={currentCustomer.firstName}
                                    onChange={this.onChangeFirstName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Sukunimi</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    value={currentCustomer.lastName}
                                    onChange={this.onChangeLastName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Osoite</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    value={currentCustomer.address}
                                    onChange={this.onChangeAddress}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Puhelin</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    value={currentCustomer.phone}
                                    onChange={this.onChangePhone}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Sähköposti</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    value={currentCustomer.email}
                                    onChange={this.onChangeEmail}
                                />
                            </div>
                            <button onClick={this.updateCustomer} className="btn btn-success">
                                Lähetä
                            </button>
                            <button onClick={this.deleteCustomer} className="btn btn-danger">
                                Poista
                            </button>
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