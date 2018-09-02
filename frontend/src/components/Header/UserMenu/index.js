/* eslint-disable no-underscore-dangle */
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import LoginForm from "./login-form";
import axios from "axios/index";
import UserMenu from "./user-menu";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginData: null
    };
  }

  componentDidMount() {
    this._asyncRequest = axios
      .get("/api/is_logged_in", {})
      .then(response => {
        this._asyncRequest = null;
        if (response.data !== false) {
          this.setState({
            loginData: {
              loggedIn: true,
              name: response.data.name
            }
          });
        } else {
          this.setState({
            loginData: {
              loggedIn: false,
              name: ""
            }
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  handleLoginFormChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleLoginFormLogout(e) {
    e.preventDefault();
    axios
      .post("/api/logout", {})
      .then(() => {
        this.setState({
          loginData: {
            loggedIn: false,
            name: ""
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleLoginFormSubmit(e) {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("/api/login", data)
      .then(response => {
        this.setState({
          loginData: {
            loggedIn: true,
            name: response.data.name
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.state.loginData) {
      const { loggedIn, name } = this.state.loginData;
      if (loggedIn) {
        return (
          <UserMenu name={name}
                    email={this.state.email}
                    handleLoginFormLogout={this.handleLoginFormLogout.bind(this)}
          />
        );
      }
    }
    return (
      <Fragment>
        <LoginForm
          loginData={this.state.loginData}
          password={this.state.password}
          email={this.state.email}
          handleLoginFormSubmit={this.handleLoginFormSubmit.bind(this)}
          handleLoginFormChange={this.handleLoginFormChange.bind(this)}
        />
      </Fragment>
    );
  }
}

export default connect((state, props, dispatch) => ({
  dispatch
}))(App);
