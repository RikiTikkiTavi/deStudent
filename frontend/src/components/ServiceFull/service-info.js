import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ServiceInfo extends Component {
  render() {
    return <Fragment>HI {this.props.serviceInfo.content}</Fragment>;
  }
}

ServiceInfo.propTypes = {
  dispatch: PropTypes.func,
  serviceInfo: PropTypes.object
};

export default connect((state, props, dispatch) => ({
  dispatch
}))(ServiceInfo);
