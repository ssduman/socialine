import React, { Component } from 'react';
import { getUser } from '../api/apiCall';
import HomeNavbar from '../home/home_nav';
import Sidebar from '../util/sidebar';
import Content from './requests_content';

class Requests extends Component {
	state = { isAdmin: false };
	componentDidMount() {
		if (this.props.userId)
			getUser(this.props.userId).then((response) => {
				if (response[0].isAdmin === 1) this.setState({ isAdmin: true });
			});
	}
	render() {
		let userId = parseInt(this.props.userId);
		return (
			<div
				style={{
					display: 'block',
					width: '100vw',
					minHeight: '100vh',
					height: '100%',
					backgroundColor: '#21104A',
				}}
			>
				<div className='container'>
					<HomeNavbar userId={this.props.userId} />
					<div className='row justify-content-center'>
						<div className='col-4'>
							<Sidebar isAdmin={this.state.isAdmin} />
						</div>
						<div className='col-8'>
							{userId ? (
								<Content
									history={this.props.history}
									userId={this.props.userId}
									match={this.props.match}
									isAdmin={this.state.isAdmin}
								/>
							) : null}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Requests;
