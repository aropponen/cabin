import React, { Component } from "react";
import ServiceDataService from "../services/service.service";

export default class AddService extends Component {
    constructor(props) {
        super(props);
        this.onChangeServiceName = this.onChangeServiceName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePricePerService = this.onChangePricePerService.bind(this);
        this.onChangeServiceProviderId = this.onChangeServiceProviderId.bind(this);
        this.onChangeServiceProvider = this.onChangeServiceProvider.bind(this);
        this.onChangeReservedService = this.onChangeReservedService.bind(this);
        this.onChangeResortServices = this.onChangeResortServices.bind(this);
        this.saveService = this.saveService.bind(this);
        this.newService = this.newService.bind(this);

        this.state = {
            id: null,
            serviceName: "",
            description: "",
            pricePerService: "",
            serviceProviderId: "",
            serviceProvider: "",
            reservedService: [],
            resortServices: [],
            published: false,
            submitted: false
        };
    }

    onChangeId(e) {
        this.setState({
            id: e.target.value
        });
    }

    onChangeServiceName(e) {
        this.setState({
            serviceName: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangePricePerService(e) {
        this.setState({
            pricePerService: e.target.value
        });
    }

    onChangeServiceProviderId(e) {
        this.setState({
            serviceProviderId: e.target.value
        });
    }

    
    onChangeServiceProvider(e) {
        this.setState({
            serviceProvider: e.target.value
        });
    }

    onChangeReservedService(e) {
        this.setState({
            reservedService: e.target.value
        });
    }
    onChangeResortServices(e) {
        this.setState({
            resortServices: e.target.value
        });
    }

    saveService() {
        var data = {
            serviceName: this.state.serviceName,
            description: this.state.description,
            pricePerService: parseFloat(this.state.pricePerService),
            serviceProviderId: parseInt(this.state.serviceProviderId),
            serviceProvider: parseInt(this.state.serviceProvider),
            reservedService: parseInt(this.state.reservedService),
            resortServices: parseInt(this.state.resortServices),
            
        };

        ServiceDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    serviceName: response.data.serviceName,
                    description: response.data.description,
                    pricePerService: response.data.pricePerService,
                    serviceProviderId: response.data.serviceProviderId,
                    //serviceProvider: response.data.serviceProvider,
                    //reservedService: response.data.reservedService,
                    //resortServices: response.data.resortServices,
                    published: response.data.published,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newService() {
        this.setState({
            id: "",
            serviceName: "",
            description: "",
            pricePerService: "",
            serviceProviderId: "",
            serviceProvider: "",
            reservedService: [],
            resortServices: [],
            published: false,
            submitted: false
        });
    }

    guide(){
        this.props.history.push("/Service");
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Palvelu lisätty onnistuneesti</h4>
                        <button className="btn btn-primary" onClick={this.guide.bind(this)}>
                            Etusivulle
                        </button>
                        <button className="btn btn-success" onClick={this.newService}>
                            Lisää uusi palvelu
                        </button>

                    </div>
                ) : (
                        <div>
                            <h2>Lisää uusi palvelu</h2>
                            <div className="form-group">
                                <label htmlFor="location">Palvelun nimi</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="serviceName"
                                    value={this.state.serviceName}
                                    onChange={this.onChangeServiceName}
                                    name="servicename"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Lisätietoja palvelusta</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    required
                                    value={this.state.description}
                                    onChange={this.onChangeDescription}
                                    name="description"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Palvelun hinta</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="pricePerService"
                                    required
                                    value={this.state.pricePerService}
                                    onChange={this.onChangePricePerService}
                                    name="pricePerService"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Palvelun tuottajan id</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="id"
                                    required
                                    value={this.state.serviceProviderId}
                                    onChange={this.onChangeServiceProviderId}
                                    name="serviceProviderId"
                                />
                            </div>

                            

                            <button onClick={this.saveService} className="btn btn-success">
                                Lisää
                            </button>

                        </div>
                    )}
            </div>
        );
    }
}