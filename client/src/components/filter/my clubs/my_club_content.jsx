import React, { Component } from 'react';
import { getUserMembership } from '../../api/apiCall';

class Content extends Component {
	state = {
		subClubs: [],
		currentPage: 1,
		clubsPerPage: 6,
	};

	componentDidMount() {
		getUserMembership(this.props.userId).then((response) => {
			if (response.status === 400);
			else {
				this.setState({ subClubs: response });
			}
		});
	}

	routeChange = (id) => {
		let path = '/clubs/' + id;
		this.props.history.push(path);
	};

	render() {
		const { currentPage, clubsPerPage, subClubs } = this.state;

		const indexOfLastPost = currentPage * clubsPerPage;
		const indexOfFirstPost = indexOfLastPost - clubsPerPage;
		const currentClubs = subClubs.slice(indexOfFirstPost, indexOfLastPost);
		const active = ' active';
		const disabled = ' disabled';

		const paginate = (pageNum) => this.setState({ currentPage: pageNum });

		const nextPage = () => this.setState({ currentPage: currentPage + 1 });

		const prevPage = () => this.setState({ currentPage: currentPage - 1 });

		const pageNumbers = [];

		for (let i = 1; i <= Math.ceil(subClubs.length / clubsPerPage); i++) {
			pageNumbers.push(i);
		}
		return (
			<div>
				<div className='container row' style={{ marginTop: '100px' }}>
					{currentClubs.map((element) => {
						return (
							<div
								className='card text-white bg-dark'
								id={element.subClub}
								key={element.subClub}
								style={{
									width: '13rem',
									marginLeft: '20px',
									borderRadius: '10px',
									marginBottom: '30px',
									cursor: 'pointer',
									border: '0px',
								}}
								onClick={() => this.routeChange(element.subClub)}
							>
								<img
									src={element.image}
									style={{
										borderRadius: '10px',
										borderBottomLeftRadius: '0px',
										borderBottomRightRadius: '0px',
									}}
									className='card-img-top'
									alt='...'
									key={'img' + element.subClub}
								/>
								<div className='card-body' key={'div' + element.subClub}>
									<h5 className='card-title' key={'h5' + element.subClub}>
										{element.subClubName}
									</h5>
									<p className='card-text' key={'p' + element.subClub}>
										Description
									</p>
								</div>
							</div>
						);
					})}
				</div>
				<div
					className='container row justify-content-end'
					style={{ bottom: '20px', right: '365px', position: 'fixed' }}
				>
					<nav>
						<ul className='pagination  bg-dark text-white'>
							<li className='page-item bg-dark text-white'>
								<a
									className='page-link bg-dark text-white'
									href='#'
									onClick={() => prevPage()}
								>
									Previous
								</a>
							</li>
							{pageNumbers.map((num) => (
								<li className='page-item bg-dark text-white' key={num}>
									<a
										onClick={() => paginate(num)}
										href='#'
										className='page-link bg-dark text-white'
									>
										{num}
									</a>
								</li>
							))}
							<li className='page-item bg-dark text-white'>
								<a
									className='page-link bg-dark text-white'
									href='#'
									onClick={() => nextPage()}
								>
									Next
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		);
	}
}

export default Content;
