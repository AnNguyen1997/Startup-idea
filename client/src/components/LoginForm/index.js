import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import "./index.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      action: "login",
      redirect: false
    };
  }
  handle = (event, field) => {
    this.setState({
      [field]: event.target.value
    });
  };

  toggleSubmitState = () => {
    this.setState({
      action: this.state.action === "login" ? "register" : "login"
    });
  };

  emptyFields = () => {
    this.setState({
      username: "",
      password: ""
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { action, redirect, ...data } = this.state;
    const submitURL = `/${action}`;

    fetch(submitURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return res.text();
        }
      })
      .then(res => {
        if (action === "login") {
          //handle login
          if (res.username) {
            this.props.handleLogIn(res.username);
            this.setState({ redirect: true });
          } else {
            alert("Wrong username or password!");
            this.emptyFields();
          }
        } else {
          //handle register
          if (res.username) {
            alert("Register success!");
          } else {
            alert(res.message);
            this.emptyFields();
          }
        }
      });
  };

  render() {
    const { action, username, password, redirect } = this.state;

    return (
      <div className="wrap">
        {redirect && <Redirect to="/" />}
        <div className="container">
          <div className="background" />
          <div className="logo">
            <img src="../assets/logo.png" alt="logo" />
          </div>
          <form id="form" onSubmit={this.handleSubmit}>
            <div className="field">
              <span className="label-input">Username</span>
              <div className="smaller-field">
                {" "}
                <i
                  className="fa fa-user icon"
                  style={{
                    position: "relative",
                    left: "-1px"
                  }}
                  aria-hidden="true"
                />
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={e => this.handle(e, "username")}
                />
                <br />
                <span className="focus-border" />
              </div>
            </div>
            <div className="field">
              <span className="label-input">Password</span>
              <div className="smaller-field">
                <i className="fa fa-lock icon" aria-hidden="true" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={e => this.handle(e, "password")}
                />
                <br />
                <span className="focus-border" />
              </div>
            </div>
            <button type="submit" id="submit">
              {action}
            </button>
          </form>

          <div className="forgotPassword" onClick={this.toggleSubmitState}>
            {action === "login"
              ? "Register a new account"
              : "Already have an account?"}
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
