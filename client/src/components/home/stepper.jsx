import React, { Component } from 'react';
import {
	getClubs,
	createClub,
	createsubClub,
	addClubRequest,
} from '../api/apiCall';

class Stepper extends Component {
	state = {
		clubs: [],
		clubname: '',
		adminId: 1,
		sub_club_name: '',
		parentId: 1,
		description: '',
		step: 0,
	};

	componentDidMount() {
		getClubs().then((response) => {
			this.setState({ clubs: response });
		});
	}

	handleSelect = (input) => (e) => {
		this.setState({ [input]: parseInt(e.target.value) });
	};

	handleChange = (input) => (e) => {
		this.setState({ [input]: e.target.value });
	};

	handleNewClub = () => {
		id = 0;
		var step = this.state.step + 1;
		this.setState({ parentId: id, step });
	};
	handleStepper = () => {
		var step = this.state.step + 2;
		this.setState({ step });
	};
	handleClubCreate = () => {
		let step = this.state.step + 1;
		this.setState({ step });
	};

	handlesubCreate = () => {
		var club = {
			userId: this.props.userId,
			clubId: this.state.parentId,
			clubName: this.state.clubname,
			subClubName: this.state.sub_club_name,
			suggestion: this.state.description,
		};

		addClubRequest(club);
	};
	render() {
		if (this.state.step == 0) {
			return (
				<div className='container'>
					<form>
						<div className='form-group' style={{ marginTop: '100px' }}>
							<label style={{ color: 'white' }}>
								Does your club exist among these clubs? If yes, please select
								your club.
							</label>
							<select
								className='form-control'
								id='exampleFormControlSelect1'
								onChange={this.handleSelect('parentId')}
							>
								{this.state.clubs.map((element) => {
									return (
										<option key={element.id} value={element.id}>
											{element.name}
										</option>
									);
								})}
							</select>
						</div>
						<div className='form-group'>
							<button
								type='button'
								className='btn btn-primary'
								onClick={this.handleNewClub}
							>
								NEW CLUB
							</button>
							<button
								type='button'
								className='btn btn-primary'
								onClick={this.handleStepper}
								style={{ float: 'right' }}
							>
								Next
							</button>
						</div>
					</form>
				</div>
			);
		} else if (this.state.step == 1) {
			return (
				<div className='container'>
					<form>
						<div className='form-group' style={{ marginTop: '100px' }}></div>
						<div className='form-group'>
							<label style={{ color: 'white' }}>Enter Clubname</label>
							<input
								type='text'
								className='form-control'
								id='exampleFormControlInput1'
								placeholder='Clubname'
								onChange={this.handleChange('clubname')}
							/>
						</div>
						<div className='form-group'>
							<button
								type='button'
								className='btn btn-primary'
								style={{ float: 'right' }}
								onClick={this.handleClubCreate}
							>
								Next
							</button>
						</div>
					</form>
				</div>
			);
		} else if (this.state.step == 2) {
			return (
				<div className='container'>
					<form>
						<div className='form-group' style={{ marginTop: '100px' }}></div>
						<div className='form-group'>
							<label style={{ color: 'white' }}>Enter subclub name.</label>
							<input
								type='text'
								className='form-control'
								id='exampleFormControlInput1'
								placeholder='Clubname'
								onChange={this.handleChange('sub_club_name')}
							/>
						</div>
						<div className='form-group'>
							<label style={{ color: 'white' }}>Suggestions</label>
							<textarea
								className='form-control'
								id='exampleFormControlTextarea1'
								rows='3'
								onChange={this.handleChange('description')}
							></textarea>
						</div>
						<div className='form-group'>
							<button
								type='button'
								className='btn btn-primary'
								style={{ float: 'right' }}
								onClick={this.handlesubCreate}
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			);
		}
		return <div></div>;
	}
}

export default Stepper;
