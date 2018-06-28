import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ServiceFullDescription extends Component {
  render() {
    const { service } = this.props;

    return (
      <Fragment>
        <div className="row">
          <div className="col-12">
            <p> {service.description} </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button
              onClick={this.props.handleNext.bind(this)}
              className="btn btn-primary">
              Далее
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}

ServiceFullDescription.propTypes = {
  dispatch: PropTypes.func,
  service: PropTypes.object,
  handleNext: PropTypes.func
};

export default connect((state, props, dispatch) => ({
  dispatch
}))(ServiceFullDescription);
