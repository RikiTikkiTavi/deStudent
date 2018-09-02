/* eslint-disable no-underscore-dangle */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

class LoginForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.loginData === null) {
      return <span style={{ color: "white" }}/>;
    }
    return (
      <form className="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-sm-2 form-control-sm"
          type="email"
          name="email"
          placeholder="Email"
          aria-label="Email"
          value={this.props.email}
          onChange={this.props.handleLoginFormChange.bind(this)}
        />
        <input
          className="form-control mr-sm-2 form-control-sm"
          name="password"
          type="password"
          placeholder="Password"
          aria-label="Password"
          value={this.props.password}
          onChange={this.props.handleLoginFormChange.bind(this)}
        />
        <button
          onClick={this.props.handleLoginFormSubmit.bind(this)}
          className="btn btn-primary my-2 my-sm-0 btn-sm">
          Login
        </button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  dispatch: PropTypes.func,
  handleLoginFormSubmit: PropTypes.func,
  handleLoginFormChange: PropTypes.func,
  email: PropTypes.string,
  password: PropTypes.string,
  loginData: PropTypes.object
};

export default connect((state, props, dispatch) => ({
  dispatch
}))(LoginForm);
