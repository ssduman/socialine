import React, { Component } from 'react';
import HomeNavbar from './home_nav';
import Sidebar from '../util/sidebar';
import Stepper from './stepper';
import Stepper_edit from './edit_stepper';
import Content from './content';
import { getUser } from '../api/apiCall';

class Home extends Component {
	state = { createClub: 3, isAdmin: false };
	componentDidMount() {
		if (this.props.userId)
			getUser(this.props.userId).then((response) => {
				console.log(response);
				if (response[0].isAdmin === 1) this.setState({ isAdmin: true });
			});
	}

	handleClick = () => {
		this.setState({ createClub: 1 });
	};

	handleClickEdit = () => {
		this.setState({ createClub: 2 });
	};

	handleClickMain = () => {
		this.setState({ createClub: 3 });
	};

	render() {
		if (this.state.createClub === 1) {
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
						<HomeNavbar userId={this.props.userId} chatVisited={this.props.chatVisited} socket={this.props.socket}></HomeNavbar>
						<div className='row justify-content-center'>
							<div className='col-4'>
								<Sidebar
									handleClick={this.handleClickEdit}
									handleClickEdit={this.handleClickEdit}
									handleClickMain={this.handleClickMain}
								/>
							</div>
							<div className='col-8'>
								<Stepper></Stepper>
							</div>
						</div>
					</div>
				</div>
			);
		} else if (this.state.createClub === 2) {
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
						<HomeNavbar userId={this.props.userId} chatVisited={this.props.chatVisited} socket={this.props.socket}></HomeNavbar>
						<div className='row justify-content-center'>
							<div className='col-4'>
								<Sidebar
									handleClick={this.handleClick}
									handleClickEdit={this.handleClickEdit}
									handleClickMain={this.handleClickMain}
								/>{' '}
							</div>
							<div className='col-8'>
								<Stepper_edit></Stepper_edit>
							</div>
						</div>
					</div>
				</div>
			);
		} else
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
						<HomeNavbar userId={this.props.userId} chatVisited={this.props.chatVisited} socket={this.props.socket}></HomeNavbar>
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
								<Content history={this.props.history}></Content>
							</div>
						</div>
					</div>
				</div>
			);
	}
}

export default Home;
