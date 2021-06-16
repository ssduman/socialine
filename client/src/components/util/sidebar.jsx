import React, { Component } from 'react';
import { getClubs } from '../api/apiCall';

class Sidebar extends Component {
	state = { Clubs: [] };

	componentDidMount() {
		getClubs().then((response) => {
			this.setState({ Clubs: response });
		});
	}

	render() {
		return (
			<div>
				<div
					style={{
						borderRight: '2px solid white',
						height: '80%',
						marginRight: '20px',
						marginTop: '100px',
					}}
				>
					<h3 style={{ color: 'white' }}>Discover</h3>
					<br></br>

					<a
						style={{
							color: 'white',
							display: 'block',
							marginBottom: '10px',
							cursor: 'pointer',
						}}
						href='http://localhost:3000/home'
					>
						<i
							className='fa fa-calendar'
							style={{ color: 'white', marginRight: '8px' }}
							aria-hidden='true'
						></i>
						Recently Added
					</a>

					<a
						style={{ color: 'white', display: 'block', marginBottom: '10px' }}
						href='http://localhost:3000/popular'
					>
						<i
							className='fa fa-star'
							style={{ color: 'white', marginRight: '8px' }}
							aria-hidden='true'
						></i>
						Popular
					</a>

					<a style={{ color: 'white', display: 'block', marginBottom: '10px' }}>
						<i
							className='fa fa-question'
							style={{ color: 'white', marginRight: '15px' }}
							aria-hidden='true'
						></i>
						Questionnaire
					</a>

					<a
						style={{ color: 'white', display: 'block', marginBottom: '30px' }}
						href='http://localhost:3000/myclubs'
					>
						<i
							className='fa fa-heart'
							style={{ color: 'white', marginRight: '8px' }}
							aria-hidden='true'
						></i>
						My Clubs
					</a>

					<h3 style={{ color: 'white' }}>Categories</h3>

					{this.state.Clubs.map((club) => {
						let link = 'http://localhost:3000/category/' + club.id;
						return (
							<a
								style={{
									color: 'white',
									display: 'block',
									marginBottom: '10px',
								}}
								href={link}
							>
								<i
									className=''
									style={{ color: 'white', marginRight: '25px' }}
									aria-hidden='true'
								></i>
								{club.name}
							</a>
						);
					})}
					<br></br>
					{this.props.isAdmin ? (
						<a
							href='http://localhost:3000/requests'
							className='btn btn-sm btn-primary'
						>
							Requests
						</a>
					) : (
						<a
							className='btn btn-sm btn-primary'
							href='http://localhost:3000/requestclub'
						>
							Request Club
						</a>
					)}
				</div>
			</div>
		);
	}
}

export default Sidebar;
