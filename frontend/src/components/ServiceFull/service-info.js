import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ServiceInfo extends Component {
  render() {
    return (
      <Fragment>
        <div className="row">
          <div className="col-12">
            <p>{this.props.serviceInfo.content}</p>
          </div>
        </div>
      </Fragment>
    );
  }
}

ServiceInfo.propTypes = {
  dispatch: PropTypes.func,
  serviceInfo: PropTypes.object
};

export default connect((state, props, dispatch) => ({
  dispatch
}))(ServiceInfo);
