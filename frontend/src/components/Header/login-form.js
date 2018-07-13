/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginData: null
    };
  }

  asyncIsLoggedIn() {

  }

  componentDidMount() {
    this._asyncRequest = axios
      .get('/api/is_logged_in', {})
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
              name: ''
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

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post('/api/login', data)
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
    if (this.state.loginData === null) {
      return (
        <span style={{ color: 'white' }}>
        </span>
      );
    }
    const { loggedIn, name } = this.state.loginData;
    let html = (
      <form className="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-sm-2 form-control-sm"
          type="email"
          name="email"
          placeholder="Email"
          aria-label="Email"
          value={this.state.email}
          onChange={this.handleChange.bind(this)}
        />
        <input
          className="form-control mr-sm-2 form-control-sm"
          name="password"
          type="password"
          placeholder="Password"
          aria-label="Password"
          value={this.state.password}
          onChange={this.handleChange.bind(this)}
        />
        <button
          onClick={this.handleSubmit.bind(this)}
          className="btn btn-primary my-2 my-sm-0 btn-sm">
          Login
        </button>
      </form>
    );
    if (loggedIn) {
      html = (
        <span style={{ color: 'white' }}>
          <b>Hi, {name}</b>
        </span>
      );
    }

    return html;
  }
}

export default connect((state, props, dispatch) => ({
  dispatch
}))(LoginForm);
