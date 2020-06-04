import React, { useContext, Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import "./login.css";
import CustomerDataService from "../services/customer.service";
import {ReservationContext} from "../myContext"

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default class Login extends Component {
    static contextType = ReservationContext;

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            id: "",
            email: "",
            password: "",
            loading: false,
            message: "",
            submitted: false
        };
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();

        var data = {
            email: this.state.email,
            password: this.state.password,
        };
        /* Jussin esimerkistä tämä - ÄLÄ POISTA! TOIMII
        const ctx = this.context;
        ctx.updateData(data);
        */

        this.form.validateAll();

        CustomerDataService.login(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    companyName: response.data.companyName,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    address: response.data.address,
                    phone: response.data.phone,
                    email: response.data.email,
                    password: response.data.password,
                    details: response.data.details,
                    role: response.data.role,
                    published: response.data.published,
                    submitted: true  
                }, () => {
                    const ctx = this.context;
                    var otaData = {
                        customerId: response.data.id,
                        loggedInUser: response.data.email,
                        userRole: response.data.role,
                    }
                    ctx.updateData(otaData);
                    this.doSomethingWithData(otaData);

                });
                console.log("Tähän tulostuu responsen data: ", response.data);
                return response.json();
            })
            .then(function(jsonData) {
                return JSON.stringify(jsonData);
            }
            ).then(function(jsonStr){
                this.setState({loginData: jsonStr});

            })
            .catch(e => {
                console.log(e);
            });
    }

    doSomethingWithData = (otaData) => {
        console.log("LoginResponse tallennettu Contekstiin: ", otaData)
    }
    
    guide() {
        this.props.history.push("/");
    }

    render() {
        const data = this.context;
        console.log("Data loginista=", data)


        const userRole = data.data.uusiData.userRole;
        console.log("käyttäjän kontekstista saatu rooli on ", userRole);
    
        return (
            <div className="submit-form">
                    {this.state.submitted ? (
                    <div>
                        <h4>Kirjautuminen onnistui!</h4><br />
                        <button className="btn btn-primary" onClick={this.guide.bind(this)}>
                            Etusivulle
                        </button>
                    </div>
                ) : (
                <div className="card card-container">
                    <Form onSubmit={this.handleLogin} ref={c => {this.form = c;}}>
                        <div className="form-group">
                            <label htmlFor="email">Sähköposti</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="email"
                                autoComplete="username"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                validations={[required]}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Salasana</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                autoComplete="current-password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                validations={[required]}/>
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary btn-block"
                                disabled={this.state.loading}>
                                {this.state.loading && (<span className="spinner-border spinner-border-sm"></span>)}
                                <span>Kirjaudu</span>
                            </button>
                        </div>

                        {this.state.message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={c => {
                                this.checkBtn = c;}}/>
                    </Form>
                </div>
                )}
            </div>
        );
    }
}