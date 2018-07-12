/* eslint-disable no-return-assign,no-plusplus */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidated: false
    };
    this.validate = this.validate.bind(this);
  }

  validate = () => {
    const formLength = this.formEl.length;

    if (this.formEl.checkValidity() === false) {
      for (let i = 0; i < formLength; i++) {
        const elem = this.formEl[i];
        const errorLabel = elem.parentNode.querySelector('.invalid-feedback');

        if (errorLabel && elem.nodeName.toLowerCase() !== 'button') {
          if (!elem.validity.valid) {

            errorLabel.textContent = elem.validationMessage;
          } else {
            errorLabel.textContent = '';
          }
        }
      }

      return false;
    }
    for (let i = 0; i < formLength; i++) {
      const elem = this.formEl[i];
      const errorLabel = elem.parentNode.querySelector('.invalid-feedback');
      if (errorLabel && elem.nodeName.toLowerCase() !== 'button') {
        errorLabel.textContent = '';
      }
    }

    return true;
  }

  submitHandler = (e) => {
    e.preventDefault();
    if (this.validate()) {
      this.props.handleServiceFormSubmit();
    }

    this.setState({ isValidated: true });
  }

  render() {
    const classNames = [];

    if (this.state.isValidated) {
      classNames.push('was-validated');
    }

    return (
      <Fragment>
        <form
          noValidate
          className={classNames}
          ref={form => (this.formEl = form)}
          onSubmit={(e)=>{this.submitHandler(e)}}>
          {this.props.form.fields.map((field, index) => (
            <div key={index} className="form-group">
              <label htmlFor={field.id}>{field.label}</label>
              <input
                id={field.id}
                className="form-control"
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                value={this.props.parentState[field.id]}
                onChange={this.props.handleChange.bind(this)}
                vmessage={"Ошибка"}
              />
              <div className="invalid-feedback" />
            </div>
          ))}
          <button type="submit" className="btn btn-primary">
            Далее
          </button>
        </form>
      </Fragment>
    );
  }
}

Form.propTypes = {
  dispatch: PropTypes.func,
  form: PropTypes.object,
  parentState: PropTypes.object,
  handleChange: PropTypes.func,
  handleServiceFormSubmit: PropTypes.func
};

export default connect((state, props, dispatch) => ({
  dispatch
}))(Form);
