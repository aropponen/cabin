import React, { Component } from "react";

import CabinDataService from "../services/cabin.service";
import { Link } from "react-router-dom";

export default class ResortCabin extends Component {
    constructor(props) {
        super(props);
        this.retrieveCabin = this.retrieveCabin.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveCabin = this.setActiveCabin.bind(this);

        this.state = {
            cabin: [],
            currentCabin: null,
            currentIndex: -1,
            search: ""
        };
    }

    componentDidMount() {
        this.retrieveCabin();
    }

    retrieveCabin() {
        CabinDataService.getAll()
            .then(response => {
                this.setState({
                    cabin: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveCabin();
        this.setState({
            currentCabin: null,
            currentIndex: -1
        });
    }

    setActiveCabin(cabin, index) {
        this.setState({
            currentCabin: cabin,
            currentIndex: index
        });
    }

    removeCabin() {
        CabinDataService.delete()
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
        const { currentCabin, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">
                    <input
                        type='text'
                        className="form-control"
                        placeholder="Etsi nimen tai toimipaikan perusteella"
                        onChange={this.searchChanged}
                    />
                    <h4>Mökkien listaus</h4>
                    <table className="table">
                        <thead>
                            <tr>{/*<th>Id</th>*/}
                                <th>Mökin nimi</th>
                                <th>Osoite</th>
                                {/*<th>Hinta per yö</th>
                                <th>Sänkyjä</th>
                                <th>Omistaja/Id</th>
                                <th>Varaukset/Id</th>*/}
                                <th>Toimipaikka/Id</th>
                            </tr>
                        </thead>
                        {this.state.cabin
                            .filter(cabin => cabin.cabinName.includes(this.state.search))
                            .map(cabin => (
                                <tr key={cabin.id} className={"table-item " + (cabin.id === currentIndex ? "active" : "")}
                                    onClick={() => this.setActiveCabin(cabin, cabin.id)}
                                >
                                    {/*<td>{cabin.id}</td>*/}
                                    <td>{cabin.cabinName}</td>
                                    <td>{cabin.address}</td>
                                   {/*} <td>{cabin.pricePerNight}</td>
                                    <td>{cabin.beds}</td>
                            <td>{cabin.ownerId}</td>*/}
                                    <td>{cabin.resortId}</td>
                                </tr>
                            )
                            )}
                    </table>
                </div>
                <div className="col-md-2"></div>
                <div className="col-md-4">
                    {currentCabin ? (
                        <div>
                            <h4>Mökki</h4>
                            <div>
                                <label>
                                    <strong>Id:</strong>
                                </label>{" "}
                                {currentCabin.id}
                            </div>
                            <div>
                                <label>
                                    <strong>Mökin nimi</strong>
                                </label>{" "}
                                {currentCabin.cabinName}
                            </div>
                            <div>
                                <label>
                                    <strong>Osoite:</strong>
                                </label>{" "}
                                {currentCabin.address}
                            </div>
                            <div>
                                <label>
                                    <strong>Hinta per yö:</strong>
                                </label>{" "}
                                {currentCabin.pricePerNight}
                            </div>
                            <div>
                                <label>
                                    <strong>Sänkyjä</strong>
                                </label>{" "}
                                {currentCabin.beds}
                            </div>
                            <div>
                                <label>
                                    <strong>Omistaja/id</strong>
                                </label>{" "}
                                {currentCabin.ownerId}
                            </div>
                            <div>
                                <label>
                                    <strong>Lomakylä/id</strong>
                                </label>{" "}
                                {currentCabin.resortId}
                            </div>

                            <Link to={"/cabin/" + currentCabin.id}
                                className="badge badge-warning">
                                Muokkaa
                            </Link>
                        </div>
                    ) : (
                            <div>
                                <Link to={"/add"} className="nav-link">
                                    Lisää uusi mökki
                                 </Link>
                                <p>Valitse mökki listalta</p>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}