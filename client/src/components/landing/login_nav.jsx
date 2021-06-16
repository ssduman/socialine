import React, { Component } from 'react';
import { getUser, login } from '../api/apiCall';

import cookie from 'js-cookie';

class LoginNavbar extends Component {
	state = { name: '', pw: '', warning: false, warningMessage: '' };

	handleChange = (input) => (e) => {
		this.setState({ [input]: e.target.value });
	};

	handleClick = () => {
		var user = { name: this.state.name, password: this.state.pw };
		login(user).then((response) => {
			if (response.res === 'success') {
				cookie.set('userid', response.userid);
				cookie.set('username', this.state.name);
				cookie.set('token', response.jwt);

				window.jwt = response.jwt;
				window.username = this.state.name;

				this.props.handleLog();
				this.props.history.replace('/home');
			} else if (response.res === 'user not verified') {
				this.setState({ warning: true });
				this.setState({ warningMessage: 'Verify your email' });
			} else {
				this.setState({ warning: true });
				this.setState({ warningMessage: 'Wrong Creditentials.' });
			}
		});
	};

	handleWarning = () => {
		if (this.state.warning) return this.state.warningMessage;
	};

	render() {
		return (
			<nav className='navbar navbar-expand-lg fixed-top' id='mainNav'>
				<div className='container'>
					<a
						className='navbar-brand js-scroll-trigger'
						href='#'
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
					>
						<i className='fa fa-bars'></i>
					</button>
					<div className='collapse navbar-collapse' id='navbarResponsive'>
						<ul className='nav navbar-nav ml-auto'>
							<li className='nav-item'>
								<a
									className='nav-link js-scroll-trigger'
									style={{ fontWeight: 700 }}
									href='#features'
								>
									Features
								</a>
							</li>
							<li className='nav-item'>
								<a
									className='nav-link js-scroll-trigger'
									style={{ fontWeight: 700 }}
									href='#contact'
								>
									Contact
								</a>
							</li>
						</ul>
						<div className='dropdown'>
							<button
								className='btn btn-info dropdown-toggle'
								type='button'
								id='dropdownMenuButton'
								data-toggle='dropdown'
								aria-haspopup='true'
								aria-expanded='false'
								style={{
									textAlign: 'center',
									borderRadius: '10px',
									fontWeight: '700',
								}}
							>
								{this.props.loginStatus() ? 'LOGGED IN' : 'LOGIN'}
							</button>
							<div className='dropdown-menu dropdown-menu-right'>
								<form className='px-4 py-3'>
									<div className='form-group'>
										<input
											type='text'
											className='form-control'
											id='exampleDropdownFormEmail1'
											placeholder='Username'
											required={true}
											onChange={this.handleChange('name')}
										/>
									</div>
									<div className='form-group'>
										<input
											type='password'
											className='form-control'
											id='exampleDropdownFormPassword1'
											placeholder='Password'
											required={true}
											onChange={this.handleChange('pw')}
										/>
									</div>
									<div className='form-group'>
										<div className='form-check'>
											<input
												type='checkbox'
												className='form-check-input'
												id='dropdownCheck'
											/>
											<label
												className='form-check-label'
												htmlFor='dropdownCheck'
											>
												Remember me
											</label>
										</div>
									</div>
									<a>{this.handleWarning()}</a>
									<button
										type='button'
										className='btn btn-outline-info'
										style={{
											textAlign: 'center',
											marginBottom: '10px',
											fontWeight: '700',
										}}
										onClick={() => this.handleClick()}
									>
										LOGIN
									</button>
								</form>
								<div className='dropdown-divider'></div>
								<a
									className='dropdown-item'
									href='http://localhost:3000/forgot-password'
									style={{
										textAlign: 'center',
										borderRadius: '10px',
										marginRight: '30px',
										fontWeight: '700',
									}}
								>
									Forgot password?
								</a>
							</div>
						</div>
					</div>
				</div>
			</nav>
		);
	}
}

export default LoginNavbar;
