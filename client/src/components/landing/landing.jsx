import React, { Component, Fragment } from 'react';
import Header from './header';
import LoginNavbar from './login_nav';
import Footer from './footer';

class Landing extends Component {
	render() {
		return (
			<React.Fragment>
				<LoginNavbar
					handleLog={this.props.handleLog}
					loginStatus={this.loginStatus}
					{...this.props}
				/>
				<Header />
				<Footer />
			</React.Fragment>
		);
	}
}

export default Landing;
