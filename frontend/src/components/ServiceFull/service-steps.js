import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ServiceSteps extends Component {
  render() {
    const classNamesObject = {
      '': 'col-3 step_circle text-center',
      form: 'col-3 step_circle text-center',
      pay: 'col-3 step_circle text-center',
      info: 'col-3 step_circle text-center'
    };
    classNamesObject[this.props.activeStep] += ' active';
    switch (this.props.activeStep) {
      case '':
        break;
      case 'form':
        classNamesObject[''] += ' passed';
        break;
      case 'pay':
        classNamesObject[''] += ' passed';
        classNamesObject.form += ' passed';
        break;
      case 'info':
        classNamesObject[''] += ' passed';
        classNamesObject.form += ' passed';
        classNamesObject.pay += ' passed';
        break;
      default:
        console.log('STEP IS UNDEFINED');
    }
    return (
      <div className="step_circle_row row align-content-center justify-content-between">
        <div className={classNamesObject['']}>
          <h1>1</h1>
          <p>Детали сервиса</p>
        </div>
        <div className={classNamesObject.form}>
          <h2>2</h2>
          <p>Заполнить форму</p>
        </div>
        <div className={classNamesObject.pay}>
          <h2>3</h2>
          <p>Оплатить</p>
        </div>
        <div className={classNamesObject.info}>
          <h2>4</h2>
          <p>Получение информации</p>
        </div>
      </div>
    );
  }
}

ServiceSteps.propTypes = {
  dispatch: PropTypes.func,
  activeStep: PropTypes.string
};

export default connect((state, props, dispatch) => ({
  dispatch
}))(ServiceSteps);
