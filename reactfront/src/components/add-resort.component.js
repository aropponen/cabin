import React, { Component } from "react";
import ResortDataService from "../services/resort.service";
import { ReservationContext } from "../myContext";

export default class AddResort extends Component {
    static contextType = ReservationContext;
    constructor(props) {
        super(props);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveResort = this.saveResort.bind(this);
        this.newResort = this.newResort.bind(this);

        this.state = {
            id: null,
            location: "",
            description: "",
            published: false,
            submitted: false
        };
    }

    onChangeLocation(e) {
        this.setState({
            location: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    saveResort() {
        var data = {
            location: this.state.location,
            description: this.state.description
        };

        ResortDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    location: response.data.location,
                    description: response.data.description,
                    published: response.data.published,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newResort() {
        this.setState({
            id: null,
            location: "",
            description: "",
            published: false,
            submitted: false
        });
    }

    guide() {
        this.props.history.push("/Resort");
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Toimipaikka lisätty onnistuneesti</h4>
                        <button className="btn btn-primary" onClick={this.guide.bind(this)}>
                            Etusivulle
                        </button>
                        <button className="btn btn-success" onClick={this.newResort}>
                            Lisää uusi toimipaikka
                        </button>
                    </div>
                ) : (
                        <div>
                            <h2>Lisää uusi toimipaikka</h2>
                            <div className="form-group">
                                <label htmlFor="location">Toimipaikan nimi</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="location"
                                    required
                                    value={this.state.location}
                                    onChange={this.onChangeLocation}
                                    name="location"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Kuvaus</label>
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

                            <button onClick={this.saveResort} className="btn btn-success">
                                Lisää
                            </button>
                        </div>
                    )}
            </div>
        );
    }
}