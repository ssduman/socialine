import './App.css';
import cookie from 'js-cookie';
import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import io from 'socket.io-client';
import Landing from './components/landing/landing';
import Home from './components/home/home';
import Forgot from './components/forgotpw/forgot_password';
import PostDraft from './components/util/PostDraft';
import Search from './components/util/Search';
import Chat from './components/profile/Chat';
import MyClubs from './components/filter/my clubs/my_content';
// import Questionnaire from "./components/Questionnaire";
import Clubs from './components/club/clubs';
import Popular from './components/filter/popular/popular';
import CategoryContent from './components/filter/category/category';
import Profile from './components/profile/profile.jsx';
import Browse from './components/browse/browse';
import RequestClub from './components/requests/request_club.jsx';
import Requests from './components/requests/requests';

var socket = io('::9090');
console.log("socket:")
console.log(socket)
console.log(":socket")

class App extends Component {
	state = {
		isLoggedIn: 0,
		username: '',
		chatVisited: 0,
	};

	async componentDidMount() {
		const token = cookie.get('token');
		if (token) {
			const res = await fetch('/api/', {
				method: 'GET',
				headers: {
					'Content-type': 'application/json',
					Accept: 'application/json',
					Authorization: 'Bearer ' + token,
					username: cookie.get('username'),
				},
			});

			const data = await res.json();
			console.log('data:', data);

			if (data.res) {
				console.log('token auth success');

				this.setState({ isLoggedIn: 1 });
				this.setState({ username: cookie.get('userid') });
				// if (window.location.pathname === '/') {
				// 	window.location.replace('home');
				// }
			} else {
				console.log('token auth failed');
				// window.location.replace('');
				this.setState({ isLoggedIn: 0 });
				this.setState({ username: '' });
			}
		} else {
			// if (window.location.pathname === '/browse' || window.location.pathname === '/') {
			// 	console.log('no token');
			// } else {
			// 	window.location.replace('');
			// }
		}
	}

	loginStatus = () => {
		return this.state.username;
	};

	handleLog = () => {
		this.setState({ isLoggedIn: 1 });
	};

	render() {
		return (
			<div>
				<Router>
					<Switch>
						<Route
							path='/requests'
							exact
							component={(props) => (
								<Requests
									handleLog={this.handleLog}
									loginStatus={this.loginStatus}
									userId={this.state.username}
									{...props}
								/>
							)}
						/>
						<Route
							path='/requestclub'
							exact
							component={(props) => (
								<RequestClub
									handleLog={this.handleLog}
									loginStatus={this.loginStatus}
									userId={this.state.username}
									{...props}
								/>
							)}
						/>
						<Route
							path='/forgot-password'
							exact
							component={(props) => (
								<Forgot
									handleLog={this.handleLog}
									loginStatus={this.loginStatus}
									{...props}
								/>
							)}
						/>
						<Route
							path='/browse'
							exact
							component={(props) => (
								<Browse
									handleLog={this.handleLog}
									loginStatus={this.loginStatus}
									{...props}
								/>
							)}
						/>
						<Route
							path='/user/:userId?'
							exact
							component={(props) => (
								<Profile
									handleLog={this.handleLog}
									userId={this.state.username}
									{...props}
								/>
							)}
						/>
						<Route
							path='/category/:clubID?'
							exact
							component={(props) => (
								<CategoryContent userId={this.state.username} {...props} />
							)}
						/>
						<Route
							path='/popular'
							exact
							component={(props) => (
								<Popular userId={this.state.username} {...props} />
							)}
						/>
						<Route
							path='/myclubs'
							exact
							component={(props) => (
								<MyClubs userId={this.state.username} {...props} />
							)}
						/>
						<Route
							path='/clubs/:clubID?'
							exact
							component={(props) => (
								<Clubs
									handleLog={this.handleLog}
									userId={this.state.username}
									{...props}
								/>
							)}
						/>
						<Route
							path='/home'
							exact
							component={(props) => (
								<Home
									handleLog={this.handleLog}
									loginStatus={this.loginStatus}
									userId={this.state.username}
									chatVisited={this.state.chatVisited}
									socket={socket}
									{...props}
								/>
							)}
						/>
						<Route path='/draft' exact component={PostDraft} />
						{/* <Route
                            path="/questionnaire"
                            exact
                            component={Questionnaire}
                        /> */}
						<Route path='/search' exact component={Search} />
						<Route
							path='/chat/:senderID/:receiverID?'
							exact
							component={(props) => (
								<Chat
									handleLog={this.handleLog}
									loginStatus={this.loginStatus}
									userId={this.state.username}
									chatVisited={this.state.chatVisited}
									socket={socket}
									{...props}
								/>
							)}
						/>
						<Route
							path='/'
							exact
							component={(props) => (
								<Landing
									handleLog={this.handleLog}
									loginStatus={this.loginStatus}
									{...props}
								/>
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
