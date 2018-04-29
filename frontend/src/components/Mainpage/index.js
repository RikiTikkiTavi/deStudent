import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../Header';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header pageType={"home"}/>
        <div className="container-fluid">
          <div className="row" />
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
