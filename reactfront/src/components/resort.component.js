//TÄLLÄ KOMPONENTILLA HOIDETAAN RESORTIN MUUTOKSET, VASTAA GET/5 KUTSUUN, EI VIELÄ JUURIKAAN KÄYTÖSSÄ

import React, { Component } from "react";
import ResortDataService from "../services/resort.service";

export default class Resort extends Component {
    constructor(props) {
        super(props);
        this.onChangeId = this.onChangeId.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getResort = this.getResort.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateResort = this.updateResort.bind(this);
        this.deleteResort = this.deleteResort.bind(this);

        this.state = {
            currentResort: {
                id: null,
                location: "",
                description: "",
                published: false,
                submitted: false
              },
            message: ""
            };
        }

    componentDidMount() {
        this.getResort(this.props.match.params.id);
    }

    onChangeId(e) {
        const id = e.target.value;

        this.setState(function (prevState) {
            return {
                currentResort: {
                    ...prevState.currentResort,
                    id: id
                }
            };
        });
    }


    onChangeLocation(e) {
        const location = e.target.value;

        this.setState(function (prevState) {
            return {
                currentResort: {
                    ...prevState.currentResort,
                    location: location
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentResort: {
                ...prevState.currentResort,
                description: description
            }
        }));
    }

    getResort(id) {
        ResortDataService.get(id)
            .then(response => {
                this.setState({
                    currentResort: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePublished(status) {
        var data = {
            id: this.state.currentResort.id,
            location: this.state.currentResort.location,
            description: this.state.currentResort.description,
            published: status
        };

        ResortDataService.update(this.state.currentResort.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentResort: {
                        ...prevState.currentResort,
                        published: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateResort() {
        ResortDataService.update(
            this.state.currentResort.id,
            this.state.currentResort
        )
            .then(response => {
                console.log(response.data);
                //alert('Toimipaikan muokkaus onnistui');
                this.props.history.push('/Resort')
                this.setState({
                    message: "Toimipaikan muokkaus onnistui"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteResort() {
        ResortDataService.delete(this.state.currentResort.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/Resort')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentResort } = this.state;

        return (
            <div>
                {currentResort ? (
                    <div className="edit-form">
                        <h4>Muokkaa toimipaikkaa</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="location">Toimipaikka</label>
                                <input type="text"
                                    className="form-control"
                                    id="location"
                                    value={currentResort.location}
                                    onChange={this.onChangeLocation}/>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="description">Kuvaus</label>
                                <input type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentResort.description}
                                    onChange={this.onChangeDescription}/>
                            </div>
                            <button onClick={this.updateResort} className="btn btn-success">
                                Lähetä
                            </button>
                            <button onClick={this.deleteResort} className="btn btn-danger">
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