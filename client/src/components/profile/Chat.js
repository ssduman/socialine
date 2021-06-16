import './../../App.css';
import React, { Component } from 'react';
import { getMessagesBetween } from '../api/apiCall';
import cookie from 'js-cookie';

class Chat extends Component {
	state = {
		message: "",
		messages: [],
		chatVisited: this.props.chatVisited
	}

	componentDidMount() {
		this.setState({ chatVisited: 1 })

		window.addEventListener("beforeunload", (e) => {
			e.preventDefault();
			this.setState({ chatVisited: 0 })
			return;
		});

		if (this.props.match.params.senderID != cookie.get('userid')) { // TODO: params are string!
			// this.props.history.replace('/home'); // TODO: seems not working, raises error
		}

		getMessagesBetween(this.props.match.params.senderID, this.props.match.params.receiverID).then((response) => {
			this.setState({ messages: response.reverse() })
		});

		this.props.socket.on('connect', () => {
			console.log("connect");
		});

		this.props.socket.on('chat', (data) => {
			// TODO: data.receiverId will be -1 in public chat
			if (this.props.match.params.senderID == data.receiverId && this.props.match.params.receiverID == data.senderId) {
				this.output(data.senderId + ' : ' + data.text);
			}
		});

		this.props.socket.on('disconnect', () => {
			console.log('disconnect');
		});

		this.props.socket.on('reconnect_attempt', (attempts) => {
			console.log('reconnect_attempt ' + attempts + ' attempt(s).');
		});
	}

	sendDisconnect = () => {
		this.props.socket.disconnect();
	};

	sendMessage = (e) => {
		e.preventDefault();

		var data = {
			senderId: this.props.match.params.senderID,
			receiverId: this.props.match.params.receiverID,
			text: this.state.message
		};
		this.props.socket.emit('chat', data);
		this.output(data.senderId + ' : ' + data.text);

		this.setState({ message: "" })
	};

	output = (message) => {
		var currentTime = "<span className='time'>" + new Date().toISOString().replace(/\..+/, '').replace("T", " - ") + '</span>';
		var element = document.createElement('div');
		element.innerHTML = currentTime + ' ' + message;
		var consoleParent = document.getElementById('console');
		// consoleParent.appendChild(element)
		consoleParent.insertBefore(element, consoleParent.firstChild);
	};

	render() {
		return (
			<div>
				<h1>Chat Client</h1>
				<br />

				<div id='console' className='well'>
					{
						this.state.messages.map((m) => (
							<div key={m.messageId}>
								<span className='time'> {m.date.replace("T", " - ")} {m.senderId} : </span> {m.text}
							</div>
						))
					}
				</div>

				<form className='well form-inline'>
					<input
						id='msg'
						className='input-xlarge'
						type='text'
						placeholder='Type something...'
						onChange={(e) => this.setState({ message: e.target.value })}
						value={this.state.message}
					/>
					<button
						className='btn'
						type='submit'
						id='send'
						onClick={(e) => this.sendMessage(e)}
					>
						{' '} Send {' '}
					</button>
					<button className='btn' type='button' onClick={(e) => this.sendDisconnect()}>
						{' '} Disconnect {' '}
					</button>
				</form>
			</div>
		);
	}
};

export default Chat;