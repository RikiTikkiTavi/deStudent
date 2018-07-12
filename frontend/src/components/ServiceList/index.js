import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from './../Header';
import SERVICES from './list-of-services';

class App extends Component {
  createBreadcrumbs(SERVICE) {
    const breadcrumbs = [
      {
        title: 'Услуги',
        link: '/services',
        is_active: true
      }
    ];
    return breadcrumbs;
  }

  animate() {
    console.log('ANIMATE');
    /* this.el.parentNode.parentNode.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(20)' }],
      {
        duration: 200,
        iterations: 1
      }
    ); */
  }

  render() {
    const BREADCRUMBS = this.createBreadcrumbs('');

    return (
      <Fragment>
        <Header breadcrumbs={BREADCRUMBS} type={'page'} />
        <div className="container service-list__container">
          <div className="row">
            {SERVICES.map((service, index) => {
              let cols;
              service.type === 'small' ? (cols = 4) : (cols = 12);
              return (
                <div key={index} className={`col-md-${cols}`}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{service.name}</h5>
                      <p className="card-text">{service.description}</p>
                      <Link
                        ref={e => (this.el = e)}
                        onClick={this.animate.bind(this)}
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
      </Fragment>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func
};

export default connect((state, props, dispatch) => ({
  dispatch
}))(App);
