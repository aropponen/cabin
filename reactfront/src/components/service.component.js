import React, { Component } from "react";
import ServiceDataService from "../services/service.service";

export default class Service extends Component {
    constructor(props) {
        super(props);
        this.onChangeServiceName = this.onChangeServiceName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePricePerService = this.onChangePricePerService.bind(this);
        this.onChangeServiceProviderId = this.onChangeServiceProviderId.bind(this);
        this.onChangeServiceProvider = this.onChangeServiceProvider.bind(this);
        this.onChangeReservedService = this.onChangeReservedService.bind(this);
        this.onChangeResortServices = this.onChangeResortServices.bind(this);
        this.getService = this.getService.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateService = this.updateService.bind(this);
        this.deleteService = this.deleteService.bind(this);

        this.state = {
            currentService: {
                id: "",
                serviceName: "",
                description: "",
                pricePerService: "",
                serviceProviderId: "",
                serviceProvider: "",
                reservedService: "",
                resortServices: "",
                published: false,
                submitted: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getService(this.props.match.params.id);
    }

    onChangeId(e) {
        const id = e.target.value;

        this.setState(function (prevState) {
            return {
                currentId: {
                    ...prevState.currentService,
                    id: id
                }
            };
        });
    }

    onChangeServiceName(e) {
        const servicename = e.target.value;

        this.setState(function (prevState) {
            return {
                currentService: {
                    ...prevState.currentService,
                    serviceName: servicename
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentService: {
                ...prevState.currentService,
                description: description
            }
        }));
    }

    onChangePricePerService(e) {
        const priceperservice = e.target.value;

        this.setState(prevState => ({
            currentService: {
                ...prevState.currentService,
                pricePerService: priceperservice
            }
        }));
    }

    onChangeServiceProviderId(e) {
        const serviceproviderid = e.target.value;

        this.setState(prevState => ({
            currentService: {
                ...prevState.currentService,
                serviceProviderId: serviceproviderid
            }
        }));
    }

    onChangeServiceProvider(e) {
        const serviceprovider = e.target.value;

        this.setState(prevState => ({
            currentService: {
                ...prevState.currentService,
                serviceProvider: serviceprovider
            }
        }));
    }

    onChangeReservedService(e) {
        const reservedservice = e.target.value;

        this.setState(prevState => ({
            currentService: {
                ...prevState.currentService,
                reservedService: reservedservice
            }
        }));
    }
    
    onChangeResortServices(e) {
        const resortservices = e.target.value;

        this.setState(prevState => ({
            currentService: {
                ...prevState.currentService,
                resortServices: resortservices
            }
        }));
    }

    getService(id) {
        ServiceDataService.get(id)
            .then(response => {
                this.setState({
                    currentService: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePublished(status) {
        var data = {
            id: this.state.currentService.id,
            serviceName: this.state.currentService.serviceName,
            description: this.state.currentService.description,
            pricePerService: this.state.currentService.pricePerService,
            phone: this.state.currentCustomer.phone,
            serviceProviderId: this.state.currentService.serviceProviderId,
            serviceProvider: this.state.currentService.serviceProvider,
            reservedService: this.state.currentService.reservedService,
            resortService: this.state.currentService.resortService,
            published: status
        };

        ServiceDataService.update(this.state.currentService.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentService: {
                        ...prevState.currentService,
                        published: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateService() {
        ServiceDataService.update(
            this.state.currentService.id,
            this.state.currentService
        )
            .then(response => {
                console.log(response.data);
                //alert('Palvelun muokkaus onnistui');
                this.setState({
                    message: "Palvelun muokkaus onnistui"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteService() {
        ServiceDataService.delete(this.state.currentService.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/service')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentService } = this.state;

        return (
            <div>
                {currentService ? (
                    <div className="edit-form">
                        <h4>Muokkaa palvelun tietoja</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="id">Id</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="id"
                                    value={currentService.id}
                                    onChange={this.onChangeId}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="lserviceName">Palvelun nimi</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="serviceName"
                                    value={currentService.serviceName}
                                    onChange={this.onChangeServiceName}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Lisätietoja</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentService.description}
                                    onChange={this.onChangeDescription}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="pricePerService">Palvelun hinta</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="pricePerService"
                                    value={currentService.pricePerService}
                                    onChange={this.onChangePricePerService}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="serviceProviderId">Palvelun tuottajan id</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="serviceProviderId"
                                    value={currentService.serviceProviderId}
                                    onChange={this.onChangeServiceProviderId}/>
                            </div>
                            
                            <button onClick={this.updateService} className="btn btn-success">
                                Lähetä
                            </button>
                            <button onClick={this.deleteService} className="btn btn-danger">
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