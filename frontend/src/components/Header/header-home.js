import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class HeaderHome extends Component {
  render() {
    return (
      <header className="header-home">
        <div className="container text-center">
          <h1>De Student</h1>
          <p className="lead">
            Порталл для получения информации о поступлении в университеты
            Германии
          </p>
          <Link to="/services" className="btn btn-primary btn-lg text-white">
            Получить информацию
          </Link>
          <a className="btn btn-info btn-lg text-white">Как это работает?</a>
        </div>
      </header>
    );
  }
}

export default connect((state, props, dispatch) => ({
  dispatch
}))(HeaderHome);
