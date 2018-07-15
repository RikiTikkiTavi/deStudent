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

  handleLogout(e) {
    e.preventDefault();
    axios
      .post('/api/logout', {})
      .then(() => {
        this.setState({
          loginData: {
            loggedIn: false,
            name: ''
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
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
      return <span style={{ color: 'white' }} />;
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
          placeholder="Пароль"
          aria-label="Password"
          value={this.state.password}
          onChange={this.handleChange.bind(this)}
        />
        <div className="btn-group btn-group-sm">
          <button
            onClick={this.handleSubmit.bind(this)}
            className="btn btn-primary my-2 my-sm-0 btn-sm">
            Вход
          </button>
          <button
            type="button"
            className="login-form__toggle btn my-2 my-sm-0 btn-sm btn-primary dropdown-toggle dropdown-toggle-split"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            <span className="sr-only">Toggle Dropdown</span>
          </button>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="#">Вход</a>
            <a className="dropdown-item" href="#">Регистрация</a>
          </div>
        </div>
      </form>
    );
    if (loggedIn) {
      html = (
        <ul className="navbar-nav ml-auto navbar__login">
          <span className="navbar-text">
            <b>Привет, {name}</b>
          </span>
          <form className="form-inline">
            <button
              onClick={this.handleLogout.bind(this)}
              className="btn btn-primary my-2 my-sm-0 btn-sm">
              Выход
            </button>
          </form>
        </ul>
      );
    }

    return html;
  }
}

export default connect((state, props, dispatch) => ({
  dispatch
}))(LoginForm);
