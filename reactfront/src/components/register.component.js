import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";

import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import CustomerDataService from "../services/customer.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Täytä tämä kenttä!
      </div>
    );
  }
};

const vfirstname = value => {
  if (value.length < 2 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Etunimen tulee olla 2-20 merkiä pitkä
      </div>
    );
  }
};

const vlastname = value => {
  if (value.length < 2 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Sukunimen tulee olla 2-20 merkiä pitkä.
      </div>
    );
  }
};

const vcompanyname = value => {
  if (value.length < 2 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Nimen tulee olla 2-20 merkiä pitkä.
      </div>
    );
  }
};

const vaddress = value => {
  if (value.length < 2 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Osoitteen tulee olla 2-40 merkiä pitkä.
      </div>
    );
  }
};

const vphone = value => {
  if (value.length < 8 || value.length > 15) {
    return (
      <div className="alert alert-danger" role="alert">
        Numeron tulee olla oikeassa muodossa.
      </div>
    );
  }
};

const vemail = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Ei kelvollinen sähköpostiosoite
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Salasanan tulee olla 6-40 merkkiä pitkä.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.saveCustomer = this.saveCustomer.bind(this);

    this.state = {
      id: null,
      companyName: "",
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      email: "",
      password: "",
      role: 0,
      message: "",
      submitted: false
    };
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }

  onChangeCompanyName(e) {
    this.setState({
      companyName: e.target.value
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
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

  onChangeRole(e) {
    this.setState({
      role: e.target.value
    });
  }

  saveCustomer(e) {
    e.preventDefault();


    var data = {
      companyName: this.state.companyName,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phone: this.state.phone,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role,
      details: this.state.details,
    };

    CustomerDataService.create(data)
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
          submitted: true,
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  guide() {
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Rekisteröityminen onnistui!</h4><br />
            <button className="btn btn-primary" onClick={this.guide.bind(this)}>
              Etusivulle
          </button>
          </div>
        ) : (
            <div className="card card-container">
              <Form onSubmit={this.saveCustomer} ref={c => { this.form = c; }}>
                <h5>Täytä allaolevat tiedot</h5>
                <div className="form-group">
                  <label htmlFor="firstname">Etunimi</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="firstname"
                    value={this.state.firstName}
                    onChange={this.onChangeFirstName}
                    validations={[required, vfirstname]} />
                </div>

                <div className="form-group">
                  <label htmlFor="lastname">Sukunimi</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="lastname"
                    value={this.state.lastName}
                    onChange={this.onChangeLastName}
                    validations={[required, vlastname]} />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Osoite</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="address"
                    value={this.state.address}
                    onChange={this.onChangeAddress}
                    validations={[required, vaddress]} />
                </div>

                <div className="form-group">
                  <label htmlFor="username">Puhelin</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.onChangePhone}
                    validations={[required, vphone]} />
                </div>

                <div className="form-group">
                  <label htmlFor="companyName">Yrityksen nimi</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="companyName"
                    value={this.state.companyName}
                    onChange={this.onChangeCompanyName}
                    validations={[vcompanyname]} />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Sähköposti</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, vemail]} />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Salasana</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]} />
                </div>

                <div className="form-group">
                  <label htmlFor="role">Valitse käyttäjärooli</label>
                  <Select
                    type="text"
                    className="form-control"
                    name="role"
                    value={this.state.role}
                    onChange={this.onChangeRole}>
                    <option value="2" >Mökin omistaja</option>
                    <option value="1" >Mökin vuokraaja</option>
                  </Select>
                  <label htmlFor="password">Salasana</label>
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Rekisteröidy</button>
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
                    this.checkBtn = c;
                  }}
                />
              </Form>
            </div>
          )}
      </div>
    );
  }
}