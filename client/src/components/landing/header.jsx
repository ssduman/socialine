import React, { Component } from 'react';
import { register, login } from '../api/apiCall';

import cookie from 'js-cookie';

class Header extends Component {
	state = { 
		name: '', 
		pw: '', 
		email: '', 
		phone: '' 
	};

	handleChange = (input) => (e) => {
		this.setState({ [input]: e.target.value });
	};
	
	handleNewUser = () => {
		var user = { 
			name: this.state.name, 
			password: this.state.pw 
		};
		login(user).then((response) => {
			if (response.res === 'success') {
				cookie.set('userid', response.userid);
				cookie.set('username', this.state.name);
				cookie.set('token', response.jwt);

				window.jwt = response.jwt;
				window.username = this.state.name;

				this.props.handleLog();
				this.props.history.replace('/home');
			}
		});
	};

	handleClick = (e) => {
		e.preventDefault()
		
		if (this.state.name && this.state.email && this.state.pw && this.state.phone) {
			var user = {
				realName: this.state.name,
				name: this.state.name,
				email: this.state.email,
				password: this.state.pw,
				isAdmin: 0
			};
			
			register(user).then((response) => {
				if (response && response.res && response.res === 'success') {
					this.handleNewUser();
				}
				else if (response && response.res && response.res === 'user exists') {
					alert("user exists");
				}
			});
		}
	};

	render() {
		return (
			<div>
				<header
					className='masthead'
					style={{
						height: '100vh',
						background:
							'url(assets/img/bg-pattern.png), linear-gradient(to right, #41068f, #f08426)',
					}}
				>
					<div className='container h-100'>
						<div className='row h-100'>
							<div className='col-lg-7 my-auto'>
								<div className='d-flex justify-content-center'>
									<a
										className='btn btn-outline-warning btn-xl js-scroll-trigger'
										role='button'
										style={{ fontWeight: 700 }}
										href='/browse'
									>
										Browse Clubs
									</a>
								</div>
							</div>
							<div className='col-lg-4 my-auto'>
								<div>
									<div>
										<div>
											<div className='text-center text-secondary container-sm'>
												<form onSubmit={this.handleClick}>
													<input
														className='form-control'
														type='text'
														style={{
															borderRadius: '10px',
															marginBottom: '10px',
															marginTop: '50px',
														}}
														placeholder='Username'
														required={true}
														onChange={this.handleChange('name')}
													/>
													<input
														className='form-control'
														type='email'
														style={{
															borderRadius: '10px',
															marginBottom: '10px',
														}}
														placeholder='E-mail'
														required={true}
														onChange={this.handleChange('email')}
													/>
													<input
														className='form-control'
														type='password'
														style={{
															borderRadius: '10px',
															marginBottom: '10px',
														}}
														placeholder='Password'
														required={true}
														onChange={this.handleChange('pw')}
													/>
													<input
														className='form-control'
														type='tel'
														data-toggle='tooltip'
														data-bs-tooltip=''
														style={{
															borderRadius: '10px',
															marginBottom: '10px',
														}}
														placeholder='Telephone Number'
														required={true}
														onChange={this.handleChange('phone')}
													/>
													<input
														className='btn btn-success btn-block'
														type='submit'
														style={{
															textAlign: 'center',
															borderRadius: '10px',
															marginBottom: '10px',
															fontWeight: '700',
														}}
														value="SIGN UP"
														// onClick={(e) => this.handleClick(e)}
													>
													</input>
												</form>
											</div>
										</div>
									</div>
								</div>
								<div className='iphone-mockup'></div>
							</div>
						</div>
					</div>
				</header>
			</div>
		);
	}
}

export default Header;
