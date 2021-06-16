import React, { Component } from 'react';
import HomeNavbar from '../home/home_nav';
import Sidebar from '../util/sidebar';
import ClubContent from './club_content';

class Clubs extends Component {
	state = {};
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
							/>
						</div>
						<div className='col-8'>
							<ClubContent
								userId={this.props.userId}
								match={this.props.match}
							></ClubContent>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Clubs;
