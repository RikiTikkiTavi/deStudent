import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Route, Switch} from 'react-router-dom';
import PropTypes from "prop-types";

class Breadcrumbs extends Component {
	render() {
		return (
			<nav aria-label="breadcrumb" className="de-student-breadcrumb">
				<div className="container">
					<ol className="breadcrumb">
						<li className="breadcrumb-item">
							<Link to="/">Главная</Link>
						</li>

						{this.props.breadcrumbs.map((breadcrumb,index) => {

							if (breadcrumb.is_active) {
								return (
									<li key={index} className="breadcrumb-item active">
										<span>{breadcrumb.title}</span>
									</li>
								)
							} else {
								return (
									<li key={index} className="breadcrumb-item">
										<Link to={breadcrumb.link}>{breadcrumb.title}</Link>
									</li>
								)
							}
						})}
					</ol>
				</div>
			</nav>

		);
	}
}

Breadcrumbs.propTypes = {
	breadcrumbs: PropTypes.array,
};

export default connect((state, props, dispatch) => ({
	dispatch
}))(Breadcrumbs);
