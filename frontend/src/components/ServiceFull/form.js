import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Form extends Component {
	render() {
		return (
			<Fragment>
				<form>
					{this.props.form.fields.map((field, index) => {
						return (
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
								/>
							</div>
						)
					})}
					<button
						onClick={this.props.handleServiceFormSubmit.bind(this)}
						className="btn btn-primary">
						Далее
					</button>
				</form>
			</Fragment>
		)
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
