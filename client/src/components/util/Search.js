import '.././../App.css';
import React, { Component } from 'react';
import { getsubClubs } from '../api/apiCall';

class Search extends Component {
	state = {
		subClubs: [],
		searchTerm: '',
		pageNumber: 0,
		pagesVisited: 0,
	};
	pageCount = 0;
	perPage = 3;

	componentDidMount() {
		getsubClubs().then((response) => {
			this.pageCount = Math.ceil(response.length / this.perPage);
			this.setState({ subClubs: response });
		});
	}

	routeChange = (id) => {
		window.location.replace(`/clubs/${id}`);
	};

	render() {
		return (
			<div>
				<input
					type='text'
					name='search-term'
					id='search-term'
					type='text'
					className='form-control'
					placeholder='Search'
					onChange={(e) => this.setState({ searchTerm: e.target.value })}
				/>
				{this.state.subClubs
					.filter((val) => {
						if (this.state.searchTerm == '') {
							return val;
						} else if (
							val.name &&
							val.name
								.toLowerCase()
								.includes(this.state.searchTerm.toLowerCase())
						) {
							return val;
						}
					})
					.slice(
						this.state.searchTerm == '' ? this.state.pagesVisited : 0,
						(this.state.searchTerm == '' ? this.state.pagesVisited : 0) +
						this.perPage
					)
					.map((val, key) => {
						return (
							<div key={key} className='mt-3'>
								<div
									className='card text-white bg-secondary'
									onClick={() => this.routeChange(val.subClubId)}
									style={{ cursor: 'pointer' }}
								>
									<div className='card-body'>
										<h5 className='card-text'>{val.name}</h5>
									</div>
								</div>
							</div>
						);
					})}
			</div>
		);
	}
}

export default Search;
