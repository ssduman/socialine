import React, { Component } from 'react';
import LoginNavbar from '../landing/login_nav';
import { postForgot, changePassword } from '../api/apiCall';

class Forgot extends Component {
	state = { email: '', token: '', newPassword: '', warning: 0 };

	handleChange = (input) => (e) => {
		this.setState({ [input]: e.target.value });
	};

	handleForgot = () => {
		var email = { email: this.state.email };
		postForgot(email).then((response) => {
			if (response.res === 'success') {
				this.setState({ warning: 1 });
			} else this.setState({ warning: 2 });
			return;
		});
	};

	handleWarning = () => {
		if (this.state.warning == 0) {
			return '';
		} else if (this.state.warning == 1) {
			return 'Check your e-mail.';
		} else if (this.state.warning == 2) {
			return 'User does not exist.';
		} else if (this.state.warning == 3) {
			return 'Fill Email, Token or New Password.';
		} else if (this.state.warning == 4) {
			return 'Password changed.';
		} else if (this.state.warning == 5) {
			return 'Password change failed - wrong token';
		} else if (this.state.warning == 6) {
			return 'Password change failed - token is already used.';
		} else if (this.state.warning == 7) {
			return 'Password change failed - bad token.';
		} else if (this.state.warning == 8) {
			return 'Password change failed - token not exists.';
		}
	};

	handleToken = (input) => (e) => {
		this.setState({ [input]: e.target.value });
	};

	handleNewPassword = (input) => (e) => {
		this.setState({ [input]: e.target.value });
	};

	handleChangePassword = () => {
		if (this.state.email == '' || this.state.token == '' || this.state.newPassword == '') {
			this.setState({ warning: 3 });
			return
		}
		var data = { 
			email: this.state.email,
			newPassword: this.state.newPassword
		};
		changePassword(this.state.token, data).then((response) => {
			if (response.res === 'success') {
				this.setState({ warning: 4 });
			} else if (response.res === 'wrong token') {
				this.setState({ warning: 5 });
			} else if (response.res === 'already used') {
				this.setState({ warning: 6 });
			} else if (response.res === 'bad token') {
				this.setState({ warning: 7 });
			} else if (response.res === 'token not exists') {
				this.setState({ warning: 8 });
			}
			return;
		});
	};

	render() {
		return (
			<div
				style={{
					display: 'block',
					width: '100vw',
					height: '100vh',
					backgroundColor: '#21104A',
				}}
			>
				<div className='container'>
					<LoginNavbar
						handleLog={this.props.handleLog}
						loginStatus={this.loginStatus}
						{...this.props}
					/>
					<div className='row justify-content-center'>
						<div className='col-3'></div>
						<div className='col-4' style={{ marginTop: '300px' }}>
							<form>
								<input
									type='email'
									className='form-control'
									onChange={this.handleChange('email')}
									placeholder='Email'
								/>
								<button
									type='button'
									className='btn btn-danger btn-block mt-3'
									onClick={() => this.handleForgot()}
								>
									forgot password
								</button>
								<hr />
								<input
									type='text'
									className='form-control'
									onChange={this.handleToken('token')}
									placeholder='Token'
								/>
								<input
									type='password'
									className='form-control'
									onChange={this.handleNewPassword('newPassword')}
									placeholder='New Password'
									style={{marginTop: "4px"}}
								/>
								<button
									type='button'
									className='btn btn-danger btn-block mt-3'
									onClick={() => this.handleChangePassword()}
								>
									change password
								</button>
								<a style={{ color: 'white' }}>{this.handleWarning()}</a>
							</form>
						</div>
						<div className='col-3'></div>
					</div>
				</div>
			</div>
		);
	}
}

export default Forgot;
