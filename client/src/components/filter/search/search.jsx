import React, { Component } from 'react';
import { getsubClubs } from '../../api/apiCall';

class Search extends Component {
	state = {
		subClubs: [],
		searchTerm: '',
	};

	componentDidMount() {
		getsubClubs().then((response) => {
			this.setState({ subClubs: response });
		});
	}

	render() {
		return (
			<div>
				<input
					type='text'
					name='search-term'
					className='form-control'
					id='search-term'
					type='text'
					placeholder='search...'
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
						return <p>{val.description}</p>;
					})}
			</div>
		);
	}
}

export default Search;
