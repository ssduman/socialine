import React, { Component } from 'react';
import { getsubClubs, editsubClub, deletesubClub } from '../api/apiCall';

class Stepper_edit extends Component {
	state = {
		sub_clubs: [],
		id: 0,
		sub_club_name: '',
		description: '',
		step: 0,
	};

	componentDidMount() {
		getsubClubs().then((response) => {
			this.setState({ sub_clubs: response });
		});
	}

	handleSelect = (input) => (e) => {
		this.setState({ [input]: parseInt(e.target.value) });
	};

	handleChange = (input) => (e) => {
		this.setState({ [input]: e.target.value });
	};

	handleStepper = () => {
		var step = this.state.step + 1;
		this.setState({ step });
	};
	handleClubEdit = () => {
		var club = {
			id: this.state.id,
			name: this.state.sub_club_name,
			creationDate: '2020-07-01',
			description: this.state.description,
			rating: 6,
			reviews: 6,
		};

		editsubClub(club);
	};

	handlesubDelete = () => {
		var id = this.state.id;
		deletesubClub(id);
	};
	render() {
		if (this.state.step == 0) {
			return (
				<div className='container'>
					<form>
						<div className='form-group' style={{ marginTop: '100px' }}>
							<label style={{ color: 'white' }}>
								Select a club to delete or edit.
							</label>
							<select
								className='form-control'
								id='exampleFormControlSelect1'
								onChange={this.handleSelect('id')}
							>
								{this.state.sub_clubs.map((element) => {
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
								className='btn btn-danger'
								onClick={this.handlesubDelete}
							>
								Delete
							</button>
							<button
								type='button'
								className='btn btn-warning'
								onClick={this.handleStepper}
								style={{ float: 'right' }}
							>
								Edit
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
							<label style={{ color: 'white' }}>Enter new subclub name.</label>
							<input
								type='text'
								className='form-control'
								id='exampleFormControlInput1'
								placeholder='Clubname'
								onChange={this.handleChange('sub_club_name')}
							/>
						</div>
						<div className='form-group'>
							<label style={{ color: 'white' }}>
								Enter new description for the club.
							</label>
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
								onClick={this.handleClubEdit}
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

export default Stepper_edit;
