import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import Navbar from './navbar'
import HeaderPage from './header-page'
import HeaderHome from './header-home'

class Header extends Component {
	render() {
		return (
			<Fragment>
				<Navbar/>
				{this.props.type === "page" ? <HeaderPage breadcrumbs={this.props.breadcrumbs}/> : <HeaderHome/>}
			</Fragment>
		)
	}
}

Header.propTypes = {
	type: PropTypes.string,
	breadcrumbs: PropTypes.array,
};

export default connect((state, props, dispatch) => ({
	dispatch
}))(Header);
