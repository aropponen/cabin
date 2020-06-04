import React, { Component } from "react";
import ServiceDataService from "../services/service.service";
import { Link } from "react-router-dom";

export default class ServiceList extends Component {
    constructor(props) {
        super(props);
        this.retrieveService = this.retrieveService.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveService = this.setActiveService.bind(this);

        this.state = {
            service: [],
            currentService: null,
            currentIndex: -1,
            search: ""
        };
    }

    componentDidMount() {
        this.retrieveService();
    }

    retrieveService() {
        ServiceDataService.getAll()
            .then(response => {
                this.setState({
                    service: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveService();
        this.setState({
            currentService: null,
            currentIndex: -1
        });
    }

    setActiveService(service, index) {
        this.setState({
            currentService: service,
            currentIndex: index
        });
    }

    removeService() {
        ServiceDataService.delete()
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
        const { currentService, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">

                    <input
                        type='text'
                        className="form-control"
                        placeholder="Etsi palvelun nimen perusteella"
                        onChange={this.searchChanged}
                    />
                    <h4>Palveluiden listaus</h4>
                    <table className="table">
                        <thead>
                            <tr><th>id</th>
                                <th>Palvelun nimi</th>
                                <th>Lisätietoja</th>
                                <th>Palvelun hinta</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.service
                            .filter(service => service.serviceName.includes(this.state.search))
                            .map(service => (
                                <tr key={service.id} className={"table-item " + (service.id === currentIndex ? "active" : "")}
                                    onClick={() => this.setActiveService(service, service.id)}
                                >
                                    <td>{service.id}</td>
                                    <td>{service.serviceName}</td>
                                    <td>{service.description}</td>
                                    <td>{service.pricePerService}</td>
                                </tr>
                            )
                            )}
                    </tbody>
                    </table>
                </div>
                <div className="col-md-2"></div>
                <div className="col-md-4">
                    {currentService ? (
                        <div>
                            <h4>Palvelu</h4>
                            <div>
                                <label>
                                    <strong>Id:</strong>
                                </label>{" "}
                                {currentService.id}
                            </div>
                            <div>
                                <label>
                                    <strong>Palvelun nimi</strong>
                                </label>{" "}
                                {currentService.serviceName}
                            </div>
                            <div>
                                <label>
                                    <strong>Lisätietoja palvelusta:</strong>
                                </label>{" "}
                                {currentService.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Palvelun hinta:</strong>
                                </label>{" "}
                                {currentService.pricePerService}
                            </div>


                            <Link
                                to={"/service/" + currentService.id}
                                className="badge badge-warning"
                            > Muokkaa</Link>
                        </div>
                    ) : (
                            <div>
                                <Link to={"/add"} className="nav-link">
                                    Lisää uusi palvelu
                                 </Link>
                                <p>Valitse palvelu listalta</p>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}