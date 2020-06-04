import React, { Component } from "react";
import ResortDataService from "../services/resort.service";
import { Link } from "react-router-dom";

export default class NewReservation extends Component {
    constructor(props) {
        super(props);
        this.retrieveResort = this.retrieveResort.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveResort = this.setActiveResort.bind(this);

        this.state = {
            resort: [],
            currentResort: null,
            currentIndex: -1,
            search: ""
        };
    }

    componentDidMount() {
        this.retrieveResort();
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

    refreshList() {
        this.retrieveResort();
        this.setState({
            currentResort: null,
            currentIndex: -1
        });
    }

    setActiveResort(resort, index) {
        this.setState({
            currentResort: resort,
            currentIndex: index
        });
    }

    removeResort() {
        ResortDataService.delete()
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
        const { currentResort, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">
                    <input
                        type='text'
                        className="form-control"
                        placeholder="Etsi sijainnin perusteella"
                        onChange={this.searchChanged} />
                    <div className="input-group-append">
                    </div>
                    <h4>Toimipaikkojen listaus</h4>
                   
                    <table className="table">
                        <thead>
                            <tr>
                            <th>Lomakeskus</th>
                            <th>Kuvaus</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.resort
                            .filter(resort => resort.location.includes(this.state.search))
                            .map(resort => (
                                <tr key={resort.id} className={"table-item " + (resort.id === currentIndex ? "active" : "")}
                                    onClick={() => this.setActiveResort(resort, resort.id)}>
                                    <td>{resort.location}</td>
                                    <td>{resort.description}</td>
                                </tr>
                            )
                            )}
                    </tbody>
                    </table>
                </div>
                <div className="col-md-2"></div>
                <div className="col-md-4">
                    {currentResort ? (
                        <div>
                            <h4>Valitse tarkastellaksesi alueen mökkejä</h4>
                            <div>
                                <label>
                                    <strong>Lomakeskus</strong>
                                </label>{" "}
                                {currentResort.location}
                            </div>
                            <div>
                                <label>
                                    <strong>Kuvaus:</strong>
                                </label>{" "}
                                {currentResort.description}
                            </div>

                            <Link to={"/resort/cabin/" + currentResort.id}
                                className="badge badge-warning">
                                Valitse
                            </Link>
                        </div>
                    ) : (
                        <div>
                            
                        </div>
                        )}
                </div>
            </div>
        );
    }
}