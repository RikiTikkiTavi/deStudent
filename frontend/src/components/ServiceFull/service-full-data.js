import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class ServiceFullData extends Component {

	render() {

		const {service} = this.props;

		return (
			<Fragment>
				<div className="row">
					<div className="col-12">
						<h2>{service.name}</h2>
					</div>
					<div className="col-12">
						<p> {service.description} </p>
					</div>
				</div>

				<div className="row">
					<div className="col-12">
						<p> Заполнить форму > Оплатить > Получить информацию</p>
					</div>
				</div>
			</Fragment>
		)
	}

}

ServiceFullData.propTypes = {
	dispatch: PropTypes.func,
	service: PropTypes.object,
};

export default connect((state, props, dispatch) => ({
	dispatch
}))(ServiceFullData);
