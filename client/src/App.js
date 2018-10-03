import React, { Component } from "react";
import DrawingPanel from "./components/DrawingPanel";
import Loader from "./components/Loader";
import LoginForm from "./components/LoginForm";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      username: null
    };
  }

  componentDidMount = () => {
    this.checkAuth();
  };

  handleLogIn = username => {
    this.setState({
      username
    });
  };

  handleLogOut = () => {
    fetch("/logout")
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          username: res.username
        });
      });
  };

  checkAuth = () => {
    fetch("/auth")
      .then(res => {
        return res.json();
      })
      .then(res => {
        setTimeout(() => {
          this.setState({
            username: res.username,
            loader: false
          });
        }, 2000);
      });
  };

  render() {
    const { loader, username } = this.state;

    const Routes = (
      <Router>
        <React.Fragment>
          <Switch>
            <Route
              path="/login"
              render={() => <LoginForm handleLogIn={this.handleLogIn} />}
            />
            {!username && !loader && <Redirect to="/login" />}
          </Switch>
          <Route path="/" exact component={DrawingPanel} />
        </React.Fragment>
      </Router>
    );

    return loader ? <Loader /> : Routes;
  }
}

export default App;
