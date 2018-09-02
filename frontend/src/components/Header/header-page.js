import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Breadcrumbs from './breadcrumbs';
import PropTypes from 'prop-types';

class HeaderPage extends Component {
  render() {
    return (
      <Fragment>
        <header className="header-page">
          <div className="container text-center">
            <div className="row">
              <div className="col-12">
                <h1 className="header-page__heading">
                  De Student
                  <br />
                  <small className="text-muted header-page__text-small">
                    Получить информацию
                  </small>
                </h1>
              </div>
            </div>
          </div>
        </header>
        <Breadcrumbs breadcrumbs={this.props.breadcrumbs} />
      </Fragment>
    );
  }
}

HeaderPage.propTypes = {
  breadcrumbs: PropTypes.array
};

export default connect((state, props, dispatch) => ({
  dispatch
}))(HeaderPage);
