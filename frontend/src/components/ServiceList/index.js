/* eslint-disable no-underscore-dangle */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from './../Header';
import ServiceList from './service-list'

import axios from 'axios/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SERVICES: [],
      loading: true
    };
  }

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

  componentDidMount() {
    this._asyncRequest = axios
      .get('/api/get_list_of_services')
      .catch(error => {
        console.log(error);
      })
      .then(response => {
        this._asyncRequest = null;
        this.setState({ SERVICES: response.data, loading: false });
      });
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
    if (this.state.loading) {
      return (
        <Fragment>
          <Header breadcrumbs={BREADCRUMBS} type={'page'} />
        </Fragment>
      );
    }
    const SERVICES = this.state.SERVICES;

    return (
      <Fragment>
        <Header breadcrumbs={BREADCRUMBS} type={'page'} />
        <ServiceList services={SERVICES}/>
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
