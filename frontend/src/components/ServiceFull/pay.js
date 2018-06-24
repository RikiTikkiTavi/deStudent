/* eslint-disable class-methods-use-this,import/no-extraneous-dependencies */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import axios from 'axios';

class Pay extends Component {
  onPaymentSuccess(payment) {
    axios
      .post('/api/payment_ver', {
        payment
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { formData } = this.props;

    const style = {
      layout: 'vertical', // horizontal | vertical
      size: 'medium', // medium | large | responsive
      shape: 'rect', // pill | rect
      color: 'blue' // gold | blue | silver | black
    };

    const client = {
      sandbox:
        'ATxBLtc-8ZqZuTl8LZSCvVnRaNNXSzXksBMmCOcytinSsWGUsqNXUZu7cplbGjFjSReLNLwlIZIfGNDN',
      production:
        'AbH-YzAuNI072aza-KCR5MTCL0zY9JzhgYVEIT5WeN-xdvrd_SBeckrIa4Mz0nvD3Pzg6KAUGHLRy4EL'
    };

    const env = 'sandbox';
    const currency = 'EUR';
    const total = 3.0;
    const shipping = 1;

    let content = (
      <Fragment>
        <div className="row">
          <div className="col-12">
            <div className="alert alert-danger" role="alert">
              Форма не заполнена
            </div>
          </div>
        </div>
      </Fragment>
    );

    if (
      Object.keys(formData).length !== 0 ||
      formData.formId === this.props.FORM.id
    ) {
      content = (
        <Fragment>
          <div className="row">
            <div className="col-12">
              PAYMENT SECTION
              <table className="table table-striped">
                <tbody>
                  {this.props.FORM.fields.map((field, index) => (
                    <tr key={index}>
                      <th scope="row">{field.label}</th>
                      <td>{formData.values[field.id]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="pay-block col-12 text-center bg-light">
              <PaypalExpressBtn
                onSuccess={this.onPaymentSuccess.bind(this)}
                shipping={shipping}
                env={env}
                style={style}
                client={client}
                currency={currency}
                total={total}
              />
            </div>
          </div>
        </Fragment>
      );
    }

    return content;
  }
}

Pay.propTypes = {
  dispatch: PropTypes.func,
  formData: PropTypes.object,
  FORM: PropTypes.object
};

export default connect((state, props, dispatch) => ({
  dispatch
}))(Pay);
