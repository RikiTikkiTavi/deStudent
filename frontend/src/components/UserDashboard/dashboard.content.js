import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ServiceList from "../ServiceList/service-list";

class DashboardContent extends Component {
  render() {
    return (
      <div class="tab-content" id="v-pills-tabContent">
        <div class="tab-pane fade show active"
             id="v-pills-profile"
             role="tabpanel"
             aria-labelledby="v-pills-profile-tab">
          <ServiceList services={this.props.services}/>
        </div>
        <div class="tab-pane fade"
             id="v-pills-services"
             role="tabpanel"
             aria-labelledby="v-pills-services-tab">
          <ServiceList services={this.props.services}/>
        </div>
      </div>
    );
  }
}

DashboardContent.propTypes = {
  dispatch: PropTypes.func,
  services: PropTypes.array
};

export default connect((state, props, dispatch) => ({
  dispatch
}))(DashboardContent);
