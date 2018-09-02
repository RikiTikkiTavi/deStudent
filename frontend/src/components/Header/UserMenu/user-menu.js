/* eslint-disable no-underscore-dangle */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

class UserMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <ul className="navbar-nav ml-auto navbar__login">
          <span className="navbar-text">
            <b>Hi, {name}</b>
          </span>
        <form className="form-inline">
          <button
            onclick={this.props.handleLoginFormLogout.bind(this)}
            className="btn btn-primary my-2 my-sm-0 btn-sm">
            Logout
          </button>
        </form>
      </ul>
    )
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
