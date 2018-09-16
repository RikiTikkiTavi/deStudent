import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DashboardContent from "./dashboard.content";
import DashboardMenu from "./dashboard.menu";

class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <div className={"row"}>
          <div className="col-md-4">
            <DashboardMenu/>
          </div>
          <div className="col-md-8">
            <DashboardContent services={this.props.services}/>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func,
  services: PropTypes.array
};

export default connect((state, props, dispatch) => ({
  dispatch
}))(Dashboard);
