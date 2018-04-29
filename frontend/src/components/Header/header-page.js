import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import Breadcrumbs from './breadcrumbs'
import PropTypes from "prop-types"

class HeaderPage extends Component {
	render() {
		return (
			<Fragment>
				<header className="header-page">
					<div className="container text-center">
						<h1>
							De Student
							<small className="text-muted">Получить инфу</small>
						</h1>
					</div>
				</header>
				<Breadcrumbs breadcrumbs={this.props.breadcrumbs}/>
			</Fragment>
		);
	}
}

HeaderPage.propTypes = {
	breadcrumbs: PropTypes.array,
};

export default connect((state, props, dispatch) => ({
	dispatch
}))(HeaderPage)
