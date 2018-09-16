import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class DashboardMenu extends Component {
  render() {
    return (
      <div class="nav flex-column nav-pills"
           id="v-pills-tab"
           role="tablist"
           aria-orientation="vertical">
        <a class="nav-link active"
           id="v-pills-services-tab"
           data-toggle="pill"
           href="#v-pills-services"
           role="tab"
           aria-controls="v-pills-services"
           aria-selected="true">Информация</a>
        <a class="nav-link"
           id="v-pills-profile-tab"
           data-toggle="pill"
           href="#v-pills-profile"
           role="tab"
           aria-controls="v-pills-profile"
           aria-selected="true">Профиль</a>
      </div>
    );
  }
}

DashboardMenu.propTypes = {
  dispatch: PropTypes.func
};

export default connect((state, props, dispatch) => ({
  dispatch
}))(DashboardMenu);
