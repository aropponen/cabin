import React, { Component } from "react";
import CabinDataService from "../services/cabin.service";
import { ReservationContext } from "../myContext";

export default class Cabin extends Component {
    static contextType = ReservationContext;
    constructor(props) {
        super(props);
        this.onChangeId = this.onChangeId.bind(this);
        this.onChangeCabinName = this.onChangeCabinName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangePricePerNight = this.onChangePricePerNight.bind(this);
        this.onChangeBeds = this.onChangeBeds.bind(this);
        this.onChangeCustomerId = this.onChangeCustomerId.bind(this);
        this.onChangeResortId = this.onChangeResortId.bind(this);
        this.getCabin = this.getCabin.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateCabin = this.updateCabin.bind(this);
        this.deleteCabin = this.deleteCabin.bind(this);

        this.state = {
            currentCabin: {
                id: "",
                cabinName: "",
                address: "",
                pricePerNight: "",
                beds: "",
                customerId: "",
                resortId: "",
                published: false,
                submitted: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getCabin(this.props.match.params.id);
    }

    onChangeId(e) {
        const id = e.target.value;

        this.setState(prevState => ({
            currentId: {
                ...prevState.currentCabin,
                id: id
            }
        }));
    }

    onChangeCabinName(e) {
        const cabinName = e.target.value;

        this.setState(function (prevState) {
            return {
                currentCabin: {
                    ...prevState.currentCabin,
                    cabinName: cabinName
                }
            };
        });
    }

    onChangeAddress(e) {
        const address = e.target.value;

        this.setState(prevState => ({
            currentCabin: {
                ...prevState.currentCabin,
                address: address
            }
        }));
    }

    onChangePricePerNight(e) {
        const pricePerNight = e.target.value;

        this.setState(prevState => ({
            currentCabin: {
                ...prevState.currentCabin,
                pricePerNight: pricePerNight
            }
        }));
    }

    onChangeBeds(e) {
        const beds = e.target.value;

        this.setState(prevState => ({
            currentCabin: {
                ...prevState.currentCabin,
                beds: beds
            }
        }));
    }

    onChangeCustomerId(e) {
        const customerId = e.target.value;

        this.setState(prevState => ({
            currentCabin: {
                ...prevState.currentCabin,
                customerId: customerId
            }
        }));
    }

    onChangeResortId(e) {
        const resortId = e.target.value;

        this.setState(prevState => ({
            currentCabin: {
                ...prevState.currentCabin,
                resortId: resortId
            }
        }));
    }
    getCabin(id) {
        CabinDataService.get(id)
            .then(response => {
                this.setState({
                    currentCabin: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePublished(status) {
        var data = {
            id: this.state.currentCabin.id,
            cabinName: this.state.currentCabin.cabinName,
            address: this.state.currentCustomer.address,
            pricePerNight: this.state.currentCabin.pricePerNight,
            beds: this.state.currentCabin.beds,
            customerId: this.state.currentCabin.customerId,
            resortId: this.state.currentCabin.resortId,
            published: status
        };

        CabinDataService.update(this.state.currentCabin.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentCabin: {
                        ...prevState.currentCabin,
                        published: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateCabin() {
        CabinDataService.update(
            this.state.currentCabin.id,
            this.state.currentCabin
        )
            .then(response => {
                console.log(response.data);
                //alert('Mökin muokkaus onnistui');
                this.setState({
                    message: "Mökin muokkaus onnistui"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteCabin() {
        CabinDataService.delete(this.state.currentCabin.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/cabin')
            })
            .catch(e => {
                console.log(e);
            });
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        const { currentCabin } = this.state;

        return (
            <div>
                {currentCabin ? (
                    <div className="edit-form">
                        <h4>Muokkaa mökin tietoja</h4>
                        <form>

                            <div className="form-group">
                                <label htmlFor="cabinName">Mökin nimi</label>
                                <input type="text"
                                    className="form-control"
                                    id="cabinName"
                                    value={currentCabin.cabinName}
                                    onChange={this.onChangeCabinName} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Osoite</label>
                                <input type="text"
                                    className="form-control"
                                    id="address"
                                    value={currentCabin.address}
                                    onChange={this.onChangeAddress} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pricePerNight">Vuorokausihinta</label>
                                <input type="text"
                                    className="form-control"
                                    id="pricePerNight"
                                    value={currentCabin.pricePerNight}
                                    onChange={this.onChangePricePerNight} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="beds">Nukkumapaikkoja</label>
                                <input type="text"
                                    className="form-control"
                                    id="beds"
                                    value={currentCabin.beds}
                                    onChange={this.onChangeBeds} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="customerId">Omistaja Id</label>
                                <input type="text"
                                    className="form-control"
                                    id="customerId"
                                    value={currentCabin.customerId}
                                    onChange={this.onChangeCustomerId} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="resortId">Sijainti Id</label>
                                <input type="text"
                                    className="form-control"
                                    id="resortId"
                                    value={currentCabin.resortId}
                                    onChange={this.onChangeResortId} />
                            </div>
                            <button onClick={this.updateCabin} className="btn btn-success">
                                Tallenna
                            </button>
                            <button onClick={this.deleteCabin} className="btn btn-danger">
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