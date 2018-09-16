import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ServiceList extends Component {
  render() {
    let SERVICES = this.props.services
    return (
      <div className="container service-list__container">
        <div className="row">
          {SERVICES.map((service, index) => {
            let cols;
            service.size === 'small' ? (cols = 4) : (cols = 12);
            return (
              <div key={index} className={`col-md-${cols}`}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{service.name}</h5>
                    <p className="card-text">{service.description}</p>
                    <Link
                      ref={e => (this.el = e)}
                      to={`/services/${service.id}`}
                      className="btn btn-primary text-light">
                      Далее
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

ServiceList.propTypes = {
  dispatch: PropTypes.func,
  services: PropTypes.array
};

export default connect((state, props, dispatch) => ({
  dispatch
}))(ServiceList);
