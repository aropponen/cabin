import React, { Component } from "react";
import CustomerDataService from "../services/customer.service";
import { Link } from "react-router-dom";
import {ReservationContext} from "../myContext";

export default class CustomerList extends Component {
    static contextType = ReservationContext;

    constructor(props) {
        super(props);
        this.retrieveCustomer = this.retrieveCustomer.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveCustomer = this.setActiveCustomer.bind(this);

        this.state = {
            customer: [],
            currentCustomer: null,
            currentIndex: -1,
            search: ""
        };
    }



    componentDidMount() {
        this.retrieveCustomer();
    }

    retrieveCustomer() {
        CustomerDataService.getAll()
            .then(response => {
                this.setState({
                    customer: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveCustomer();
        this.setState({
            currentCustomer: null,
            currentIndex: -1
        });
    }

    setActiveCustomer(customer, index) {
        this.setState({
            currentCustomer: customer,
            currentIndex: index
        });
    }

    removeCustomer() {
        CustomerDataService.delete()
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
        const { currentCustomer, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">

                    <input
                        type='text'
                        className="form-control"
                        placeholder="Etsi nimen perusteella"
                        onChange={this.searchChanged}
                    />
                    <h4>Asiakkaiden listaus</h4>
                    <table className="table">
                        <thead>
                        <tr><th>id</th>
                            <th>Yrityksen nimi</th>
                            <th>Etunimi</th>
                            <th>Sukunimi</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.customer
                            .filter(customer => customer.lastName.includes(this.state.search))
                            .map(customer => (
                                <tr key={customer.id} className={"table-item " + (customer.id === currentIndex ? "active" : "")}
                                    onClick={() => this.setActiveCustomer(customer, customer.id)}
                                >
                                    <td>{customer.id}</td>
                                    <td>{customer.companyName}</td>
                                    <td>{customer.firstName}</td>
                                    <td>{customer.lastName}</td>
                                </tr>
                            )
                            )}
                            </tbody>
                    </table>
                </div>
                <div className="col-md-2"></div>
                <div className="col-md-4">
                    {currentCustomer ? (
                        <div>
                            <h4>Asiakas</h4>
                            <div>
                                <label>
                                    <strong>Id:</strong>
                                </label>{" "}
                                {currentCustomer.id}
                            </div>
                            <div>
                                <label>
                                    <strong>Yrityksen nimi</strong>
                                </label>{" "}
                                {currentCustomer.companyName}
                            </div>
                            <div>
                                <label>
                                    <strong>Etunimi:</strong>
                                </label>{" "}
                                {currentCustomer.firstName}
                            </div>
                            <div>
                                <label>
                                    <strong>Sukunimi:</strong>
                                </label>{" "}
                                {currentCustomer.lastName}
                            </div>
                            <div>
                                <label>
                                    <strong>Osoite</strong>
                                </label>{" "}
                                {currentCustomer.address}
                            </div>
                            <div>
                                <label>
                                    <strong>Sähköposti</strong>
                                </label>{" "}
                                {currentCustomer.email}
                            </div>
                            <div>
                                <label>
                                    <strong>Lisätietoja</strong>
                                </label>{" "}
                                {currentCustomer.details}
                            </div>
                            <Link
                                to={"/customer/" + currentCustomer.id}
                                className="badge badge-warning"
                            > Muokkaa</Link>
                        </div>
                    ) : (
                            <div>
                                <Link to={"/add"} className="nav-link">
                                    Lisää uusi asiakas
                                </Link>
                                <p>Valitse asiakas listalta</p>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}