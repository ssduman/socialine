import React, { Component } from 'react';
import HomeNavbar from '../../home/home_nav';
import Sidebar from '../../util/sidebar';
import Content from './category_content';

class CategoryContent extends Component {
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
					<HomeNavbar userId={this.props.userId}></HomeNavbar>
					<div className='row justify-content-center'>
						<div className='col-4'>
							<Sidebar />
						</div>
						<div className='col-8'>
							{userId ? (
								<Content
									history={this.props.history}
									userId={this.props.userId}
									match={this.props.match}
								/>
							) : null}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CategoryContent;
