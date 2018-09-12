/* eslint-disable no-underscore-dangle */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class UserMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="navbar-nav ml-auto navbar__login">

        <button className="navbar-text btn btn-link dropdown-toggle" type="button"
                id="dropdownMenuButton" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
          <b>Hi, {this.props.name}</b>
        </button>

        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a>
        </ul>

        <form className="form-inline">
          <button
            onClick={this.props.handleLoginFormLogout.bind(this)}
            className="btn btn-primary my-2 my-sm-0 btn-sm">
            Logout
          </button>
        </form>
      </ul>
    );
  }
}

UserMenu.propTypes = {
  dispatch: PropTypes.func,
  handleLoginFormLogout: PropTypes.func,
  email: PropTypes.string,
  name: PropTypes.string
};

export default connect((state, props, dispatch) => ({
  dispatch
}))(UserMenu);
