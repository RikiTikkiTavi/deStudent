import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "./../Header";
import Dashboard from "./dashboard"
import axios from "axios/index";

//TODO: Set login data in global storage and cache ONCE on login and ONCE on logout. Just read them later.

class UserDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      response: {},
      services: []
    };
  }


  componentDidMount() {

    axios
      .get("/api/getDashboard", {})
      .then(response => {
        console.log(response);
        if (response.data !== 404) {
          this.setState({
            loading: false,
            services: response.data
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <Fragment>
          <Header breadcrumbs={[]} type="page"/>
          <div className="container">
            Loading
          </div>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Header breadcrumbs={[]} type="page"/>
        <Dashboard services={this.state.services}/>
      </Fragment>
    );
  }
}

UserDashboard.propTypes = {};

export default connect((state, props, dispatch) => ({
  dispatch
}))(UserDashboard);
