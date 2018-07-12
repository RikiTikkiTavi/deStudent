import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Header from "./../Header";
import SERVICES from "../ServiceList/list-of-services";
import FORMS from "./forms-object";
import Form from "./form";
import ServiceFullDescription from "./service-full-description";
import Pay from "./pay";
import ServiceInfo from "./service-info";
import ServiceSteps from "./service-steps";
import axios from "axios/index";

/*TODO 1: Form save function -> action to change component, or via ROUTER->render ServiceFull component with new property (think is better)
  TODO:	OR on property in state and if statements
 */
// TODO 2: Payment component
// TODO 3: compose all data POST request -> processing on server LOGIC -> response (Info)

class ServiceFull extends Component {

  constructor(props) {
    super(props);
    this.state = {
      step: "", // fullDescription -> form -> pay -> info
      serviceInfo: {}
    };
    this.formValues = [];

  }

  SERVICE = SERVICES.find((service) => service.id === parseInt(this.props.match.params.id));
  FORM = FORMS.find((form) => form.id === this.SERVICE.id);

  componentDidMount() {
    const filledFormData = this.props.filledFormData;
    if (Object.keys(filledFormData).length !== 0 && filledFormData.formId === this.FORM.id) {
      this.setState(this.props.filledFormData.values);
    }

  }

  componentWillMount() {

    this.FORM.fields.map(field => {
      this.setState({
        [field.id]: ""
      });
    });

    "step" in this.props.match.params ? (
      this.setState({
          step: this.props.match.params.step
        }
      )
    ) : "";

  }

  handleChange(e) {
    const value = e.target.value;
    const id = e.target.id;

    this.setState({ [id]: value });
  }

  handleNext() {
    this.props.history.push(this.props.match.params.id + "/form");
    this.setState({
      step: this.props.match.params.step
    });
  }

  handleServiceFormSubmit() {

    //TODO: IF FormFrontendCheck == OK continue:

    const stateCopy = { ...this.state };
    delete stateCopy.step;
    delete stateCopy.serviceInfo;

    const formData = {
      formId: this.FORM.id,
      values: stateCopy
    };

    axios
      .post("/api/save_form", {
        formData
      })
      .then(response => {

        console.log("FORM CREATION RESPONSE", response);

        this.props.dispatch({
          type: "FORM_SAVED",
          formData: formData
        });


        this.FORM.fields.map((field) => {
          this.formValues.push(
            { [field.id]: this.state[field.id] }
          );
        });
        this.props.history.push("./pay");
        this.setState({
          step: "pay"
        });

      })
      .catch(error => {
        console.log(error);
      });

  }

  handleSuccessfulPayment(serviceInfo) {
    this.props.history.push("./info");
    this.setState({
      serviceInfo,
      step: this.props.match.params.step
    });
  }

  static createBreadcrumbs(SERVICE, step) {
    let BREADCRUMBS = [
      {
        title: "Услуги",
        link: "/services",
        is_active: false
      },
      {
        title: SERVICE.name,
        link: "/services/" + SERVICE.id,
        is_active: false
      }
    ];
    if (step === "form") {
      BREADCRUMBS.push({
        title: "Форма",
        link: "/services/" + SERVICE.id + "/" + step,
        is_active: true
      });
    }
    if (step === "pay") {
      BREADCRUMBS.push({
        title: "Оплата",
        link: "/services/" + SERVICE.id + "/" + step,
        is_active: true
      });
    }
    if (step === "info") {
      BREADCRUMBS.push({
        title: "Информация",
        link: "/services/" + SERVICE.id + "/" + step,
        is_active: true
      });
    }
    BREADCRUMBS[BREADCRUMBS.length - 1].is_active = true;

    return BREADCRUMBS;
  }

  render() {

    const SERVICE = this.SERVICE;
    const BREADCRUMBS = ServiceFull.createBreadcrumbs(SERVICE, this.state.step);
    const { step, serviceInfo } = this.state;

    let content;

    switch (step) {
      case "":
        content = (
          <ServiceFullDescription handleNext={this.handleNext.bind(this)} service={SERVICE}/>
        );
        break;
      case "form":
        content = (
          <Form handleServiceFormSubmit={this.handleServiceFormSubmit.bind(this)}
                handleChange={this.handleChange.bind(this)}
                parentState={this.state}
                form={this.FORM}
          />
        );
        break;
      case "pay":
        content = (
          <Fragment>
            <Pay FORM={this.FORM}
                 formData={this.props.filledFormData}
                 handleSuccessfulPayment={this.handleSuccessfulPayment.bind(this)}/>
          </Fragment>
        );
        break;
      case "info":
        content = (
          <Fragment>
            <ServiceInfo serviceInfo={serviceInfo}/>
          </Fragment>
        );
        break;
      default:
        content = "STEP STATE PROPERTY IS EMPTY";
    }

    return (
      <Fragment>

        <Header breadcrumbs={BREADCRUMBS} type={"page"}/>

        <div className="container">

          <div className="row">
            <div className="col-12">
              <h2>{SERVICE.name}</h2>
            </div>
          </div>

          <ServiceSteps activeStep={step}/>

          {content}

        </div>
      </Fragment>
    );
  }
}

ServiceFull.propTypes = {
  dispatch: PropTypes.func,
  filledFormData: PropTypes.object
};

export default connect((state, props, dispatch) => ({
  dispatch,
  filledFormData: state.serviceFull.get("formData")
}))(ServiceFull);
