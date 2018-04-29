import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Header from './../Header';
import SERVICES from '../ServiceList/list-of-services';
import FORMS from './forms-object';
import Form from './form';
import ServiceFullData from './service-full-data'
import Pay from './pay'

/*TODO 1: Form save function -> action to change component, or via ROUTER->render ServiceFull component with new property (think is better)
  TODO:	OR on property in state and if statements
 */
// TODO 2: Payment component
// TODO 3: compose all data POST request -> processing on server LOGIC -> response (Info)

class ServiceFull extends Component {

	constructor(props) {
		super(props);
		this.state = {
			step: 'form', // form -> pay -> info
		};
		this.formValues = []
	}

	SERVICE = SERVICES.find((service) => service.id === this.props.match.params.id);
	FORM = FORMS.find((form) => form.id === this.SERVICE.form_name);

	componentDidMount(){
		const filledFormData = this.props.filledFormData;
		if(Object.keys(filledFormData).length !== 0 && filledFormData.formId === this.FORM.id) {
			this.setState(this.props.filledFormData.values);
		}

	}

	componentWillMount() {

		this.FORM.fields.map(field => {
			this.setState({
				[field.id]: '',
			})
		});

		'step' in this.props.match.params ? (
			this.setState({
					step: this.props.match.params.step
				}
			)
		) : '';

	}

	handleChange(e) {
		const value = e.target.value;
		const id = e.target.id;

		this.setState({[id]: value});
	}

	handleServiceFormSubmit(e) {
		e.preventDefault();

		//TODO: IF FormFrontendCheck == OK continue:

		const stateCopy = {...this.state};
		delete stateCopy.step;

		this.props.dispatch({
			type: 'FORM_SAVED',
			formData: {
				formId: this.FORM.id,
				values: stateCopy
			}
		});

		this.FORM.fields.map((field)=> {
			this.formValues.push(
				{[field.id]: this.state[field.id]}
			);
		});

		this.props.history.push(this.props.match.params.id + '/pay');

	}

	static createBreadcrumbs(SERVICE, step) {
		let BREADCRUMBS = [
			{
				title: 'Услуги',
				link: '/services',
				is_active: false
			},
			{
				title: SERVICE.name,
				link: '/services/' + SERVICE.id,
				is_active: false
			},
		];
		step === 'pay' ? (
			BREADCRUMBS.push({
				title: "Оплата",
				link: '/services/' + SERVICE.id + '/' + step,
				is_active: true
			})
		) : '';
		BREADCRUMBS[BREADCRUMBS.length-1].is_active = true;

		return BREADCRUMBS
	}

	render() {

		const SERVICE = this.SERVICE;
		const BREADCRUMBS = ServiceFull.createBreadcrumbs(SERVICE, this.state.step);
		const {step} = this.state;

		let content;

		switch (step) {
			case 'form':
				content = (
					<Form handleServiceFormSubmit={this.handleServiceFormSubmit.bind(this)}
					      handleChange={this.handleChange.bind(this)}
					      parentState={this.state}
					      form={this.FORM}
					/>
				);
				break;
			case 'pay':
				content = (
					<Fragment>
						<Pay FORM={this.FORM} formData={this.props.filledFormData}/>
					</Fragment>
				);
				break;
			default:
				content = "STEP STATE PROPERTY IS EMPTY"
		}

		return (
			<Fragment>

				<Header breadcrumbs={BREADCRUMBS} type={"page"}/>

				<div className="container">

					<ServiceFullData service={SERVICE}/>

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
	filledFormData: state.serviceFull.get('formData'),
}))(ServiceFull);
