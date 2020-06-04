import React, { Component } from "react";
import CabinDataService from "../services/cabin.service";
import ResortDataService from "../services/resort.service";
import CustomerDataService from "../services/customer.service";
import { ReservationContext } from "../myContext"


export default class AddCabin extends Component {
    static contextType = ReservationContext;

    constructor(props) {
        super(props);
        this.onChangeCabinName = this.onChangeCabinName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangePricePerNight = this.onChangePricePerNight.bind(this);
        this.onChangeBeds = this.onChangeBeds.bind(this);
        this.onChangeCustomerId = this.onChangeCustomerId.bind(this);
        this.onChangeReservationId = this.onChangeReservationId.bind(this);
        this.onChangeResortId = this.onChangeResortId.bind(this);
        this.saveCabin = this.saveCabin.bind(this);
        this.newCabin = this.newCabin.bind(this);
        this.retrieveResort = this.retrieveResort.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveResort = this.setActiveResort.bind(this);
        this.retrieveCustomer = this.retrieveCustomer.bind(this);
        this.setActiveCustomer = this.setActiveCustomer.bind(this);

        this.state = {
            id: null,
            cabinName: "",
            address: "",
            pricePerNight: "",
            beds: "",
            customerId: null,
            reservationId: "",
            resortId: null,
            published: false,
            submitted: false,
            resort: [],
            customer: []
        };
    }

    componentDidMount() {
        this.retrieveResort();
        this.retrieveCustomer();
    }

    retrieveResort() {
        ResortDataService.getAll()
            .then(response => {
                this.setState({
                    resort: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
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
        this.retrieveResort();
        this.retrieveCustomer();
        this.setState({
            currentResort: null,
            currentCustomer: null,
            currentIndex: -1,
            currentCustomerIndex: -1,
        });
    }

    setActiveResort(resort, index) {
        this.setState({
            currentResort: resort,
            currentIndex: index
        });
    }

    setActiveCustomer(customer, index) {
        this.setState({
            currentCustomer: customer,
            currentCustomerIndex: index
        });
    }

    onChangeCabinName(e) {
        this.setState({
            cabinName: e.target.value
        });
    }

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onChangePricePerNight(e) {
        this.setState({
            pricePerNight: e.target.value
        });
    }

    onChangeBeds(e) {
        this.setState({
            beds: e.target.value
        });
    }

    onChangeCustomerId(e) {
        this.setState({
            customerId: e.target.value
        });
    }

    onChangeReservationId(e) {
        this.setState({
            reservationId: e.target.value
        });
    }
    onChangeResortId(e) {
        this.setState({
            resortId: e.target.value
        });
    }

    saveCabin() {
        var data = {
            cabinName: this.state.cabinName,
            address: this.state.address,
            pricePerNight: parseFloat(this.state.pricePerNight),
            beds: parseInt(this.state.beds),
            customerId: parseInt(this.state.customerId),
            resortId: parseInt(this.state.resortId),
        };

        CabinDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    cabinName: response.data.cabinName,
                    address: response.data.address,
                    pricePerNight: response.data.pricePerNight,
                    beds: response.data.beds,
                    customerId: response.data.customerId,
                    resortId: response.data.resortId,
                    published: response.data.published,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newCabin() {
        this.setState({
            id: "",
            cabinName: "",
            address: "",
            pricePerNight: "",
            beds: "",
            customerId: "",
            reservationId: "",
            resortId: "",
            published: false,
            submitted: false
        });
    }

    guide() {
        this.props.history.push("/Cabin");
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Mökki lisätty onnistuneesti</h4>
                        <button className="btn btn-primary" onClick={this.guide.bind(this)}>
                            Etusivulle
                        </button>
                        <button className="btn btn-success" onClick={this.newCabin}>
                            Lisää uusi mökki
                        </button>
                    </div>
                ) : (
                        <div>
                            <h2>Lisää uusi mökki</h2>
                            <div className="form-group">
                                <label htmlFor="cabinName">Mökin nimi</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cabinName"
                                    required
                                    value={this.state.cabinName}
                                    onChange={this.onChangeCabinName}
                                    name="cabinName"
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
                                <label htmlFor="pricePerNight">Hinta yöltä</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="pricePerNight"
                                    required
                                    value={this.state.pricePerNight}
                                    onChange={this.onChangePricePerNight}
                                    name="pricePerNight"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="beds">Nukkumapaikkoja</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="beds"
                                    required
                                    value={this.state.beds}
                                    onChange={this.onChangeBeds}
                                    name="beds"
                                />
                            </div>

                            <div className="drop-down">
                                <label htmlFor="customerId">Omistaja/id</label>
                                <select id="customerId" onChange={this.onChangeCustomerId}>
                                    {this.state.customer.map((customer) =>
                                        <option key={this.state.customerId} value={customer.id} >{customer.lastName}, {customer.firstName}</option>)}
                                </select>
                            </div>

                            <div className="drop-down">
                                <label htmlFor="resortId">Lomakylä/id</label>
                                <select id="resortId" onChange={this.onChangeResortId}>
                                    {this.state.resort.map((resort) =>
                                        <option key={this.state.resortId} value={resort.id} >{resort.location}</option>)}
                                </select>
                            </div>
                            <button onClick={this.saveCabin} className="btn btn-success">
                                Lisää
                            </button>
                        </div>
                    )}
            </div>
        );
    }
}