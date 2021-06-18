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
						href='browse'
					>
						<i
							className='fa fa-calendar'
							style={{ color: 'white', marginRight: '8px' }}
							aria-hidden='true'
						></i>
						Recently Added
					</a>

					<h3 style={{ color: 'white' }}>Categories</h3>

					{this.state.Clubs.map((club) => {
						return (
							<a
								style={{
									color: 'white',
									display: 'block',
									marginBottom: '10px',
								}}
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
				</div>
			</div>
		);
	}
}

export default Sidebar;
