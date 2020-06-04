import React, { Component } from "react";
import CabinDataService from "../services/cabin.service";
import { Link } from "react-router-dom";
import { ReservationContext } from "../myContext";


export default class CabinList extends Component {
    static contextType = ReservationContext;

    constructor(props) {
        super(props);
        this.retrieveCabin = this.retrieveCabin.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveCabin = this.setActiveCabin.bind(this);

        this.state = {
            cabin: [],
            currentCabin: null,
            currentIndex: -1,
            search: "",
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
        const data = this.context;
        const userRole = data.data.uusiData.userRole;

        this.setState({
            currentCabin: cabin,
            currentIndex: index
        });
        if (userRole === 0) {
            const ctx = this.context;
            var otaData = {
                cabinId: this.state.currentIndex,
                userRole: 2
            }
            ctx.updateData(otaData);
        }
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
        const { cabin, currentCabin, currentIndex } = this.state;

        const data = this.context;
        console.log("Data loginista=", data)
        const customerId = data.data.uusiData.customerId;

        const userRole = data.data.uusiData.userRole;
        console.log("käyttäjän kontekstista saatu rooli on ", userRole);
        console.log("käyttäjän kontekstista saatu id on ", customerId);

        if (userRole === 2) {
            const filteredjson = cabin.filter(function (ownerId) {
                return ownerId.customerId === customerId;
            }
            );
            console.log("suodattamaton data: ", cabin)
            console.log("suodatettu varausdata: ", filteredjson)
            return (
                <div className="list row">
                    <div className="col-md-6">
                        <h4>Omien mökkien listaus</h4>
                        <table className="table">
                            <thead>
                                <tr>{/*<th>Id</th>*/}
                                    <th>Mökin nimi</th>
                                    {/*<th>Osoite</th>*/}
                                    <th>Vuorokausihinta</th>
                                    <th>Nukkumapaikkoja</th>
                                    {/*<th>Omistaja/Id</th>
                                    <th>Varaukset/Id</th>*/}
                                    {/* <th>Sijainti</th>*/}
                                </tr>
                            </thead>
                            {filteredjson &&
                                filteredjson.map((filteredjson, index) => (
                                    <tbody key={index}>
                                        <tr className={"table-item " + (index === currentIndex ? "active" : "")}
                                            onClick={() => this.setActiveCabin(filteredjson, index)} key={index}>
                                            {/*<td>{cabin.id}</td>*/}
                                            <td>{filteredjson.cabinName}</td>
                                            {/*<td>{cabin.address}</td>*/}
                                            <td>{filteredjson.pricePerNight}</td>
                                            <td>{filteredjson.beds}</td>
                                            {/*<td>{cabin.customerId}</td>
                                        <td>{cabin.reservationId}</td>*/}
                                            {/*    <td>{filteredjson.resortId}</td>*/}
                                        </tr>
                                    </tbody>
                                ))}
                        </table>
                    </div>
                    <div className="col-md-3"></div>
                    <div className="col-md-3">
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
                                    {currentCabin.customerId}
                                </div>
                                <div>
                                    <label>
                                        <strong>Varaus/id</strong>
                                    </label>{" "}
                                    {currentCabin.reservationId}
                                </div>
                                <div>
                                    <label>
                                        <strong>Lomakylä/id</strong>
                                    </label>{" "}
                                    {currentCabin.resortId}
                                </div>
                                <Link to={"/cabin/" + currentCabin.id}
                                    className="badge badge-warning">
                                    Lisätiedot
                                </Link>

                                <Link to={"/addcustomer"}
                                    className="badge badge-info">
                                    Tee varaus
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
        else
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
                                    {/*<th>Osoite</th>*/}
                                    <th>Vuorokausihinta</th>
                                    <th>Nukkumapaikkoja</th>
                                    {/*<th>Omistaja/Id</th>
                                <th>Varaukset/Id</th>*/}
                                    <th>Sijainti</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.cabin
                                    .filter(cabin => cabin.cabinName.includes(this.state.search))

                                    .map(cabin => (
                                        <tr key={cabin.id} className={"table-item " + (cabin.id === currentIndex ? "active" : "")}
                                            onClick={() => this.setActiveCabin(cabin, cabin.id)}>
                                            {/*<td>{cabin.id}</td>*/}
                                            <td>{cabin.cabinName}</td>
                                            {/*<td>{cabin.address}</td>*/}
                                            <td>{cabin.pricePerNight}</td>
                                            <td>{cabin.beds}</td>
                                            {/*<td>{cabin.customerId}</td>
                                    <td>{cabin.reservationId}</td>*/}
                                            <td>{cabin.resortId}</td>
                                        </tr>
                                    )
                                    )}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-3"></div>
                    <div className="col-md-3">
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
                                    {currentCabin.customerId}
                                </div>
                                <div>
                                    <label>
                                        <strong>Varaus/id</strong>
                                    </label>{" "}
                                    {currentCabin.reservationId}
                                </div>
                                <div>
                                    <label>
                                        <strong>Lomakylä/id</strong>
                                    </label>{" "}
                                    {currentCabin.resortId}
                                </div>
                                <Link to={"/cabin/" + currentCabin.id}
                                    className="badge badge-warning">
                                    Lisätiedot
                            </Link>

                                <Link to={"/addcustomer"}
                                    className="badge badge-info">
                                    Tee varaus
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