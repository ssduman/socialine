import React, { Component } from 'react';
import HomeNavbar from '../home/home_nav';
import Sidebar from '../util/sidebar';
import { getUser } from '../api/apiCall';
import Stepper_1 from './stepper';

class RequestClub extends Component {
	state = { isAdmin: false };
	componentDidMount() {
		if (this.props.userId)
			getUser(this.props.userId).then((response) => {
				if (response[0].isAdmin === 1) this.setState({ isAdmin: true });
			});
	}

	render() {
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
					<HomeNavbar userId={this.props.userId}></HomeNavbar>
					<div className='row justify-content-center'>
						<div className='col-4'>
							<Sidebar
								handleClick={this.handleClick}
								handleClickEdit={this.handleClickEdit}
								handleClickMain={this.handleClickMain}
								isAdmin={this.state.isAdmin}
							/>
						</div>
						<div className='col-8'>
							<Stepper_1 userId={this.props.userId}></Stepper_1>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default RequestClub;
