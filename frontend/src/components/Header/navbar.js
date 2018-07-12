import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
        id="mainNav">
        <div className="container">
          <Link className="navbar-brand js-scroll-trigger" to="/">
            De Student
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/services">
                  Услуги
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link js-scroll-trigger" href="#about">
                  О нас
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default connect((state, props, dispatch) => ({
  dispatch
}))(Navbar);
