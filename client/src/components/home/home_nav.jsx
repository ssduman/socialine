import React, { Component } from 'react';
import Search from '../util/Search';
import cookie from 'js-cookie';

class HomeNavbar extends Component {
	state = { collapse: false, color: '#ffffff' };

	componentDidMount = () => {
		if (this.props.socket) {
			this.props.socket.on('bell', (data) => {
				var userId = cookie.get('userid');
				if (userId) {
					if (userId == data) {
						if (this.props.chatVisited === 0) {
							this.setState({ color: '#fcdb03' });
						} else {
							this.setState({ color: '#ffffff' });
						}
					}
				}
			});
		}
	};

	handleClick = () => {
		if (this.state.collapse == true) this.setState({ collapse: false });
		else this.setState({ collapse: true });
	};

	redirecTo = () => {
		window.location.replace('user/' + this.props.userId);
	};
	render() {
		var styleofnavbar = 'navbar navbar-dark navbar-expand-lg fixed-top';
		if (this.state.collapse == true) styleofnavbar += ' bg-dark';
		return (
			<nav className={styleofnavbar} id='mainNav'>
				<div className='container'>
					<a
						className='navbar-brand js-scroll-trigger'
						href='home'
						style={{ fontWeight: 700 }}
					>
						SOCIALINE
					</a>
					<button
						data-toggle='collapse'
						data-target='#navbarResponsive'
						className='navbar-toggler float-right'
						aria-controls='navbarResponsive'
						aria-expanded='false'
						aria-label='Toggle navigation'
						onClick={() => this.handleClick()}
					>
						<i className='fa fa-bars'></i>
					</button>
					<div className='collapse navbar-collapse' id='navbarResponsive'>
						<ul className='nav navbar-nav ml-auto'>
							<li className='nav-item m-2'>
								<i
									className='fa fa-user fa-lg'
									style={{
										color: '#ffffff',
										float: 'right',
										cursor: 'pointer',
									}}
									onClick={this.redirecTo}
								></i>
							</li>
							<li className='nav-item m-2'>
								<i
									className='fa fa-bell fa-lg'
									style={{ color: this.state.color, float: 'right' }}
								></i>
							</li>
							<li className='nav-item m-2'>
								<div className='dropdown'>
									<i
										className='fa fa-search fa-lg'
										type='button'
										id='dropdownMenuButton'
										data-toggle='dropdown'
										aria-haspopup='true'
										aria-expanded='false'
										style={{ color: '#ffffff', float: 'right' }}
									></i>
									<div className='dropdown-menu dropdown-menu-right bg-dark text-white mt-3'>
										<form className='px-3 py-3'>
											<div className='form-group'>
												<Search />
											</div>
										</form>
										<div className='dropdown-divider'></div>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default HomeNavbar;
